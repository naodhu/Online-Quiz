const startButton = document.getElementById("start-btn");
const viewHighscoresButton = document.getElementById("view-highscores-btn");
const nextButton = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const questionContainer = document.getElementById("question-container");
const timerDisplay = document.getElementById("timer");
const timeElement = document.getElementById("time");
const gameOver = document.getElementById("game-over");
const saveScoreButton = document.getElementById("save-score-btn");
const initialsInput = document.getElementById("initials");
const highscores = document.getElementById("highscores");
const highscoresList = document.getElementById("highscores-list");
const clearHighscoresButton = document.getElementById("clear-highscores-btn");
const backButton = document.getElementById("back-btn");
const finalScore = document.getElementById("final-score");

const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["1. Strings", "2. booleans", "3. alerts", "4. Numbers"],
    correct: 2,
  },
  {
    question: "The condition in an if/else statement is enclosed within ____.",
    answers: [
      "1. quotes",
      "2. curly brackets",
      "3. parentheses",
      "4. square brackets",
    ],
    correct: 1,
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    answers: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    correct: 3,
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    correct: 2,
  },
  {
    question: "A very useful tool used during development",
    answers: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    correct: 3,
  },
];

let currentQuestionIndex = 0;
let timeLeft = 60;
let timer;

startButton.addEventListener("click", startQuiz);
viewHighscoresButton.addEventListener("click", viewHighscores);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  displayQuestion();
});
saveScoreButton.addEventListener("click", saveScore);
clearHighscoresButton.addEventListener("click", clearHighscores);
backButton.addEventListener("click", goBack);

function startQuiz() {
  startButton.classList.add("hidden");
  viewHighscoresButton.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  timer = setInterval(updateTimer, 1000);
  displayQuestion();
}

function displayQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = questions[currentQuestionIndex];
    questionContainer.innerHTML = `
              <h2>${question.question}</h2>
              <ul>
                  ${question.answers
                    .map(
                      (answer, index) =>
                        `<li><button onclick="checkAnswer(${index})">${answer}</button></li>`
                    )
                    .join("")}
              </ul>
          `;
  } else {
    endQuiz();
  }
}

function checkAnswer(answerIndex) {
  const question = questions[currentQuestionIndex];
  const answerButtons = document.querySelectorAll("#question-container button");
  if (answerIndex === question.correct) {
    // Answer is correct, add correct-answer class
    answerButtons[answerIndex].classList.add("correct-answer");

    // Proceed to the next question after a short delay
    setTimeout(() => {
      answerButtons[answerIndex].classList.remove("correct-answer");
      currentQuestionIndex++;
      displayQuestion();
    }, 1000);
  } else {
    // Answer is incorrect, subtract time
    timeLeft -= 10;
    timeElement.textContent = timeLeft;
  }
}

function updateTimer() {
  timeLeft--;
  timeElement.textContent = timeLeft;

  if (timeLeft <= 0) {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  quizContainer.classList.add("hidden");
  gameOver.classList.remove("hidden");
  finalScore.textContent = timeLeft;
}

function saveScore() {
  const initials = initialsInput.value.toUpperCase();
  if (initials.length === 0) {
    alert("Please enter your initials");
    return;
  }

  const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
  const newScore = {
    initials: initials,
    score: timeLeft,
  };

  savedScores.push(newScore);
  savedScores.sort((a, b) => b.score - a.score);
  localStorage.setItem("scores", JSON.stringify(savedScores));
  alert("Your score has been saved!");
  viewHighscores();
}

function viewHighscores() {
  startButton.classList.add("hidden");
  viewHighscoresButton.classList.add("hidden");
  quizContainer.classList.add("hidden");
  gameOver.classList.add("hidden");
  highscores.classList.remove("hidden");
  displayHighscores();
}

function displayHighscores() {
  const savedScores = JSON.parse(localStorage.getItem("scores")) || [];
  highscoresList.innerHTML = savedScores
    .map((score) => `<li>${score.initials}: ${score.score}</li>`)
    .join("");
}

function clearHighscores() {
  localStorage.removeItem("scores");
  displayHighscores();
}

function goBack() {
  highscores.classList.add("hidden");
  startButton.classList.remove("hidden");
  viewHighscoresButton.classList.remove("hidden");
  currentQuestionIndex = 0;
  timeLeft = 60;
}
