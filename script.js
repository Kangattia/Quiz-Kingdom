const selectedText = document.getElementById("selectedText");
const playerNameInput = document.getElementById("playerNameInput");
const playerTitle = document.getElementById("playerTitle");
const playerPoints = document.getElementById("playerPoints");
const playerLevels = document.getElementById("playerLevels");
const playBtn = document.getElementById("playBtn");
const backBtn = document.getElementById("backBtn");
const historyBtn = document.getElementById("historyBtn");
const bibleBtn = document.getElementById("bibleBtn");
const scienceBtn = document.getElementById("scienceBtn");
const geographyBtn = document.getElementById("geographyBtn");
const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");

const questionText = document.getElementById("questionText");
const categoryTitle = document.getElementById("categoryTitle");

const answerButtons = document.querySelectorAll(".answerBtn");

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let playerProfile = {

    username: "",

    totalPoints: 0,

    title: "🌱 Kingdom Recruit",

    levelsCompleted: 0,

    perfectLevels: 0,

    questionsMastered: 0,

    highestScore: 0,

    firstPlayed: "",

    lastPlayed: ""

};
let questionPointsEarned = 0;
let levelBonusEarned = false;
let streakBonusEarned = false;
let selectedCategory = "History";
let questions = questionBank[selectedCategory];
const scoreText = document.getElementById("scoreText");
const questionCounter = document.getElementById("questionCounter");
const timerText = document.getElementById("timerText");
const resultScreen = document.getElementById("resultScreen");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");
historyBtn.addEventListener("click", function () {

    selectedCategory = "History";
    questions = questionBank[selectedCategory];
shuffleQuestions();
    currentQuestion = 0;
    score = 0;
selectedText.textContent = "Selected: 🌍 History";
    historyBtn.classList.add("selected");
    bibleBtn.classList.remove("selected");

});



bibleBtn.addEventListener("click", function () {

    selectedCategory = "Bible";
    questions = questionBank[selectedCategory];
shuffleQuestions();
    currentQuestion = 0;
    score = 0;
selectedText.textContent = "Selected: ✝️ Bible";
    bibleBtn.classList.add("selected");
    historyBtn.classList.remove("selected");

});
scienceBtn.addEventListener("click", function () {

    selectedCategory = "Science";
    questions = questionBank[selectedCategory];
shuffleQuestions();
    currentQuestion = 0;
    score = 0;

    selectedText.textContent = "Selected: 🔬 Science";

    scienceBtn.classList.add("selected");
    historyBtn.classList.remove("selected");
    bibleBtn.classList.remove("selected");
    geographyBtn.classList.remove("selected");

});


geographyBtn.addEventListener("click", function () {

    selectedCategory = "Geography";
    questions = questionBank[selectedCategory];
shuffleQuestions();
    currentQuestion = 0;
    score = 0;

    selectedText.textContent = "Selected: 🌍 Geography";

    geographyBtn.classList.add("selected");
    historyBtn.classList.remove("selected");
    bibleBtn.classList.remove("selected");
    scienceBtn.classList.remove("selected");

});
playBtn.addEventListener("click", function () {
    playerName = playerNameInput.value.trim();

if (playerName === "") {

    alert("👑 Enter your kingdom name to continue!");

    return;

}
    playerProfile.username = playerName;

playerProfile.title = getRoyalTitle(playerProfile.totalPoints);

updatePlayerCard();


clickSound.play();
backgroundMusic.play();
homeScreen.style.display = "none";
quizScreen.style.display = "block";

    showQuestion();

});
backBtn.addEventListener("click", function () {

    quizScreen.style.display = "none";
    homeScreen.style.display = "block";

    currentQuestion = 0;
    score = 0;

});
function shuffleQuestions() {

    questions.sort(() => Math.random() - 0.5);

}
function shuffleAnswers(question) {

    let correctAnswer = question.answers[question.correct];

    question.answers.sort(() => Math.random() - 0.5);

    question.correct = question.answers.indexOf(correctAnswer);
}
function getRoyalTitle(points) {

    if (points >= 5000000) {
        return "🌟 Emperor of Knowledge";
    } 
    else if (points >= 2500000) {
        return "👑 High King";
    } 
    else if (points >= 1200000) {
        return "👑 Kingdom King";
    } 
    else if (points >= 600000) {
        return "🏰 Grand Duke";
    } 
    else if (points >= 300000) {
        return "👑 Royal Commander";
    } 
    else if (points >= 150000) {
        return "🦁 Kingdom General";
    } 
    else if (points >= 80000) {
        return "🏰 Royal Warden";
    } 
    else if (points >= 40000) {
        return "⚔️ Knight Commander";
    } 
    else if (points >= 20000) {
        return "🛡️ Knight of the Realm";
    } 
    else if (points >= 9000) {
        return "⚔️ Royal Swordsman";
    } 
    else if (points >= 4000) {
        return "🏹 Elite Archer";
    } 
    else if (points >= 1500) {
        return "⚔️ Veteran Warrior";
    } 
    else if (points >= 500) {
        return "🛡️ Kingdom Guard";
    } 
    else if (points >= 100) {
        return "🗡️ Royal Footman";
    } 
    else {
        return "🌱 Kingdom Recruit";
    }
}
function updatePlayerCard() {

    playerTitle.textContent = 
    "👑 Title: " + playerProfile.title;

    playerPoints.textContent = 
    "🏆 Total Points: " + playerProfile.totalPoints;

    playerLevels.textContent = 
    "📚 Levels Completed: " + playerProfile.levelsCompleted;

}
function startTimer() {

    clearInterval(timer);

    timeLeft = 15;
    timerText.textContent = "⏱️ Time: " + timeLeft;

    timer = setInterval(function () {

        timeLeft--;

        timerText.textContent = "⏱️ Time: " + timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            nextQuestion();

        }

    }, 1000);

}

function showQuestion() {

    let question = questions[currentQuestion];
shuffleAnswers(question);
    startTimer();
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
        clearInterval(timer);
clickSound.play();
        let question = questions[currentQuestion];

        if (index === question.correct) {

    score++;

    scoreText.textContent = "Score: " + score;
            totalPoints += 10;

if (timeLeft > 10) {

    totalPoints += 5;

}

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
