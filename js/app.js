// See wireframe here:
// https://miro.com/app/board/uXjVNdHUIDI=/?share_link_id=168631429658

// Ice box:
// High priority: 'Hide' the secretCode and only render after the user has won OR after 10 guesses have been made.
// Medium priority: Allow users to clear currentGuess, as long as they have not yet clicked checkBtn
// Low priority: Grey out check guess button is not clickable if <4 colors selected in currentGuess
// Low priority: Prevent users from being able to select more colors (render to game board) after they have won
// Low priority: Allow users to choose easy or difficult mode; difficult mode would allow each color to appear 1+ times in the secretCode.
// Low priority (or perhaps not needed): Listen for a click in the startGame button and handleNewGame

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
    // userTurn = guessHistory.length
    // currentGuess = guessHistory.pop() -> To do (low priority): Can we use this instead of creating a separate currentGuess variable?
let currentSuccess;
// successHistory two-dimensional array to keep track of user successes, one nested array for each guess: 'red' indicates a red results peg (correct colour and index) and 'white' indicates a white results peg (correct colour, but not index)
let successHistory;
    // currentSuccess = successHistory.pop() -> To do (low priority): Use this instead of current Success variable?
// message variable to display winning message
let message;
// colorChoice variable to temporarily store each color being chosen by user before being rendered to board
let colorChoice;


/*----- cached elements  -----*/
// Store the color choice array (colorOptionsArr) that contains the 8 clickable colour elements at the bottom of the board
const colorOptionsArr = [...document.querySelectorAll('#color-choices > div')];
// Store the color choice section (to be used in event listener)
const colorsSectionEl = document.getElementById('color-choices');
// Store the secret code array (secretCodeArr) at the top of the board
const secretCodeArr = [...document.querySelectorAll('#secret-code > div')];
// Store the button (checkBtn) that compares currentGuess to secretCode and checks for a win
const checkBtn = document.getElementById('check');
// Store the message element that displays the win message
const messageEl = document.getElementById('message');
// Store the button (resetBtn) that resets the game
const resetBtn = document.getElementById('reset');
// Store all elements inside the board in an array
const boardDivsArr = [...document.querySelectorAll('#board > div')];
// Store all elements in the results section in an array
const resultsDivArr = [...document.querySelectorAll('#results > section > div')];


/*----- event listeners -----*/
// Listen for a click in the resetBtnEl and handleReset
resetBtn.addEventListener('click', handleReset);
// Listen for a click in the colorsSectionEl and handleChoice
colorsSectionEl.addEventListener('click', handleChoice);
// Listen for a click in the checkBtnEl and handleGuess
checkBtn.addEventListener('click', handleGuess);


/*----- functions -----*/
init();

// init function to initialize state of the game
function init() {
    // Start with empty arrays for currentGuess and currentSuccess
    currentGuess = [];
    currentSuccess = [];
    // Start with an empty array for guessHistory. For each turn, add new 4-element array representing each guess to end of 2D array
    guessHistory = [];
    // Start with an empty for successHistory. For each turn, add a new array with up to 4 elements representing the results for each guess, to the end of 2D array
    successHistory = [];
    // Start with an intro message
    message = 'Guess the secret code!';
    // Clear colorChoice
    colorChoice = '';
    // Call a function that generates a secret color pattern
    generateSecretCode();

    render();
}

function generateSecretCode() {
    // Set the secretCode to an empty array
    secretCode = [];
    // Set temporary variable of remainingColors, which we will modify each time the loop is run by removing a color from this array after it is added to the secret code. This ensures each color only appears once in the secret code (easy mode for game play) and will make white/red peg calculations easier for now.
    let remainingColors = COLORS.slice();
    for (let i = 0; i < SECRET_CODE_LENGTH; i++) {
        // Generate a random color from the remainingColors array
        const randColor = remainingColors[Math.floor(Math.random() * remainingColors.length)]
        // Add randColor to secret Code array.
        secretCode.push(randColor);
        // Remove this randColor from remainingColors array so that each color can only appear once in the secretCode
        remainingColors.splice(remainingColors.indexOf(randColor), 1);
    };
}

// render function to render state to the DOM
function render() {
    renderColorOptions();
    renderSecretCode();
    renderCell();
    renderResults();
    renderMessage();
}

// Render color options at bottom of board
function renderColorOptions() {
    colorOptionsArr.forEach((color, idx) => {
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
    // guessHistory is not updated with new currentGuess until the user clicks checkBtn. For example, in user's first turn, guessHistory array has no elements (length of 0) until the guess is checked. Therefore, color choice during first guess gets mapped to board's first row (at index 0).
    const rowIdx = guessHistory.length;

    // Generate ID corresponding to HTML cell and get the element
    const cellId = `c${colIdx}r${rowIdx}`;
    const cellEl = document.getElementById(cellId);
    // Guard to prevent error when cellEl is null; e.g. when user clicks checkBtn
    if (cellEl) cellEl.style.backgroundColor = colorChoice;
}

// Render the red and white "results" pegs to the DOM
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
    // Guard to prevent guess from being processed unless currentGuess is exactly 4 elements
    if (currentGuess.length !== 4) return;

    // Reset currentSuccess to empty array
    currentSuccess = [];
    // Add currentGuess to guessHistory array and add currentSuccess to successHistory array
    guessHistory.push(currentGuess);
    successHistory.push(currentSuccess);
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
        // Sort currentSuccess array so that red pegs always appear first and white pegs always appear last. This also re-shuffles the array so that the user does not get an unfair advantage about the location of correct/incorrect colors in their guess
        currentSuccess.sort();
    });

    // If the currentGuess matches the secretCode, update to a win message
    if (currentGuess.join() === secretCode.join()) {
        message = 'Congrats - you guessed the secret code!';
    // Else if user has made all 10 guesses without getting the secretCode, update to a lose message
    } else if (guessHistory.length === MAX_GUESSES) {
        message = 'No more guesses left - you lose!';
    // Otherwise, update to a try again message
    } else {
        message = 'Not quite - try again!';
    }

    // Reset currentGuess and currentSuccess to empty arrays to store data for next guess
    currentGuess = [];
    
    render();
}

function handleReset() {
    clearColors(boardDivsArr);
    clearColors(resultsDivArr);
    init();
}

function clearColors(divArr) {
    divArr.forEach((div) => {
        div.style.backgroundColor = '';
    })
}
