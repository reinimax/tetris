# Reflection

* I planned this out in the beginnning, outlining a rough step-by-step plan. Knowing beforehand what needs to be done and having kind of intermediate goals was really good for motivation and keeping my coding focused.
* I was too lazy to do that in the beginning, but TDD would have made a lot of sense for this project.
* In looking back, I probably overdid the architecture. I am quite proud of the code and I think it reads pretty well, but for a game like this, it's probably overkill. Also, the abstraction of a single tetris piece into its own class adds more complexity than it's worth. It would probably have been easier to do movement and turning directly on the game board.
* I'm pretty proud of my implementation of a state machine for the game loop, that is, deferring updates and rendering to the current game state. This makes the game much more extensible and maintainable. Adding additional states, e.g. for navigating a menu, is a breeze.
* Maybe doing this in TypeScript would have been a good idea. Trying to implement an OOP pattern like State without types and interfaces feels weird.
