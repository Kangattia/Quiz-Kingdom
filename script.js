const playBtn = document.getElementById("playBtn");
const historyBtn = document.getElementById("historyBtn");
const bibleBtn = document.getElementById("bibleBtn");
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
clickSound.play();
    backgroundMusic.play();
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
clickSound.play();
        let question = questions[currentQuestion];

        if (index === question.correct) {

    score++;

    scoreText.textContent = "Score: " + score;

    button.textContent = "✅ " + button.textContent;
button.classList.add("correct");
            correctSound.play();
navigator.vibrate(100);
    setTimeout(() => {
    nextQuestion();
}, 800);

        } else {
            button.textContent = "❌ " + button.textContent;
            button.classList.add("wrong");
            wrongSound.play();
navigator.vibrate(200);
            setTimeout(() => {
    nextQuestion();
}, 800);

        }

    });

});
function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {
victorySound.play();
    quizScreen.style.display = "none";
    resultScreen.style.display = "block";

    finalScore.textContent = "Your Score: " + score + "/" + questions.length;
const resultMessage = document.getElementById("resultMessage");

if (score === questions.length) {

    resultMessage.textContent = "👑 Legendary! You are a true Knowledge King!";

} else if (score >= 7) {

    resultMessage.textContent = "🌟 Excellent! Your kingdom celebrates your wisdom!";

} else if (score >= 5) {

    resultMessage.textContent = "👍 Good effort! Keep improving!";

} else {

    resultMessage.textContent = "📚 Keep learning. Great minds grow every day!";

}
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
