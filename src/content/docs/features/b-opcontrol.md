---
title: Driver (Op Control)
description: A reference page in my new Starlight docs site.
---

Eclipselib offers basic functions for op control like toggles, and soft stops, and basic movement, however it is highly reccomended if you need to fine-tune your op-control to account for behavior or usecases we have not though of, to do so as a part of robot.rs, additionally any custom subsystems defined in robot.rs will probably have weird behavior when using the integrated op-control functions

Eclipselib also offers all types of Drivetrain control.

All opcontrol functions:

:::opcblock
AdvMotor, Motorgroup:
- `opc_normal(button, volt)`: drives motor if `button` is being pressed
- `opc_toggle(button, volt)`: toggles motor on or off when `button` is pressed
- `opc_softstop(button, volt, stop_value)`: drives motor if `button` is being pressed until the motor encoder hits `stop_value`

TankDrive, SwerveDrive,  XDrive
- `opc_drive`: drives the robot
> 2-stick Arcade for TankDrive (Simple and Advanced),
> Field Oriented control for XDrive and SwerveDrive
:::
