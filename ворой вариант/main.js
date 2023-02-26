const words = ["hello", "world", "java", "javascript", "user"];
const maxGuesses = 6;

let currentWord;
let remainingGuesses;
let guessedLetters;

const letters = document.getElementById("letters");
const guesses = document.getElementById("guesses");
const resetButton = document.getElementById("reset-button");

function newGame() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  remainingGuesses = maxGuesses;
  guessedLetters = new Set();

  letters.innerHTML = "";
  for (let i = 0; i < 26; i++) {
    const letter = String.fromCharCode(97 + i);
    const button = document.createElement("button");
    button.innerText = letter;
    button.disabled = guessedLetters.has(letter);
    button.addEventListener("click", () => guessLetter(letter));
    letters.appendChild(button);
  }

  updateGuesses();
}

function guessLetter(letter) {
  guessedLetters.add(letter);
  const correctGuess = currentWord.includes(letter);
  if (!correctGuess) {
    remainingGuesses--;
  }
  updateGuesses();

  if (remainingGuesses === 0) {
    endGame(false);
  } else if (
    currentWord.split("").every((letter) => guessedLetters.has(letter))
  ) {
    endGame(true);
  }
}

function updateGuesses() {
  guesses.innerText = currentWord
    .split("")
    .map((letter) => (guessedLetters.has(letter) ? letter : "_"))
    .join(" ");
  resetButton.disabled = false;
}

function endGame(won) {
  alert(won ? "Вы выиграли!" : "Вы проиграли.");
  resetButton.disabled = false;
  for (const button of letters.children) {
    button.disabled = true;
  }
}

resetButton.addEventListener("click", newGame);

newGame();
