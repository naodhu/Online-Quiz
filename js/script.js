const quizData = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: 0,
  },
  {
    question: "What is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Venus"],
    answer: 1,
  },
  {
    question: "What is the highest mountain in the world?",
    choices: [
      "Mount Everest",
      "Mount Kilimanjaro",
      "Mount McKinley",
      "Mount Vinson",
    ],
    answer: 0,
  },
  {
    question: "What is the largest ocean in the world?",
    choices: [
      "Atlantic Ocean",
      "Arctic Ocean",
      "Indian Ocean",
      "Pacific Ocean",
    ],
    answer: 3,
  },
];

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");
const resultsElement = document.getElementById("results");
const scoreElement = document.getElementById("score");
const totalElement = document.getElementById("total");

let currentQuestionIndex = 0;
let score = 0;

function showQuestion() {
  const currentQuestion = quizData[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  choicesElement.innerHTML = "";
  currentQuestion.choices.forEach((choice, index) => {
    const choiceElement = document.createElement("li");
    choiceElement.textContent = choice;
    choiceElement.dataset.index = index;
    choiceElement.addEventListener("click", selectAnswer);
    choicesElement.appendChild(choiceElement);
  });

  if (currentQuestionIndex === quizData.length - 1) {
    nextButton.textContent = "Finish Quiz";
  }

  submitButton.disabled = true;
}

function selectAnswer(event) {
  const selectedChoice = event.target;
  const selectedIndex = parseInt(selectedChoice.dataset.index);

  choicesElement.querySelectorAll("li").forEach((choice) => {
    choice.classList.remove("selected");
  });

  selectedChoice.classList.add("selected");
  submitButton.disabled = false;
}

function submitAnswer() {
  const selectedChoice = choicesElement.querySelector(".selected");

  if (!selectedChoice) {
    return;
  }

  const selectedIndex = parseInt(selectedChoice.dataset.index);
  const currentQuestion = quizData[currentQuestionIndex];

  if (selectedIndex === currentQuestion.answer) {
    score++;
  }

  currentQuestionIndex++;
  showResults();
}

function showResults() {
  if (currentQuestionIndex === quizData.length) {
    quiz.classList.add("hidden");
    resultsElement.classList.remove("hidden");
    scoreElement.textContent = score;
    totalElement.textContent = quizData.length;
  } else {
    showQuestion();
  }
}

function resetQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  quiz.classList.remove("hidden");
  resultsElement.classList.add("hidden");
  showQuestion();
}

showQuestion();
submitButton.addEventListener("click", submitAnswer);
nextButton.addEventListener("click", showResults);
resetButton.addEventListener("click", resetQuiz);
