const playBtn = document.getElementById("playBtn");

playBtn.addEventListener("click", function () {

    alert("Welcome to Quiz Kingdom!\n\nChoose History or Bible to begin.\n\n(The category selection screen is coming in the next step.)");

});
const playBtn = document.querySelector("#playBtn");
const homeScreen = document.querySelector("#homeScreen");
const quizScreen = document.querySelector("#quizScreen");

playBtn.addEventListener("click", () => {
  homeScreen.style.display = "none";
  quizScreen.style.display = "block";
});
