

let questionElement = document.getElementById('question');
let answerButtons = document.getElementById('answer-buttons');
let nextButton = document.getElementById('Next-btn');


let currentQuestionIndex = 0;
let score = 0;


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}


function showQuestion() {
    
    let currentQuestion = quizQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    reset();
    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.Correct){
            button.dataset.Correct = answer.Correct;
        }
        button.addEventListener("click" , selectAnswer);
    });
    
    
}

function reset() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}



function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.Correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("Correct");
        score++;
    }
    else{
        selectedBtn.classList.add("inCorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.Correct === "true"){
            button.classList.add("Correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < quizQuestions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

function showScore() {
    reset();
    questionElement.innerHTML = `Your Score Is ${score} out of ${quizQuestions.length}!`;
    nextButton.innerHTML = "Start again";
    nextButton.style.display = 'block';
}

nextButton.addEventListener('click' , ()=>{
    if(currentQuestionIndex < quizQuestions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})


startQuiz();