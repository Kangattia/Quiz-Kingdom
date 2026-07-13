const playBtn = document.getElementById("playBtn");
const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");

const questionText = document.getElementById("questionText");
const categoryTitle = document.getElementById("categoryTitle");

const answerButtons = document.querySelectorAll(".answerBtn");

let currentQuestion = 0;
let score = 0;

const scoreText = document.getElementById("scoreText");

playBtn.addEventListener("click", function () {

    homeScreen.style.display = "none";
    quizScreen.style.display = "block";

    showQuestion();

});


function showQuestion() {

    let question = questions[currentQuestion];

    categoryTitle.textContent = question.category;

    questionText.textContent = question.question;

    answerButtons[0].textContent = question.answers[0];
    answerButtons[1].textContent = question.answers[1];
    answerButtons[2].textContent = question.answers[2];
    answerButtons[3].textContent = question.answers[3];

}
answerButtons.forEach((button, index) => {

    button.addEventListener("click", function () {

        let question = questions[currentQuestion];

        if (index === question.correct) {
            button.textContent = "✅ " + button.textContent;
            alert("Correct! 👑");
        } else {
            button.textContent = "❌ " + button.textContent;
            alert("Wrong answer!");
        }

    });

});
