const selectedText = document.getElementById("selectedText");
const playerNameInput = document.getElementById("playerNameInput");
const playerTitle = document.getElementById("playerTitle");
const playerPoints = document.getElementById("playerPoints");
const playerLevels = document.getElementById("playerLevels");
const playBtn = document.getElementById("playBtn");
const backBtn = document.getElementById("backBtn");
const rankingBtn = document.getElementById("rankingBtn");
const rankingScreen = document.getElementById("rankingScreen");
const rankingList = document.getElementById("rankingList");
const backRankingBtn = document.getElementById("backRankingBtn");
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
let questionAnswered = false;
let playerProfile = {
    username: "",
    totalPoints: 0,
    title: "🌱 Kingdom Recruit",
    levelsCompleted: 0,
    completedLevels: [],
    answeredQuestions: [],
    perfectLevels: 0,
    questionsMastered: 0,
    highestScore: 0,
    firstPlayed: "",
    lastPlayed: ""
};
let kingdomPlayers = [];
let questionPointsEarned = 0;
let levelBonusEarned = false;
let streakBonusEarned = false;
let firstAttemptPerfect = true;
let selectedCategory = "History";
let questions = questionBank[selectedCategory];
let currentLevelID = selectedCategory + "_Level_1";
const scoreText = document.getElementById("scoreText");
const questionCounter = document.getElementById("questionCounter");
const timerText = document.getElementById("timerText");
const resultScreen = document.getElementById("resultScreen");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

// ---------- Safe helper wrappers ----------

// Plays an Audio object if it exists, and never throws / blocks execution.
function safePlay(sound) {
    try {
        if (sound && typeof sound.play === "function") {
            const p = sound.play();
            if (p && typeof p.catch === "function") {
                p.catch(() => {});
            }
        }
    } catch (e) {
        console.warn("Audio playback failed:", e);
    }
}

// Wraps localStorage writes so a blocked/unavailable storage never crashes the game.
function safeSetItem(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        console.warn("Could not save to localStorage:", e);
    }
}

// Wraps localStorage reads the same way.
function safeGetItem(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        console.warn("Could not read from localStorage:", e);
        return null;
    }
}

// ---------- Category selection ----------

historyBtn.addEventListener("click", function () {
    selectedCategory = "History";
    questions = questionBank[selectedCategory];
    shuffleQuestions();
    currentQuestion = 0;
    score = 0;
    selectedText.textContent = "Selected: 🌍 History";
    historyBtn.classList.add("selected");
    bibleBtn.classList.remove("selected");
    scienceBtn.classList.remove("selected");
    geographyBtn.classList.remove("selected");
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
    scienceBtn.classList.remove("selected");
    geographyBtn.classList.remove("selected");
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

// ---------- Play / navigation ----------

playBtn.addEventListener("click", function () {
    const playerName = playerNameInput.value.trim();

    if (playerName === "") {
        alert("👑 Enter your kingdom name to continue!");
        return;
    }

    playerProfile.username = playerName;
    playerProfile.title = getRoyalTitle(playerProfile.totalPoints);

    updatePlayerCard();
    savePlayerProfile();
    firstAttemptPerfect = true;

    safePlay(window.clickSound);
    safePlay(window.backgroundMusic);

    homeScreen.style.display = "none";
    quizScreen.style.display = "block";

    showQuestion();
});

rankingBtn.addEventListener("click", function () {
    homeScreen.style.display = "none";
    rankingScreen.style.display = "block";
    showLeaderboard();
});

backBtn.addEventListener("click", function () {
    quizScreen.style.display = "none";
    homeScreen.style.display = "block";
    currentQuestion = 0;
    score = 0;
});

backRankingBtn.addEventListener("click", function () {
    rankingScreen.style.display = "none";
    homeScreen.style.display = "block";
});

// ---------- Game logic ----------

function shuffleQuestions() {
    questions.sort(() => Math.random() - 0.5);
}

function shuffleAnswers(question) {
    let correctAnswer = question.answers[question.correct];
    question.answers.sort(() => Math.random() - 0.5);
    question.correct = question.answers.indexOf(correctAnswer);
}

function getRoyalTitle(points) {
    if (points >= 5000000) return "🌟 Emperor of Knowledge";
    if (points >= 2500000) return "👑 High King";
    if (points >= 1200000) return "👑 Kingdom King";
    if (points >= 600000) return "🏰 Grand Duke";
    if (points >= 300000) return "👑 Royal Commander";
    if (points >= 150000) return "🦁 Kingdom General";
    if (points >= 80000) return "🏰 Royal Warden";
    if (points >= 40000) return "⚔️ Knight Commander";
    if (points >= 20000) return "🛡️ Knight of the Realm";
    if (points >= 9000) return "⚔️ Royal Swordsman";
    if (points >= 4000) return "🏹 Elite Archer";
    if (points >= 1500) return "⚔️ Veteran Warrior";
    if (points >= 500) return "🛡️ Kingdom Guard";
    if (points >= 100) return "🗡️ Royal Footman";
    return "🌱 Kingdom Recruit";
}

function updatePlayerCard() {
    playerTitle.textContent = "⚔️ Rank: " + playerProfile.title;
    playerPoints.textContent = "🏆 Total Points: " + playerProfile.totalPoints;
    playerLevels.textContent = "📚 Levels Completed: " + playerProfile.levelsCompleted;
}

// Guarded: does nothing (instead of crashing) if #pointsPopup isn't in the HTML.
function showPointsPopup(points) {
    const popup = document.getElementById("pointsPopup");
    if (!popup) {
        console.warn('showPointsPopup: no element with id="pointsPopup" found in the HTML.');
        return;
    }
    popup.textContent = "✨ +" + points + " Points!";
    popup.style.display = "block";
    setTimeout(() => {
        popup.style.display = "none";
    }, 2000);
}

function savePlayerProfile() {
    safeSetItem("quizKingdomProfile", JSON.stringify(playerProfile));
}

function saveToLeaderboard() {
    let existingPlayer = kingdomPlayers.find(
        player => player.username === playerProfile.username
    );

    if (existingPlayer) {
        existingPlayer.totalPoints = playerProfile.totalPoints;
        existingPlayer.title = playerProfile.title;
    } else {
        kingdomPlayers.push(playerProfile);
    }

    safeSetItem("quizKingdomPlayers", JSON.stringify(kingdomPlayers));
}

function showLeaderboard() {
    rankingList.innerHTML = "";

    kingdomPlayers.sort((a, b) => b.totalPoints - a.totalPoints);

    kingdomPlayers.forEach((player, index) => {
        let rank = index + 1;
        rankingList.innerHTML +=
            "<p>" +
            rank + ". 👑 " +
            player.username +
            " - " +
            player.title +
            " - " +
            player.totalPoints +
            " pts" +
            "</p>";
    });
}

function loadPlayerProfile() {
    let savedProfile = safeGetItem("quizKingdomProfile");

    if (savedProfile) {
        try {
            playerProfile = JSON.parse(savedProfile);
            playerNameInput.value = playerProfile.username;
            updatePlayerCard();
        } catch (e) {
            console.warn("Saved profile was corrupted, starting fresh:", e);
        }
    }

    let savedPlayers = safeGetItem("quizKingdomPlayers");

    if (savedPlayers) {
        try {
            kingdomPlayers = JSON.parse(savedPlayers);
        } catch (e) {
            console.warn("Saved leaderboard was corrupted, starting fresh:", e);
        }
    }
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

            if (!questionAnswered) {
                questionAnswered = true;
                nextQuestion();
            }
        }
    }, 1000);
}

