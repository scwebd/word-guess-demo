//* GLOBAL VARIABLES
//========================================//
var wordBank = ["ocelot", "rhinocerous", "giraffe", "sea anemone", "chimpanzee", "peacock", "armadillo", "stingray", "sugar glider"];
var randomWord;
var lettersInWord;
var lettersAndBlanks;
var incorrectGuesses;
var guessesLeft = 9;
var wins = 0;
var losses = 0;

//* FUNCTIONS
//========================================//
function resetGame() {
    document.getElementById("won-or-lost").textContent = "Guess Away!";
    randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    lettersInWord = randomWord.split("");
    lettersAndBlanks = [];
    incorrectGuesses = [];
    guessesLeft = 9;

    for (var i = 0; i < lettersInWord.length; i++) {
        lettersAndBlanks.push("_");
    }

    updateHTML();

    console.log("Random word: " + randomWord);
}

function checkLetter(letter) {
    var isLetterFound = false;

    if (lettersInWord.indexOf(letter) != -1) {
        isLetterFound = true;
    } else {
        guessesLeft--;
        incorrectGuesses.push(letter)
    }

    if (isLetterFound) {
        for (var i = 0; i < lettersInWord.length; i++) {
            if (lettersInWord[i].toLowerCase() === letter) {
                lettersAndBlanks[i] = letter;
            }
        }
    }

    checkWinLoss();
}

function checkWinLoss() {
    if (guessesLeft === 0) {
        document.getElementById("won-or-lost").textContent = "You lose, sucker!";
        losses++;
        setTimeout(resetGame, 1500);
    } else if (lettersInWord.join("") === lettersAndBlanks.join("")) {
        document.getElementById("won-or-lost").textContent = "You won, champion!";
        wins++;
        setTimeout(resetGame, 1500);
    }

}

function updateHTML() {
    document.getElementById("letter-blanks").textContent = lettersAndBlanks.join(" ");
    document.getElementById("wrong-guesses").textContent = incorrectGuesses;
    document.getElementById("guesses-left").textContent = guessesLeft;
    document.getElementById("win-counter").textContent = wins;
    document.getElementById("loss-counter").textContent = losses;
}

//* MAIN PROCESS
//========================================//
document.onkeyup = function(event) {
    var letterGuessed = event.key.toLowerCase();

    checkLetter(letterGuessed);
    updateHTML();
}

resetGame();