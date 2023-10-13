MASTERMIND
===========
Welcome to the challenging and thought-provoking game of **Mastermind**!

Are you always thinking two steps ahead? Do you enjoy your martinis shaken, not stirred? Do you have a closet full of trench coats and high-tech gadgets?

If so, prove you have what it takes to be a secret service agent by cracking the code!

Screenshots
-----------
Board at start of game:
![Start of game](https://i.imgur.com/zsU3vRd.png)

Board during game play:
![Guesses and scores](https://i.imgur.com/cg7Hea2.png)

Technologies Used
-----------------
* JavaScript
* HTML
* CSS

Getting Started
---------------
[Play Mastermind now!](https://mmarentette.github.io/project-1-mastermind/)
### Instructions
The game starts with a secret four-color code, hidden at the top of the board. In this version of Mastermind, no colors are repeated in the secret code.

You have ten chances to crack the code. Make your first guess by choosing from the eight colors at the bottom of the board. Clicking on a color will make it appear in the current guess row. After selecting four colors, click the 'Check guess' button. You are allowed to include a color more than once in your guess, even though the secret code does not have repeated colors.

The computer will score your guess. Each correct color in the correct spot will yield one red 'peg' in the far right column of the board. Each correct color in the incorrect spot will yield one white 'peg.' The order of the red and white pegs displayed on the board has no connection to the order of correct and incorrect colors in your guess.

Make another guess, and the computer will score it again. Repeat this process until you successfully guess the secret code... or until you run out of guesses.

Good luck!


Next Steps
----------
### Medium Priority:
1. Add CSS keyframe animations to display try again/win/loss message. Beyond style, this has an additional benefit of providing the user feedback after checking a guess with no corresponding colors in the secretCode (since no white or red pegs would display).
2. Add instructions for game play that can be toggled visible/hidden (perhaps through a pop-up).
### Low Priority:
1. Provide visual feedback not to click 'Check guess' button (such as 'cursor: not-allowed') if fewer than four colors have been selected in currentGuess.
2. Prevent color choices from being rendered to the board after a user has won, if they have not reset the game yet.
3. Create a toggle for easy and difficult modes. The current mode is easy mode (each color can appear only once in the secretCode). Difficult mode would allow each color to appear one or more times in the secretCode.
4. Fix blue font in text of buttons rendered on mobile devices.
5. Add a StartGame button, event listener and handleNewGame function (but perhaps not necessary).

Wireframe
---------
See wireframe [here](https://miro.com/app/board/uXjVNdHUIDI=/?share_link_id=168631429658)

