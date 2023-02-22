// список слов для угадывания
var words = [
  "apple",
  "banana",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
  "honeydew",
  "kiwi",
  "lemon",
];

// выбираем случайное слово из списка
var word = words[Math.floor(Math.random() * words.length)];

// количество попыток
var maxAttempts = 6;
var attemptsLeft = maxAttempts;

// список угаданных букв
var guessedLetters = [];

// элементы HTML
var wordElement = document.querySelector(".word");
var attemptsElement = document.querySelector(".attempts span");
var lettersElement = document.querySelector(".letters");

// функция для проверки угаданной буквы
function checkLetter(letter) {
  if (guessedLetters.indexOf(letter) !== -1) {
    return; // буква уже была угадана
  }

  if (word.indexOf(letter) === -1) {
    attemptsLeft--;
    attemptsElement.textContent = attemptsLeft;

    if (attemptsLeft === 0) {
      endGame("You lose! The word was " + word + ".");
    }
  } else {
    guessedLetters.push(letter);
    updateWord();
  }

  if (word === wordElement.textContent) {
    endGame("You win! The word was " + word + ".");
  }
}

// функция для обновления слова с угаданны
// функция для обновления слова с угаданными буквами
function updateWord() {
  var wordArray = word.split("");

  for (var i = 0; i < wordArray.length; i++) {
    if (guessedLetters.indexOf(wordArray[i]) !== -1) {
      wordArray[i] = "<span>" + wordArray[i] + "</span>";
    } else {
      wordArray[i] = "_";
    }
  }

  wordElement.innerHTML = wordArray.join(" ");
}

// функция для завершения игры
function endGame(message) {
  alert(message);

  // обновляем страницу
  location.reload();
}

// создаем кнопки для каждой буквы алфавита
for (var i = 65; i <= 90; i++) {
  var letter = String.fromCharCode(i);

  var letterElement = document.createElement("div");
  letterElement.textContent = letter;
  letterElement.classList.add("letter");
  letterElement.addEventListener("click", function () {
    checkLetter(this.textContent.toLowerCase());
    this.classList.add("disabled");
    this.removeEventListener("click", arguments.callee);
  });

  lettersElement.appendChild(letterElement);
}

// обновляем количество попыток
attemptsElement.textContent = attemptsLeft;

// обновляем слово с угаданными буквами
updateWord();
