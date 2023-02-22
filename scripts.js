const words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
];

// количество попыток
const maxAttempts = 6;
let attemptsLeft = maxAttempts;
// список угаданных букв
const guessedLetters = [];

// выбираем случайное слово из списка
const word = words[Math.floor(Math.random() * words.length)];
// элементы HTML
const wordElement = document.querySelector(".word");
const attemptsElement = document.querySelector(".attempts");
const lettersElement = document.querySelector(".letters");

// функция для проверки угаданной буквы
function checkLetter(letter) {
  if (guessedLetters.includes(letter)) {
    return; // буква уже была угадана
  }
  guessedLetters.push(letter);

  if (!word.includes(letter)) {
    attemptsLeft--;
    attemptsElement.textContent = attemptsLeft;
  }

  updateWord();

  if (attemptsLeft === 0) {
    endGame(`Sorry, you lost! The word was "${word}".`);
  } else if (wordElement.textContent === word) {
    endGame("Congratulations, you won!");
  }
}
// функция для обновления слова с угаданны
// функция для обновления слова с угаданными буквами
function updateWord() {
  const wordArray = word
    .split("")
    .map((letter) =>
      guessedLetters.includes(letter) ? `<span>${letter}</span>` : "_"
    );
  wordElement.innerHTML = wordArray.join(" ");
}

// функция для завершения игры
function endGame(message) {
  alert(message);
  // обновляем страницу
  location.reload();
}

// создаем кнопки для каждой буквы алфавита
for (let i = 65; i <= 90; i++) {
  const letter = String.fromCharCode(i);
  const letterElement = document.createElement("div");
  letterElement.textContent = letter;
  letterElement.classList.add("letter");
  letterElement.addEventListener("click", () => {
    checkLetter(letter.toLowerCase());
    letterElement.classList.add("disabled");
    letterElement.removeEventListener("click", arguments.callee);
  });
  lettersElement.appendChild(letterElement);
}
// обновляем количество попыток
attemptsElement.textContent = attemptsLeft;

// обновляем слово с угаданными буквами
updateWord();
