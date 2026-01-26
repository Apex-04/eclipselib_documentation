---
title: PID Controllers
---


## Overview
The `pid.rs` module provides a stateful PID (Proportional-Integral-Derivative) controller implementation with built-in Ziegler-Nichols tuning support. It maintains error history across iterations to compute precise control outputs for motor control, autonomous movement, and other closed-loop systems.

## Core Components

```calc_gains(ku: f64, tu: f64, mode: i8) -> (f64, f64, f64)```

Calculates PID gains using Ziegler-Nichols tuning rules based on system characteristics.

**Parameters:**
- `ku`: Ultimate gain (maximum gain before sustained oscillation)
- `tu`: Oscillation period (time for one complete oscillation cycle in seconds)
- `mode`: Controller type (1-7)

**Tuning Modes:**
1. **P controller** - Proportional only, simple but limited
2. **PI controller** - Eliminates steady-state error
3. **PD controller** - Fast response, no integral windup
4. **Classic PID** - Balanced standard tuning
5. **Pessen Integral Rule** - Aggressive response, faster settling
6. **Some Overshoot** - Moderate tuning, slight overshoot acceptable
7. **No Overshoot** - Conservative tuning, prioritizes stability

**Returns:** Tuple `(kp, ki, kd)` representing the calculated gains

:::codeblock
**Example Usage:**
```rust
use eclipselib::pid::*;// Determine ultimate gain and period through testing
let ku = 2.5;  // System oscillates at gain of 2.5
let tu = 0.3;  // Oscillation period is 0.3 seconds// Calculate gains for Classic PID (mode 4)
let (kp, ki, kd) = calc_gains(ku, tu, 4);// Create controller with calculated gains
let mut controller = PIDController::set_gains(kp, ki, kd);
controller.set_target(100.0);
```
:::


### PIDController

A stateful PID controller that tracks error, accumulated error, and error rate across iterations.

**Internal State:**
- `kp`: Proportional gain - immediate response to current error
- `ki`: Integral gain - eliminates steady-state error over time
- `kd`: Derivative gain - dampens oscillations and overshoots
- `target`: Optional setpoint value the controller aims to reach
- `integral`: Accumulated error over time (I term)
- `previous_error`: Last error value used for derivative calculation (D term)



### Methods

`set_gains(kp: f64, ki: f64, kd: f64) -> Self`

Creates a new PID controller with specified gains.

**Parameters:**
- `kp`: Proportional gain coefficient
- `ki`: Integral gain coefficient
- `kd`: Derivative gain coefficient

**Returns:** A new `PIDController` instance with integral and previous error initialized to 0

:::codeblock
```rust
let mut pid = PIDController::set_gains(0.5, 0.1, 0.05);
```
:::


#### set_target(&mut self, target: f64)

Sets the desired setpoint value the controller should reach.

**Parameters:**
- `target`: The target value (e.g., encoder position, distance, angle)

:::codeblock
```rust
pid.set_target(1000.0); // Set target to 1000 encoder ticks
```
:::


#### calculate(&mut self, encoder_value: f64) -> f64

Computes the control output for the current iteration based on the sensor reading.

**Parameters:**
- `encoder_value`: Current measured value from sensor

**Returns:** Control output value (typically motor voltage or velocity)

**Behavior:**
- Returns `0.0` if no target is set
- Calculates error: `target - current_value`
- Accumulates integral: `integral += error`
- Computes derivative: `error - previous_error`
- Updates state for next iteration
- Returns: `kp * error + ki * integral + kd * derivative`

:::codeblock
```rust
loop {
let position = motor.position()?.as_degrees();
let output = pid.calculate(position);
motor.set_voltage((output * 120.0) as i32)?; // Scale to millivoltssleep(Duration::from_millis(10)).await;
}
```
:::

---

#### reset(&mut self)

Resets the controller's internal state (integral and previous error to 0).

**When to use:**
- Starting a new movement
- Changing targets significantly
- Preventing integral windup
- After controller has been idle

:::codeblock
```rust
pid.set_target(500.0);
pid.reset(); // Clear accumulated error from previous movement
```
:::

---

## Usage in eclipselib

The PID controller is used throughout eclipselib for:
- **Motor control** - Precise positioning and velocity control
- **Drivetrain movements** - Straight line driving, turns
- **Autonomous routines** - Drive-to-target functions
- **Custom mechanisms** - Lifts, intakes, shooters
