// See wireframe here:
// https://miro.com/app/board/uXjVNdHUIDI=/?share_link_id=168631429658

// Bugs:
// Need to add guard to checkBtn so that it can only be clicked after 4 colors have been selected (enhancement: button greyed out otherwise?)

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
let currentSuccess;
// successHistory two-dimensional array to keep track of user successes, one nested array for each guess: 'red' indicates a red results peg (correct colour and index) and 'white' indicates a white results peg (correct colour, but not index)
let successHistory;
    // currentSuccess = successHistory.shift() -> To do (low priority): Use this instead of current Success variable?
// message variable to display winning message
let message;
// colorChoice variable to temporarily store each color being chosen by user before being rendered to board
let colorChoice;


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
// Listen for a click in the checkBtnEl and handleGuess
checkBtn.addEventListener('click', handleGuess);


/*----- functions -----*/
init();

// init function to initialize state of the game
function init() {
    currentGuess = [];
    currentSuccess = [];
    // Start with an empty array for guessHistory. For each turn, add new 4-element array representing each guess to beginning of array
    guessHistory = [];
    // Start with an empty object, which will eventually have two properties ('r' and 'w') with values of arrays
    successHistory = [];
    // Clear the message
    message = '';
    colorChoice = '';
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
    renderCell();
    renderResults();
    renderMessage();
}

// Render color choices at bottom of board
function renderColorChoices() {
    colorChoiceArr.forEach((color, idx) => {
        color.style.backgroundColor = COLORS[idx];
    })
}

// We'll render the secretCode at the top of the board for now to make testing easier. Later, we will have to 'hide' the secretCode and only render after the user has won OR after 10 guesses have been made.
function renderSecretCode() {
    secretCodeArr.forEach((secretCodeDiv, idx) => {
        secretCodeDiv.style.backgroundColor = secretCode[idx];
    })
}

// renderCell function to update board with color selected by user
function renderCell() {
    // The length of currentGuess (1 to 4) indicates the col position, but we must subtract 1 to account for 0-based array index.
    const colIdx = currentGuess.length - 1;
    // guessHistory is not updated with new currentGuess until user clicks the checkBtn. For example, in user's first turn, guessHistory array has no elements (length of 0) until the guess is checked. Therefore, color choice during first guess gets mapped to board's first row (at index 0).
    const rowIdx = guessHistory.length;

    // Generate ID corresponding to HTML cell and get the element
    const cellId = `c${colIdx}r${rowIdx}`;
    const cellEl = document.getElementById(cellId);
    // Guard to prevent background color being updated when cellEl is null; e.g. when user clicks checkBtn
    if (cellEl) cellEl.style.backgroundColor = colorChoice;
}

function renderResults() {
    currentSuccess.forEach((successColor, idx) => {
        const resultsId = `r${successHistory.length - 1}-${idx}`;
        const resultsEl = document.getElementById(resultsId);
        resultsEl.style.backgroundColor = successColor;
    })
}

// Render message if user has won
function renderMessage() {
    messageEl.innerText = message;
}

// To do (medium priority): handleNewGame function to randomly generate the secretCode and render initial state of the game

// handleChoice function to create currentGuess array
function handleChoice(e) {
    if (e.target.tagName !== 'DIV') return;
    if (currentGuess.length < 4) {
        colorChoice = e.target.style.backgroundColor;
        currentGuess.push(colorChoice); 
    }
    renderCell(); // Question: Can I call renderCell() here instead of render to save processing time?
}

// handleGuess function to compare currentGuess to secretCode
function handleGuess() {
    if (currentGuess.length !== 4) return;
    // Iterate over secretCode to generate array of red and white 'results' pegs
    secretCode.forEach((color, idx) => {
        // In the guess, if the correct color is at the correct index...
        if (currentGuess[idx] === color) {
            // add 1 to the red count in successTurn
            currentSuccess.push('red');
        } else if (currentGuess.includes(color)) {
            // else, add 1 to the white count in successTurn
            currentSuccess.push('white');
        }
        currentSuccess.sort();
        // To do (medium): generate function to shuffle array for random results order
    });

    // If the currentGuess matches the secretCode, update to a win message and render it
    if (currentGuess.join() === secretCode.join()) {
        message = 'Congrats - you guessed the secret code!';
    }

    // Add currentGuess to guessHistory array and add currentSuccess to successHistory array
    guessHistory.push(currentGuess);
    successHistory.push(currentSuccess);

    // Reset currentGuess and currentSuccess to empty arrays to store data for next guess
    currentGuess = [];
    
    render();

    currentSuccess = []; // To do (medium): Fix this so that it appears above render
}
