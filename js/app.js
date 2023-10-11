// See wireframe here:
// https://miro.com/app/board/uXjVNdHUIDI=/?share_link_id=168631429658

/*----- constants -----*/
// Define the maximum number of guesses allowed
const MAX_GUESSES = 10;
// Define the array of 8 colours to choose from
const COLORS = ['red', 'darkorange', 'yellow', 'green', 'blue', 'aqua','purple', 'hotpink']
// Define the length of the secret code
const SECRET_CODE_LENGTH = 4;


/*----- state variables -----*/
// secretCode array to represent the randomly-generated colour pattern
let secretCode;
// currentGuess array to represent the array of user-selected colours in the current turn
let currentGuess;
// guessHistory two-dimensional array to keep track of user guesses, one nested array for each guess
let guessHistory;
    // userTurns = guessHistory.length
    // currentGuess = guessHistory.shift() -> To do (low priority): Can we use this instead of creating a separate currentGuess variable?
// successHistory object to keep track of user successes per guess: 'r' property stores an array of red 'pegs' per guess (correct colour and index) and 'w' property stores an array of white 'pegs' per guess (correct colour, but not index)
let currentSuccess;
let successHistory;
    // currentSuccess = successHistory.shift()
// message variable to display winning message
let message;


/*----- cached elements  -----*/
// Store the color choice array (colorChoiceArr) that contains the 8 clickable colour elements at the bottom of the board
const colorChoiceArr = [...document.querySelectorAll('#color-choices > div')];
// Store the color choice section (to be used in event listener)
const colorsSectionEl = document.getElementById('color-choices');
// Store the secret code array (secretCodeArr) at the top of the board
const secretCodeArr = [...document.querySelectorAll('#secret-code > div')];
// Store the button (checkBtn) that compares currentGuess to secretCode and checks for a win
const checkBtn = document.getElementById('check');
// Store the message element that displays the win message
const messageEl = document.getElementById('message');
// To do (medium priority): Store the button (resetBtnEl) that resets the game


/*----- event listeners -----*/
// To do (medium priority): Listen for a click in the startGame button and handleNewGame
// To do (medium priority): Listen for a click in the resetBtnEl and handleNewGame
// Listen for a click in the colorsSectionEl and handleChoice
colorsSectionEl.addEventListener('click', handleChoice);
// Listen for a click in the checkBtnEl and checkWin
checkBtn.addEventListener('click', checkWin);


/*----- functions -----*/
init();

// init function to initialize state of the game
function init() {
    currentGuess = [];
    currentSuccess = {};
    // Start with an empty array for guessHistory. For each turn, add new 4-element array representing each guess to beginning of array
    guessHistory = [];
    // Start with an empty object, which will eventually have two properties ('r' and 'w') with values of arrays
    successHistory = [];
    // Clear the message
    message = '';
    // Call a function that generates a secret color pattern
    generateSecretCode();

    render();
}

function generateSecretCode() {
    // Set the secretCode to an empty array
    secretCode = [];
    // Set temporary variable of remainingColors, which we will modify each time the loop is run by removing a color from this array after it is added to the secret code. This ensures each color only appears once in the secret code (easy mode for game play) and will make white/red peg calculations easier for now.
    // To do (low priority): Allow users to choose easy or difficult mode; difficult mode would allow each color to appear 1+ times in the secretCode.
    let remainingColors = COLORS.slice();
    for (let i = 0; i < SECRET_CODE_LENGTH; i++) {
        const randColor = remainingColors[Math.floor(Math.random() * remainingColors.length)]
        // Add randColor to secret Code array.
        secretCode.push(randColor);
        // Remove this randColor from remainingColors array so that each color can only appear once in the secretCode
        remainingColors.splice(remainingColors.indexOf(randColor), 1);
    };
}

// render function to render state to the DOM
function render() {
    renderColorChoices();
    renderSecretCode();
    renderBoard();
    renderMessage();
}

// Render color choices at bottom of board
function renderColorChoices() {
    colorChoiceArr.forEach((colorChoice, idx) => {
        colorChoice.style.backgroundColor = COLORS[idx];
    })
}

// We'll render the secretCode at the top of the board for now to make testing easier. Later, we will have to 'hide' the secretCode and only render after the user has won OR after 10 guesses have been made.
function renderSecretCode() {
    secretCodeArr.forEach((secretCodeDiv, idx) => {
        secretCodeDiv.style.backgroundColor = secretCode[idx];
    })
}

// To do (high priority): Render empty board with 10 rows by 5 columns (4 columns for each colour of currentGuess and 1 column for the successTurn)
function renderBoard() {

}

// Render message if user has won
function renderMessage() {
    messageEl.innerText = message;
}

// To do (medium priority): handleNewGame function to randomly generate the secretCode and render initial state of the game

// handleChoice function to create currentGuess array
function handleChoice(e) {
    const colorChoice = e.target.style.backgroundColor;
    if (e.target.tagName !== 'DIV') return;
    if (currentGuess.length < 4) currentGuess.push(colorChoice);
}
// checkWin function to compare currentGuess to secretCode
function checkWin() {
    // If the currentGuess matches the secretCode, update to a win message and render it
    console.log(currentGuess);
    if (currentGuess.join() === secretCode.join()) {
        message = 'Congrats - you guessed the secret code!';
        renderMessage();
        return;
    }

    // To do (high priority):
    // if any of the currentGuess colours match the secretCode colours, then:
    secretCode.forEach((color, idx) => {
        if (currentGuess[idx] === color) {
            currentSuccess.r ? currentSuccess.r += 1 : currentSuccess.r = 1;
        } else if (currentGuess.includes(color)) {
            currentSuccess.w ? currentSuccess.w += 1 : currentSuccess.w = 1;
        }
    });
    console.log(currentSuccess);
    // if they also match the index, add 1 to the red count in successTurn
    // else, add 1 to the white count in successTurn

    guessHistory.unshift(currentGuess);
    successHistory.unshift(currentSuccess);
    // Reset currentGuess to empty array, for next guess
    currentGuess = [];
    currentSuccess = {};
    console.log(guessHistory);
    console.log(successHistory);

    renderMessage();
}
