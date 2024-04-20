const questions = [
    {
        question: "What is the capital of France?",
        answer: [
            {text:"Paris", correct: true}, 
            {text:"London", correct: false},
            {text:"Berlin", correct: false},
            {text:"italy", correct: false},
        ]
    },

    {
        question: "What is the National Animal of India?",
        answer: [
            {text:"Lion", correct: false}, 
            {text:"Cheetah", correct: false},
            {text:"Tiger", correct: true},
            {text:"Cow", correct: false},
        ]
    },

    {
        question: "What programming language is named after a type of Indonesian coffee?",
        answer: [
            {text:"C", correct: false}, 
            {text:"Java", correct: true},
            {text:"C++", correct: false},
            {text:"Python", correct: false},
        ]
    },

    {
        question: "What software development hosting company has an Octocat for the logo?",
        answer: [
            {text:"VsCode", correct: false}, 
            {text:"Edge", correct: false},
            {text:"Linkedin", correct: false},
            {text:"Github", correct: true},
        ]
    }
];

const questionElement = document.getElementById( "question" );
const answerButton = document.getElementById( "answer-buttons" );
const nextButton = document.getElementById( "next-btn" );

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add( "btn");
        answerButton.appendChild( button );
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct === "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
        }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = " Go Play again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
     if(currentQuestionIndex < questions.length){
        handleNextButton();
     }
     else{
        startQuiz();
     }
})
startQuiz();