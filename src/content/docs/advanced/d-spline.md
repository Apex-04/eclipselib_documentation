---
title: Spline.rs Documentation
description: 3D position tracking for odometry-based navigation
---

## Overview
The `spline.rs` module provides a 3D position tracking system for odometry-based navigation. It maintains current and previous position state, allowing drive systems like XDrive and SwerveDrive to implement field-centric control and path following.

## Coordinate System

All spline coordinates are based on the **Red Alliance, Right Corner** as the origin (0, 0, 0):

- **North** (`north`): Distance toward blue alliance (positive Y-axis)
- **West** (`west`): Distance toward head referee station (positive X-axis)
- **Up** (`up`): Vertical position/rotation (positive Z-axis)


## Core Components

### Spline

A stateful position tracker that stores current and previous coordinates for velocity calculations.

**Fields:**
- `north`: Current north position (inches or degrees)
- `west`: Current west position (inches or degrees)
- `up`: Current vertical position/rotation (inches or degrees)
- `previous_north`: Previous north position for derivative calculations
- `previous_west`: Previous west position for derivative calculations
- `previous_up`: Previous vertical position for derivative calculations

---

### Methods

`new(north: f64, west: f64, up: f64) -> Self`

Creates a new spline at the specified starting position.

**Parameters:**
- `north`: Initial north coordinate
- `west`: Initial west coordinate
- `up`: Initial vertical coordinate

**Returns:** A new `Spline` instance with previous position initialized to starting position

:::codeblock
```rust
use eclipselib::splines::*;

// Start at field center (72" north, 72" west)
let mut spline = Spline::new(72.0, 72.0, 0.0);

// Or use convenience function
let mut spline = spline(72.0, 72.0, 0.0);
```
:::

---

`update(&mut self, north: f64, west: f64, up: f64) -> (f64, f64, f64)`

Updates the spline position and returns velocity (change in position).

**Parameters:**
- `north`: New north position from odometry
- `west`: New west position from odometry
- `up`: New vertical position/rotation from odometry

**Returns:** Tuple `(delta_north, delta_west, delta_up)` representing velocity/change

**Behavior:**
- Calculates change: `new_position - current_position`
- Stores current position as previous
- Updates current position to new values
- Returns velocity for derivative control

:::codeblock
```rust
loop {
    // Get position from odometry system
    let (odom_n, odom_w, odom_heading) = odometry.get_position();

    // Update spline and get velocity
    let (vel_n, vel_w, vel_rot) = spline.update(odom_n, odom_w, odom_heading);

    // Use velocity for control algorithms
    println!("Moving at {:.2} in/s north, {:.2} in/s west", vel_n, vel_w);

    sleep(Duration::from_millis(10)).await;
}
```
:::


`position(&self) -> (f64, f64, f64)`

Returns the current position as a tuple.

**Returns:** `(north, west, up)` representing current coordinates

:::codeblock
```rust
let (x, y, z) = spline.position();
println!("Robot at: ({:.1}, {:.1}, {:.1})", x, y, z);
```
:::



`previous_position(&self) -> (f64, f64, f64)`

Returns the previous position from the last update.

**Returns:** `(previous_north, previous_west, previous_up)`

**Use cases:**
- Calculating acceleration
- Smoothing position data
- Debugging odometry jumps

:::codeblock
```rust
let (prev_n, prev_w, prev_h) = spline.previous_position();
let (curr_n, curr_w, curr_h) = spline.position();

let distance_traveled = ((curr_n - prev_n).powi(2) + (curr_w - prev_w).powi(2)).sqrt();
```
:::



#### Accessor Methods

Quick access to individual coordinates:

- **north(&self) -> f64** - Returns current north position
- **west(&self) -> f64** - Returns current west position
- **up(&self) -> f64** - Returns current vertical position

:::codeblock
```rust
if spline.north() > 100.0 {
    println!("Crossed midfield!");
}
```
:::



`spline(north: f64, west: f64, up: f64) -> Spline`

Convenience function to create a new spline (identical to `Spline::new()`).

:::codeblock
```rust
let mut position = spline(0.0, 0.0, 0.0); // Start at origin
```
:::



## Usage in eclipselib

The spline system is designed to work with advanced drive systems:

### XDrive Integration
:::codeblock
```rust
struct XDrive {
    spline: Spline,
    // ... motors, sensors
}

impl XDrive {
    pub async fn update_position(&mut self) {
        let (n, w, h) = self.odometry.calculate_position();
        let (vel_n, vel_w, vel_h) = self.spline.update(n, w, h);

        // Use velocity for field-centric control
        self.drive_field_centric(vel_n, vel_w, vel_h);
    }
}
```
:::

### SwerveDrive Integration
:::codeblock
```rust
struct SwerveDrive {
    spline: Spline,
    target: (f64, f64, f64),
    // ... swerve modules
}

impl SwerveDrive {
    pub async fn move_to_target(&mut self) {
        loop {
            // Update position
            let odom = self.get_odometry();
            self.spline.update(odom.0, odom.1, odom.2);

            // Calculate error to target
            let (curr_n, curr_w, curr_h) = self.spline.position();
            let error_n = self.target.0 - curr_n;
            let error_w = self.target.1 - curr_w;
            let error_h = self.target.2 - curr_h;

            // Apply PID control with errors
            self.drive_with_pid(error_n, error_w, error_h);

            if error_n.abs() < 1.0 && error_w.abs() < 1.0 {
                break; // Reached target
            }
        }
    }
}
```
:::


## Best Practices

1. **Update Frequency**: Call `update()` at consistent intervals (typically 10-50ms) for accurate velocity calculations

2. **Target Management**: Drive systems (XDrive/SwerveDrive) should manage their own targets and use spline only for position tracking

3. **Coordinate Consistency**: Always use the same units (inches or degrees) throughout your code

4. **Reset When Needed**: Create a new spline when repositioning the robot or resetting odometry
