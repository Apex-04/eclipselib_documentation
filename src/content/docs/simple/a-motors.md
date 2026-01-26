---
title: Motor Objects (motor.rs)
---

motor.rs adds a dedicated Motor gorup to allow the user to address multiple motors in 1 command, these motor groups are primarily used in the Drivetrain Objects but can also be used if you need 2 motors always doing the same thing. for example on a flywheel or an intake.

:::codeblock
```rust
motor_group: vec![
motor.new(/*motor definition*/),
motor.new(/*motor definition*/)
]
```
:::
