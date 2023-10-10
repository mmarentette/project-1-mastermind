// See wireframe here:
// https://miro.com/app/board/uXjVNdHUIDI=/?share_link_id=168631429658

/*----- constants -----*/
// Define the maximum number of guesses allowed
const MAX_GUESSES = 10;
// Define the array of 8 colours to choose from
const COLORS = ['red', 'darkorange', 'yellow', 'green', 'blue', 'aqua','purple', 'hotpink']
const SECRET_CODE_LENGTH = 4;


/*----- state variables -----*/
// secretCode array to represent the randomly-generated colour pattern
let secretCode;
// guessHistory two-dimensional array to keep track of user guesses, one nested array for each guess
let currentGuess;
let guessHistory;
    // userTurns = guessHistory.length
    // currentGuess = guessHistory.shift()
// successHistory object to keep track of user successes per guess: 'r' property stores an array of red 'pegs' per guess (correct colour and index) and 'w' property stores an array of white 'pegs' per guess (correct colour, but not index)
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
// Store the button (checkBtn) that compares guessCode to secretCode
const checkBtn = document.getElementById('check');
// Store the message element that displays the win message
const messageEl = document.getElementById('message');
// Store the button (resetBtnEl) that resets the game


/*----- event listeners -----*/
// Listen for a click in the startGame button and handleNewGame
// Listen for a click in the resetBtnEl and handleNewGame
// Listen for a click in the colorsSectionEl and handleChoice
colorsSectionEl.addEventListener('click', handleChoice);
// Listen for a click in the checkBtnEl and checkWin
checkBtn.addEventListener('click', checkWin);


/*----- functions -----*/
init();

// init function to initialize state of the game
function init() {
    currentGuess = [];
    // Start with an empty array for guessHistory. For each turn, push on new 4-element array representing each guess
    guessHistory = [];
    // Start with an empty object, which will eventually have two properties ('r' and 'w') with values of arrays
    successHistory = {};
    // Clear the message
    message = '';
    // Call a function that generates a secret color pattern
    generateSecretCode();

    render();
}

function generateSecretCode() {
    secretCode = [];
    for (let i = 0; i < SECRET_CODE_LENGTH; i++) {
        const randColor = COLORS[Math.floor(Math.random() * COLORS.length)]
        secretCode.push(randColor);
    }
    console.log(secretCode);
}

// render function to render state to the DOM
    // Render color choices at bottom of board
    // Render empty board with 10 rows by 5 columns (4 columns for each colour of guessCode and 1 column for the successTurn)
function render() {
    renderColorChoices();
    renderSecretCode();
    renderBoard();
    renderMessage();
}

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

function renderBoard() {

}

function renderMessage() {
    messageEl.innerText = message;
}

// handleNewGame function to randomly generate the secretCode and render initial state of the game

// handleChoice function to create guessCode array
function handleChoice(e) {
    const colorChoice = e.target.style.backgroundColor;
    if (e.target.tagName !== 'DIV') return;
    if (currentGuess.length < 4) currentGuess.push(colorChoice);
    console.log(currentGuess);
}
// checkWin function to compare guessCode to secretCode
function checkWin() {
    // If the currentGuess matches the secretCode, update to a win message and render it
    if (currentGuess.join() === secretCode.join()) {
        message = 'Congrats - you guessed the secret code!';
    // To do:
    // if any of the guessCode colours match the secretCode colours, then:
    // if they also match the index, add 1 to the red count in successTurn
    // else, add 1 to the white count in successTurn
    } else {
        guessHistory.unshift(currentGuess);
        // Reset currentGuess to empty array, for next guess
        currentGuess = [];
        console.log(guessHistory);
    }

    renderMessage();
}
