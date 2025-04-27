const MAX_ROUNDS = 5;
const SCORE_PER_CORRECT = 100;

let currentIndex = 0;
let finalScore = 0;
let selectedAnswers = [];
let answerState = [];
let isPaused = false;
let timerInterval = null;
let remainingTime = 100;

const questionSet = [
    "Sample Question 1?",
    "Sample Question 2?",
    "Sample Question 3?",
    "Sample Question 4?",
    "Sample Question 5?"
];

const elements = {
    quiz: {
        score: document.querySelector("#score"),
        questionText: document.querySelector("#question-text"),
        questionIcon: document.querySelector(".question-img"),
        memeImage: document.querySelector("#meme-image"),
        memeImageContainer: document.querySelector(".meme-image-section"),
        timerBar: document.querySelector('#timer-bar'),
        resetButton: document.querySelector('.reset-img'),
        resetSection: document.querySelector('.reset-section'),
        pauseButton: document.querySelector('.pause-img'),
        pauseSection: document.querySelector('.pause-section')
    },
    options: {
        textA: document.querySelector("#opt-a-value"),
        textB: document.querySelector("#opt-b-value"),
        textC: document.querySelector("#opt-c-value"),
        textD: document.querySelector("#opt-d-value"),
        buttonA: document.querySelector("#opt-a"),
        buttonB: document.querySelector("#opt-b"),
        buttonC: document.querySelector("#opt-c"),
        buttonD: document.querySelector("#opt-d")
    },
    progress: {
        bar: document.querySelector("#progress-bar"),
        value: document.querySelector("#progress-value")
    },
    pauseModal: {
        container: document.createElement("div"),
        resumeButton: document.createElement("div")
    },
    checkingModal: {
        container: document.querySelector("#checking-modal"),
        icon: document.querySelector("#checking-icon"),
        tagline: document.querySelector("#checking-tagline"),
        trivia: document.querySelector("#checking-trivia"),
        nextButton: document.querySelector("#next-button")
    },
    evaluation: {
        container: document.querySelector('#evaluation-container'),
        resetButton: document.querySelector('#evaluation-container .reset-img'),
        resetSection: document.querySelector('#evaluation-container .reset-section'),
        quitButton: document.querySelector('.quit-section'),
        finalScore: document.querySelector('#final-score'),
        ratingText: document.querySelector('#rating-text'),
        ratingBar: document.querySelector('#rating-bar-img'),
        ratingImg: document.querySelector("#meme-image-eval"),
        ratingImgContainer: document.querySelector(".meme-image-section-eval"),
        answers: [
            document.querySelector("#item1-ans"),
            document.querySelector("#item2-ans"),
            document.querySelector("#item3-ans"),
            document.querySelector("#item4-ans"),
            document.querySelector("#item5-ans")
        ],
        answerIcons: [
            document.querySelector("#item1-img"),
            document.querySelector("#item2-img"),
            document.querySelector("#item3-img"),
            document.querySelector("#item4-img"),
            document.querySelector("#item5-img")
        ]
    }
};

initializeGame();

function initializeGame() {
    createPauseModal();
    updateContent(currentIndex);
    animateElements();
    setupEventListeners();
    startTimer();
}

function setupEventListeners() {
    elements.options.buttonA.addEventListener("click", () => handleOptionClick(elements.options.textA.textContent, true));
    elements.options.buttonB.addEventListener("click", () => handleOptionClick(elements.options.textB.textContent, false));
    elements.options.buttonC.addEventListener("click", () => handleOptionClick(elements.options.textC.textContent, false));
    elements.options.buttonD.addEventListener("click", () => handleOptionClick(elements.options.textD.textContent, false));
    
    elements.checkingModal.nextButton.addEventListener('click', handleNextButtonClick);
    
    elements.quiz.resetButton.addEventListener('click', resetQuiz);
    elements.quiz.resetSection.addEventListener('click', resetQuiz);
    
    elements.evaluation.resetButton.addEventListener('click', resetQuiz);
    elements.evaluation.resetSection.addEventListener('click', resetQuiz);
    
    if (elements.quiz.pauseButton) {
        elements.quiz.pauseButton.addEventListener('click', pauseGame);
    }
    if (elements.quiz.pauseSection) {
        elements.quiz.pauseSection.addEventListener('click', pauseGame);
    }

    elements.evaluation.quitButton.addEventListener('click', () => {
    });
}

function handleOptionClick(answer, isCorrect) {
    selectedAnswers[currentIndex] = answer;
    answerState[currentIndex] = isCorrect;
    
    if (isCorrect) {
        finalScore += SCORE_PER_CORRECT;
    }
    
    showCheckingModal(currentIndex, isCorrect);
}

function pauseGame() {
    if (!isPaused) {
        isPaused = true;
        
        if (timerInterval) {
            clearInterval(timerInterval);
            remainingTime = parseFloat(elements.quiz.timerBar.style.width) || 
                            (elements.quiz.timerBar.offsetWidth / elements.quiz.timerBar.parentElement.offsetWidth * 100);
        }
        
        elements.quiz.timerBar.style.animationPlayState = "paused";
        elements.quiz.timerBar.classList.remove('shrinkTimer');
        
        elements.pauseModal.container.style.display = "flex";
    }
}

