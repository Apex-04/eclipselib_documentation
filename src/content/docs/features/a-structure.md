---
title: Program Structure
description: How an eclipselib project works
---

eclipselib projects has 4 main elements
- main.rs
>- [**driver**](../b-opcontrol)
>- [**autons**](../c-autons)
- [**robot.rs**](../d-robotrs)
- **library files**

**main.rs** is where you create the objects that make up your robot, you have the choice of using some of the premade objects like `advMotor`, `  MotorGroup`, `Drivetrain`, and more, these objects are aimed to more novice team
  main.rs also has 2 dedicated sections, one to put driver code, and autonomous code. which can be read about more in "opcontrol" and "autons" section.

**robot.rs** is aimed for more advanced teams, and allows coders to define their own objects like a lift, that can be easily imported into main.rs

eclipselib also relies on a number of files that are stored within the project, these are all in the eclipselib directory in src, while you can modify these files, it is highly reccomended not to and instead use robot.rs for any customizations as any changes may break other functionality of eclipselib.

Sub Modules
- motors.rs,
- pneumatics.rs,
- drive.rs,
- pid.rs,
- odometry.rs,
- splines.rs

Additionally as of eclipselib 0.0.2 we added functionality for upcoming swerve modules that we are developing
- swervemod.rs
- swervedrive.rs
