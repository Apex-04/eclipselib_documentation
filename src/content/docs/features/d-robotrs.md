---
title: robot.rs
---
Robot.rs is where the programmer can define their own custom objects.
> Ex: a lift that uses a rotation sensor to acheive it's absolute value

Eclipselib cannot account for every subsystem of every robot, so we added robot.rs to hopefully allow a structured method of adding atypical subsytems. when defining a subsystem we reccomend creating your own functions to control them as the integrated functions within eclipselib like `spin_to`, and the `opc` functions assume the motor encoder as the encoder to use,
