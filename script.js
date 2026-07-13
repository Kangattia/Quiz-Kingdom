const playBtn = document.getElementById("playBtn");
const homeScreen = document.getElementById("homeScreen");
const quizScreen = document.getElementById("quizScreen");

playBtn.addEventListener("click", function () {
    homeScreen.style.display = "none";
    quizScreen.style.display = "block";
});
