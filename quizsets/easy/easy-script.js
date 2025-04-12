// Just a test script to change values dynamically
// Can be deleted later on actual Backend Development

document.addEventListener("DOMContentLoaded", () => {

    // Text Values
    var score = document.querySelector("#score");
    var questionText = document.querySelector("#question-text");
    var optA = document.querySelector("#opt-a-value");
    var optB = document.querySelector("#opt-b-value");
    var optC = document.querySelector("#opt-c-value");
    var optD = document.querySelector("#opt-d-value");

    // Buttons
    var optAButton = document.querySelector("#opt-a");
    var optBButton = document.querySelector("#opt-b");
    var optCButton = document.querySelector("#opt-c");
    var optDButton = document.querySelector("#opt-d");

    var memeImage = document.querySelector("#meme-image");

    score.textContent = "500"
    questionText.textContent = "A new question";
    optA.textContent = "New Option A";


    // Test for Event Listener on each Option Buttons
    var currentAnswer = "";

    optAButton.addEventListener("click", () => {
        currentAnswer = optA.textContent;
        alert("Option A clicked:" + currentAnswer);
    });
      
      optBButton.addEventListener("click", () => {
        alert("Option B clicked:" + currentAnswer);
    });
      
      optCButton.addEventListener("click", () => {
        alert("Option C clicked:" + currentAnswer);
    });
      
      optDButton.addEventListener("click", () => {
        alert("Option D clicked:" + currentAnswer);
    });
      
    // Test for changing Meme Image and Progress Bar based on Current Index
    var currentIndex = 2;
    memeImage.src = `../../images/quiz-assets/meme-img-easy/${currentIndex.toString()}.jpg`

    var progressBar = document.querySelector("#progress-bar");
    var progressValue = document.querySelector("#progress-value");

    const totalQuestions = 5;
    
    let percentage = (currentIndex / totalQuestions) * 100;
    progressBar.style.width = `${percentage}%`;
    progressValue.textContent = `${Math.round(percentage)}%`;


});
