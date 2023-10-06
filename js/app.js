// See wireframe here:
// https://miro.com/app/board/uXjVNdHUIDI=/?share_link_id=168631429658
console.log('app.js is loading!')

/*----- constants -----*/
// Define the maximum number of guesses allowed


/*----- state variables -----*/
// secretCode array to represent the randomly-generated colour pattern
// guessCode array to represent the current user-selected colour pattern
// guessHistory two-dimensional array to keep track of user guesses, one nested array for each turn
    // userTurns = guessHistory.length
// successTurn object that keeps track of the number of red pegs (correct colour and index) and white pegs (correct colour, but not index)
// successHistory two-dimensional array to keep track of user successes, one nested array for each turn


/*----- cached elements  -----*/
// Store the div (coloursDivEl) that contains the 8 clickable colour elements at the bottom of the board
// Store the button (checkBtnEl) that compares guessCode to secretCode
// Store the button (resetBtnEl) that resets the game


/*----- event listeners -----*/
// Listen for a click in the startGame button and handleNewGame
// Listen for a click in the resetBtnEl and handleNewGame
// Listen for a drag and drop in the coloursDivEl and handleChoice 
// Listen for a click in the checkBtnEl and handleGuess


/*----- functions -----*/
// init function to initialize state of the game
// render function to render state to the DOM
    // Render empty board with 10 rows by 5 columns (4 columns for each colour of guessCode and 1 column for the successTurn)
// handleNewGame function to randomly generate the secretCode and render initial state of the game
// handleChoice function to create guessCode array
// handleGuess function to compare guessCode to secretCode
    // if any of the guessCode colours match the secretCode colours, then:
        // if they also match the index, add 1 to the red count in successTurn
        // else, add 1 to the white count in successTurn
