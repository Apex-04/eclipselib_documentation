---
title: Motor Objects (motor.rs)
---

motor.rs has 2 objects that can be created,

- `AdvMotor`, which is an extension on the `vexide::motor` object that adds our op control and autonomous functions,
- `MotorGroup`, which is multiple motors tied together for easy multi-motor subsystems

Note: As of 0.2.1 eclipselib does not support 5.5 watt motor as a part of motors.rs, they still can be used however they may not exist within `AdvMotor` or `MotorGroup`
