---
title: Autons
---

Eclipselib uses the built in "autons" module to vexide, an optional module that creates a very simple auton selelctor allowing for multiple routes on one program, within the included objects in Eclipselib we have a number of ways to control the motors in Autonomous, these functions are designed to be built off of, either by using pid.rs to include accurate pid control to them, or include some form of sensor to provide better information then the motor encoder.

While the motor encoder in the Smart Motor is relitivly precise, many more advanced robots may need more precise movement, especially during auto

:::autoblock
AdvMotor, MotorGroup:
- `spin_to(degrees)`: Spins the desired motor(s) to a `degrees`
- `spin(eclipselib::direction)`: spins the desired motor(s) until `stop()` is called
- `stop()`: stops the motor

SimpleTankDrive:
- `drive_for(distance)`: drives robot for a desired `distance`
- `turn_to(heading)`: turns robot to an absolute `heading`

AdvTankDrive, XDrive, SwerveDrive:
- `turn_to(heading)`: turns robot to an absolute `heading`
- `drive_to_coordinates(eclipselib::spline)`: drives the robot to the desired coordinates
:::
