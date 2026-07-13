const playBtn = document.getElementById("playBtn");
const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");

const questionText = document.getElementById("questionText");
const categoryTitle = document.getElementById("categoryTitle");

const answerButtons = document.querySelectorAll(".answerBtn");

let currentQuestion = 0;
let score = 0;

const scoreText = document.getElementById("scoreText");
const questionCounter = document.getElementById("questionCounter");
const resultScreen = document.getElementById("resultScreen");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");
playBtn.addEventListener("click", function () {

    homeScreen.style.display = "none";
    quizScreen.style.display = "block";

    showQuestion();

});


function showQuestion() {

    let question = questions[currentQuestion];

    categoryTitle.textContent = question.category;

    questionText.textContent = question.question;
questionCounter.textContent = 
"Question " + (currentQuestion + 1) + " of " + questions.length;
    answerButtons[0].textContent = question.answers[0];
    answerButtons[1].textContent = question.answers[1];
    answerButtons[2].textContent = question.answers[2];
    answerButtons[3].textContent = question.answers[3];

}
answerButtons.forEach((button, index) => {

    button.addEventListener("click", function () {

        let question = questions[currentQuestion];

        if (index === question.correct) {

    score++;

    scoreText.textContent = "Score: " + score;

    button.textContent = "✅ " + button.textContent;
button.classList.add("correct");
    alert("Correct! 👑");

nextQuestion();

        } else {
            button.textContent = "❌ " + button.textContent;
            button.classList.add("wrong");
            alert("Wrong answer!");

nextQuestion();
        }

    });

});
function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

    quizScreen.style.display = "none";
    resultScreen.style.display = "block";

    finalScore.textContent = "Your Score: " + score + "/" + questions.length;

    }

}
restartBtn.addEventListener("click", function () {

    currentQuestion = 0;
    score = 0;

    scoreText.textContent = "Score: 0";

    resultScreen.style.display = "none";
    quizScreen.style.display = "block";

    showQuestion();

});