function resumeGame() {
    if (isPaused) {
        isPaused = false;
        
        elements.pauseModal.container.style.display = "none";
        
        elements.quiz.timerBar.style.animationPlayState = "running";
        
        startTimer(remainingTime);
    }
}

function startTimer(startFrom = 100) {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    elements.quiz.timerBar.style.width = `${startFrom}%`;
    
    const decrementAmount = 0.1; 
    timerInterval = setInterval(() => {
        if (!isPaused) {
            let currentWidth = parseFloat(elements.quiz.timerBar.style.width);
            
            if (currentWidth <= 0) {
                clearInterval(timerInterval);
                handleTimeout();
            } else {
                currentWidth -= decrementAmount;
                elements.quiz.timerBar.style.width = `${currentWidth}%`;
            }
        }
    }, 10); 
}

function handleTimeout() {
    selectedAnswers[currentIndex] = "Time's up";
    answerState[currentIndex] = false;
    
    showCheckingModal(currentIndex, false);
    
    elements.checkingModal.tagline.textContent = "Oops! Time's up!";
    elements.checkingModal.trivia.textContent = "Remember to answer more quickly next time!";
    
    console.log(`Question ${currentIndex + 1} timed out and marked as incorrect`);
}

function handleNextButtonClick() {
    currentIndex++;
    resetCheckingModal();
    elements.checkingModal.container.classList.remove('active');
    
    if (currentIndex < MAX_ROUNDS) {
        updateContent(currentIndex);
        resetAnimate();
        animateElements();
        updateProgressBar(currentIndex);
        
        startTimer();
    } else {
        updateProgressBar(MAX_ROUNDS);
        
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        
        showEvaluationScreen();
    }
}

function handleOptionClick(answer, isCorrect) {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    selectedAnswers[currentIndex] = answer;
    answerState[currentIndex] = isCorrect;
    
    if (isCorrect) {
        finalScore += SCORE_PER_CORRECT;
    }
    
    showCheckingModal(currentIndex, isCorrect);
}

function updateContent(index) {
    elements.quiz.score.textContent = finalScore.toString();
    elements.quiz.questionText.textContent = questionSet[index];
    elements.options.textA.textContent = "Option A";
    elements.options.textB.textContent = "Option B";
    elements.options.textC.textContent = "Option C";
    elements.options.textD.textContent = "Option D";
    elements.quiz.memeImage.src = `../../images/quiz-assets/meme-img-easy/${(index+1).toString()}.jpg`;
}

function updateProgressBar(index) {
    const percentage = (index / MAX_ROUNDS) * 100;
    elements.progress.bar.style.width = `${percentage}%`;
    elements.progress.value.textContent = `${Math.round(percentage)}%`;
}

function showCheckingModal(index, isCorrect) {
    elements.checkingModal.container.classList.add("active");
    
    elements.checkingModal.icon.src = isCorrect 
        ? "../../images/icons/check.png" 
        : "../../images/icons/cross.png";
        
    elements.checkingModal.tagline.textContent = "Galing naman ni Idol"; 
    elements.checkingModal.trivia.textContent = "Alam mo ba na ganito ganyan. Hatdog"; 
    
    elements.checkingModal.icon.classList.add('iconPopup3');
    elements.checkingModal.tagline.classList.add('taglineFadeIn');
    elements.checkingModal.trivia.classList.add('triviaFadeIn');
    elements.checkingModal.nextButton.classList.add('iconPopup4');
}

function resetCheckingModal() {
    elements.checkingModal.icon.classList.remove('iconPopup3');
    elements.checkingModal.tagline.classList.remove('taglineFadeIn');
    elements.checkingModal.trivia.classList.remove('triviaFadeIn');
    elements.checkingModal.nextButton.classList.remove('iconPopup4');
    
    void elements.checkingModal.icon.offsetWidth;
}

function createPauseModal() {
    elements.pauseModal.container.className = "pause-modal";
    elements.pauseModal.container.style.position = "fixed";
    elements.pauseModal.container.style.top = "0";
    elements.pauseModal.container.style.left = "0";
    elements.pauseModal.container.style.width = "100%";
    elements.pauseModal.container.style.height = "100%";
    elements.pauseModal.container.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    elements.pauseModal.container.style.display = "none";
    elements.pauseModal.container.style.justifyContent = "center";
    elements.pauseModal.container.style.alignItems = "center";
    elements.pauseModal.container.style.zIndex = "1000";
    
    elements.pauseModal.resumeButton.className = "resume-button blue-gradient";
    elements.pauseModal.resumeButton.textContent = "RESUME GAME";
    elements.pauseModal.resumeButton.style.padding = "15px 30px";
    elements.pauseModal.resumeButton.style.borderRadius = "8px";
    elements.pauseModal.resumeButton.style.fontSize = "18px";
    elements.pauseModal.resumeButton.style.fontWeight = "bold";
    elements.pauseModal.resumeButton.style.cursor = "pointer";

    elements.pauseModal.container.appendChild(elements.pauseModal.resumeButton);

    document.body.appendChild(elements.pauseModal.container);

    elements.pauseModal.resumeButton.addEventListener('click', resumeGame);
}

