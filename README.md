# zomblocks blockiller

This html5/javascript top-down shooter was developed for the [Ludum Dare 26](http://ludumdare.com/compo/ludum-dare-26) game jam.

Keep in mind that due to the time restrictions (48h) to release the first working version of the game, there are probably some bugs and some inefficient code that can be optimised.

In a nutshell, the engine is composed by:

* A resource manager that is used to queue up the assets and has a callback function for when everything is downloaded;
* A state manager, which holds the current state of the game;
* Game states, each with its own methods for updating, drawing, starting and finishing;
* A main loop that is called continuously to update and draw the current state.