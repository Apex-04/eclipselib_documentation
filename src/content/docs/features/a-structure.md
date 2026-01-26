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

**main.rs** is where you create the objects that make up your robot, you have the choice of using some of the premade objects like a `MotorGroup` or `Drivetrain`, and more, these objects are aimed to more novice team
  main.rs also has 2 dedicated sections, one to put driver code, and autonomous code. which can be read about more in "opcontrol" and "autons" section.


:::codeblock
in main defining objects is a bit different then PROS and VexCode, main has a dedicated robot construct and is later assigned in `main()`, below i have included some example code, that simply defines a controller

```rust
struct Robot{
controller: Controller // vexide::Controller is implied, with eclipselib constructs you would have to include the prefix
}
impl Robot{
    async fn test_auto(&mut self) {

    }}
impl SelectCompete for Robot {

    async fn driver(&mut self) {
        println!("Driver!");
        loop {
            let controller_state = self.controller.state().unwrap_or_default();
        }
    }
}
#[vexide::main]
async fn main(peripherals: Peripherals) {
    let robot = Robot {
        controller: peripherals.primary_controler,

  }
  robot
      .compete(SimpleSelect::new(
          peripherals.display,
          [route!("Test Auto", Robot::test_auto)],
      ))
      .await;
}
```
:::

**robot.rs** is aimed for more advanced teams, and allows coders to define their own objects like a lift, that can be easily imported into main.rs

**library files**
eclipselib also relies on a number of files that are stored within the project, these are all in the eclipselib directory in src, while you can modify these files, it is highly reccomended not to and instead use robot.rs for any customizations as any changes may break other functionality of eclipselib.

Sub Modules
- motors.rs,
- pneumatics.rs,
- drive.rs,
- pid.rs,
- odometry.rs,
- splines.rs

Additionally as of eclipselib 0.1.0 we added functionality for upcoming swerve modules that we are developing
- swervemod.rs
- swervedrive.rs