function showQuestion() {
    answerButtons.forEach(button => {
        button.disabled = false;
        button.classList.remove("correct", "wrong");
    });

    questionAnswered = false;
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
        if (questionAnswered) return;

        questionAnswered = true;
        clearInterval(timer);
        safePlay(window.clickSound);

        let question = questions[currentQuestion];

        if (index === question.correct) {
            answerButtons.forEach(btn => {
                btn.disabled = true;
            });

            score++;
            scoreText.textContent = "Score: " + score;

            let questionID = question.id;

            if (!playerProfile.answeredQuestions.includes(questionID)) {
                playerProfile.totalPoints += 10;
                showPointsPopup(10);

                if (timeLeft > 10) {
                    playerProfile.totalPoints += 5;
                }

                playerProfile.answeredQuestions.push(questionID);
            }

            playerProfile.title = getRoyalTitle(playerProfile.totalPoints);
            updatePlayerCard();
            savePlayerProfile();
            saveToLeaderboard();

            button.textContent = "✅ " + button.textContent;
            button.classList.add("correct");

            safePlay(window.correctSound);

            if (navigator.vibrate) {
                navigator.vibrate(100);
            }

            setTimeout(() => {
                nextQuestion();
            }, 800);

        } else {
            firstAttemptPerfect = false;
            button.textContent = "❌ " + button.textContent;
            button.classList.add("wrong");

            safePlay(window.wrongSound);

            if (navigator.vibrate) {
                navigator.vibrate(200);
            }

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
        if (score === questions.length && !playerProfile.completedLevels.includes(currentLevelID)) {
            playerProfile.levelsCompleted += 1;
            playerProfile.totalPoints += 10;

            if (firstAttemptPerfect) {
                playerProfile.totalPoints += 100;
                showPointsPopup(100);
            }

            playerProfile.title = getRoyalTitle(playerProfile.totalPoints);
            updatePlayerCard();
            playerProfile.completedLevels.push(currentLevelID);

            savePlayerProfile();
            saveToLeaderboard();
        }

        safePlay(window.victorySound);

        setTimeout(() => {
            quizScreen.style.display = "none";
            resultScreen.style.display = "block";
        }, 1500);

        finalScore.textContent = "Your Score: " + score + "/" + questions.length;

        const resultMessage = document.getElementById("resultMessage");

        if (resultMessage) {
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
}

restartBtn.addEventListener("click", function () {
    currentQuestion = 0;
    firstAttemptPerfect = true;
    score = 0;

    scoreText.textContent = "Score: 0";

    resultScreen.style.display = "none";
    quizScreen.style.display = "block";

    showQuestion();
});

loadPlayerProfile();
