const quizData = [
    {
        question: "Какой тип данных используется для хранения целых чисел в C#?",
        answers: ["float", "string", "int", "bool"],
        correct: 2
    },
    {
        question: "Что выведет данный код на экран?",
        code: "int x = 5;\nint y = 2;\nConsole.WriteLine(x / y);",
        answers: ["2.5", "2", "3", "Ошибка компиляции"],
        correct: 1
    },
    {
        question: "Какое ключевое слово используется для создания класса, от которого нельзя наследоваться?",
        answers: ["static", "sealed", "abstract", "private"],
        correct: 1
    },
    {
        question: "Какое значение по умолчанию имеет тип данных bool?",
        answers: ["true", "false", "null", "0"],
        correct: 1
    },
    {
        question: "Что такое инкапсуляция в ООП?",
        answers: [
            "Способность объекта принимать множество форм",
            "Механизм сокрытия внутренних деталей реализации объекта",
            "Процесс создания нового класса на основе существующего",
            "Способность программы выполнять код параллельно"
        ],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswerIndex = null;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionText = document.getElementById('question-text');
const questionCode = document.getElementById('question-code');
const answersContainer = document.getElementById('answers-container');
const nextBtn = document.getElementById('next-btn');
const progressText = document.getElementById('progress-text');
const progressBar = document.getElementById('progress-bar');
const scoreText = document.getElementById('score-text');
const finalScore = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');

function startQuiz() {
    startScreen.classList.add('d-none');
    quizScreen.classList.remove('d-none');
    resultScreen.classList.add('d-none');
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    selectedAnswerIndex = null;
    nextBtn.disabled = true;
    scoreText.textContent = "Очки: " + score;
    
    const totalQuestions = quizData.length;
    progressText.textContent = "Вопрос " + (currentQuestionIndex + 1) + " из " + totalQuestions;
    
    const progressPercent = (currentQuestionIndex / totalQuestions) * 100;
    progressBar.style.width = progressPercent + "%";

    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    if (currentQuestion.code) {
        questionCode.textContent = currentQuestion.code;
        questionCode.classList.remove('d-none');
    } else {
        questionCode.classList.add('d-none');
    }

    answersContainer.innerHTML = '';
    currentQuestion.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.className = 'list-group-item';
        btn.textContent = answer;
        btn.type = 'button';
        btn.onclick = function() { selectAnswer(index); };
        answersContainer.appendChild(btn);
    });
}

function selectAnswer(index) {
    selectedAnswerIndex = index;
    nextBtn.disabled = false;

    const items = answersContainer.getElementsByClassName('list-group-item');
    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove('selected');
    }
    if (items[index]) {
        items[index].classList.add('selected');
    }
}

function nextQuestion() {
    if (selectedAnswerIndex === quizData[currentQuestionIndex].correct) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizScreen.classList.add('d-none');
    resultScreen.classList.remove('d-none');
    finalScore.textContent = score + " / " + quizData.length;
    progressBar.style.width = '100%';

    const percentage = (score / quizData.length) * 100;
    if (percentage === 100) {
        resultMessage.textContent = "Идеально! Вы отлично знаете C#!";
        resultMessage.className = "lead text-success mb-4";
    } else if (percentage >= 60) {
        resultMessage.textContent = "Хороший результат! Но есть над чем поработать.";
        resultMessage.className = "lead text-warning mb-4";
    } else {
        resultMessage.textContent = "Стоит повторить основы C#.";
        resultMessage.className = "lead text-danger mb-4";
    }
}

// Привязка событий клика кнопкам по их ID (защита от ошибок разметки)
document.getElementById('start-btn').onclick = startQuiz;
document.getElementById('next-btn').onclick = nextQuestion;
document.getElementById('restart-btn').onclick = startQuiz;