function showEvaluationScreen() {
    elements.evaluation.container.classList.add('active');
    elements.evaluation.finalScore.textContent = finalScore.toString();

    const ratingConfig = getRatingConfig(finalScore);
    elements.evaluation.ratingText.textContent = ratingConfig.text;
    elements.evaluation.ratingText.className = ''; 
    elements.evaluation.ratingText.classList.add(ratingConfig.class);
    elements.evaluation.ratingBar.src = ratingConfig.barImage;
    elements.evaluation.ratingImg.src = ratingConfig.characterImage;
    
    elements.evaluation.ratingImgContainer.classList.add("slidetopMemeImageContainer");
    
    for (let i = 0; i < MAX_ROUNDS; i++) {
        elements.evaluation.answerIcons[i].src = answerState[i] 
            ? "../../images/icons/check.png" 
            : "../../images/icons/cross.png";
            
        elements.evaluation.answers[i].textContent = selectedAnswers[i] || "No answer";
    }
}

function getRatingConfig(score) {
    const configs = {
        0: {
            text: "SANA SINAKTAN MO NA LANG AKO",
            class: "text-red-gradient",
            barImage: "../../images/quiz-assets/rating-bar/rating-bar0.png",
            characterImage: "../../images/quiz-assets/rating-img/0.png"
        },
        100: {
            text: "SUSMARYOSEP, KAYA PA BA TEH",
            class: "text-red-gradient",
            barImage: "../../images/quiz-assets/rating-bar/rating-bar1.png",
            characterImage: "../../images/quiz-assets/rating-img/1.png"
        },
        200: {
            text: "JUZKODAI, ANYARE SA'YO?",
            class: "text-red-gradient",
            barImage: "../../images/quiz-assets/rating-bar/rating-bar2.png",
            characterImage: "../../images/quiz-assets/rating-img/2.png"
        },
        300: {
            text: "SIGE NA NGA, OKAY NA 'TO",
            class: "text-orange-gradient",
            barImage: "../../images/quiz-assets/rating-bar/rating-bar3.png",
            characterImage: "../../images/quiz-assets/rating-img/3.png"
        },
        400: {
            text: "TAAS NAMAN, KAKA-FB MO YAN",
            class: "text-green-gradient",
            barImage: "../../images/quiz-assets/rating-bar/rating-bar4.png",
            characterImage: "../../images/quiz-assets/rating-img/4.png"
        },
        500: {
            text: "GRABE, MEMER GODZ SI IDOLORDZ",
            class: "text-blue-gradient",
            barImage: "../../images/quiz-assets/rating-bar/rating-bar5.png",
            characterImage: "../../images/quiz-assets/rating-img/5.png"
        }
    };
    
    return configs[score] || configs[0];
}

function resetQuiz() {
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    
    isPaused = false;
    remainingTime = 100;
    
    elements.pauseModal.container.style.display = "none";
    
    currentIndex = 0;
    finalScore = 0;
    selectedAnswers = [];
    answerState = [];
    
    updateContent(currentIndex);
    updateProgressBar(0);
    
    elements.checkingModal.container.classList.remove('active');
    elements.evaluation.container.classList.remove('active');
    
    resetAnimate();
    animateElements();

    startTimer();
    
    console.log("Quiz has been reset!");
}


function animateElements() {
    elements.options.buttonA.classList.add("slideRightA");
    elements.options.buttonB.classList.add("slideRightB");
    elements.options.buttonC.classList.add("slideRightC");
    elements.options.buttonD.classList.add("slideRightD");
    
    elements.quiz.memeImageContainer.classList.add("slidetopMemeImageContainer");
    elements.quiz.questionIcon.classList.add('iconPopup');
    elements.quiz.questionText.classList.add('questionFadeIn');
    elements.quiz.timerBar.classList.add('shrinkTimer');
}

function resetAnimate() {
    elements.options.buttonA.classList.remove("slideRightA");
    elements.options.buttonB.classList.remove("slideRightB");
    elements.options.buttonC.classList.remove("slideRightC");
    elements.options.buttonD.classList.remove("slideRightD");
    
    elements.quiz.memeImageContainer.classList.remove("slidetopMemeImageContainer");
    elements.quiz.questionIcon.classList.remove('iconPopup');
    elements.quiz.questionText.classList.remove('questionFadeIn');
    elements.quiz.timerBar.classList.remove('shrinkTimer');
    
    void elements.options.buttonA.offsetWidth;
    void elements.options.buttonB.offsetWidth;
    void elements.options.buttonC.offsetWidth;
    void elements.options.buttonD.offsetWidth;
    void elements.quiz.memeImageContainer.offsetWidth;
    void elements.quiz.questionIcon.offsetWidth;
    void elements.quiz.questionText.offsetWidth;
}