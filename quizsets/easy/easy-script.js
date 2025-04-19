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
    var currentIndex = 0;
    memeImage.src = `../../images/quiz-assets/meme-img-easy/${(currentIndex+1).toString()}.jpg`


    // Test for Modal/ Checking Overlay


    var checkingModal = document.querySelector("#checking-modal");
    var nextButton = document.querySelector("#next-button");

    var checkingIcon = document.querySelector("#checking-icon");        // Yung icon. Can only be Check or Cross depending on answer
    var checkingTagline = document.querySelector("#checking-tagline");  // Yung malaki
    var checkingTrivia = document.querySelector("#checking-trivia");    // Yung text description

    checkingIcon.src = "../../images/icons/cross.png"
    checkingTagline.textContent = "Galing naman ni Idol";
    checkingTrivia.textContent = "Alam mo ba na ganito ganyan. Hatdog";


    // Show the modal after clicking an option
    optAButton.addEventListener("click", () => {
      checkingModal.classList.add("active");
      checkingIcon.src = "../../images/icons/check.png"
      checkingTagline.textContent = "Galing naman ni Idol";
      checkingTrivia.textContent = "Alam mo ba na ganito ganyan. Hatdog";  
    });

    optBButton.addEventListener("click", () => {
      checkingModal.classList.add("active");
      checkingIcon.src = "../../images/icons/cross.png"
      checkingTagline.textContent = "Ayusin mo Teh"; 
      checkingTrivia.textContent = "Alam mo ba na ganito ganyan. Hatdog";  
    });


    // Remove modal and update contents after clicking next
    nextButton.addEventListener("click", () => {
      currentIndex++;
      //score
      checkingModal.classList.remove("active");


      // Progress Bar will automatically be updated based on current index
      var progressBar = document.querySelector("#progress-bar");
      var progressValue = document.querySelector("#progress-value");
      const totalQuestions = 5;
      let percentage = (currentIndex / totalQuestions) * 100;
      progressBar.style.width = `${percentage}%`;
      progressValue.textContent = `${Math.round(percentage)}%`;


      // Kulang pa ng logic para patigil if question number 5 na
    });

    /*
      Bali ikaw na bahala dito Irron hahahaha
      Naka if else kung correct answer yung checking Icon
      Then, perquestion may sariling checkingTagline and checkingTrivia, bali connected siya doon sa currentIndex 
      And then maaactivate lang tong layer na to once may naclick na button. Magdadagdag ng class na "active"
      And then pagclick ng nextButton, tatanggalin yung class "active", then increment currentIndex, and update ng score value if correct or not
      Bali parang guide lang to para di mo sisimulan from scratch yung code. Goodluckk hahahaha.
      Sa susunod magpupush pa ako ng changes for mobile version and animations. Makipagcoordinate na lang ako sayo sa next days since connected yung animations dito sa JS
      And then ikaw na rin bahala dun sa ipaplay na Voice Over, iloloop na lang yun then naka hide yung player
      */ 





    optAButton.classList.add("slideRightA");
    optBButton.classList.add("slideRightB");
    optCButton.classList.add("slideRightC");
    optDButton.classList.add("slideRightD");

    



    var memeImageContainer = document.querySelector(".meme-image-section");
    memeImageContainer.classList.add("slidetopMemeImageContainer")

    var questionIcon = document.querySelector(".question-img");
    var questionText = document.querySelector(".question-text");

    questionIcon.classList.add('iconPopup');
    questionText.classList.add('questionFadeIn');


    var timerBar = document.querySelector('#timer-bar');
    timerBar.classList.add('shrinkTimer');


    /*

      INITIALIZATION OF ELEMENTS

      ALl opacity to 0
      Change content to Index
        - Question Text
        - Options
        - Image
      Add Animations
        - Question Icon
        - Question Text
        - Image
        - Options
        - Timer


      Click
        - Save Answer (Option Text Content to an Array)
        - Save Answer Status (Correct or Wrong)
        - Update Score (Add 100 if Correct)
        - Display the Modal

      Timer Runs Out
        - Save Answer (None or Timer Ran Out text)
        - Save Answer Status (Automatically Wrong)
        - No Update Score
        - Display the Modal


      Displaying the Modal
        - Change content according to index
          - Tagline
          - Description

        - Change Icon according to status
          - Correct
          - Wrong

        - Apply Animations
          - Icon
          - Tagline
          - Text

      Click Next Button
        - Change content to Index

    */



});
