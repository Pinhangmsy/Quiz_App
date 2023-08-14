const questions = [
    {
        question: "Hangisi dünyanin en büyük hayvanidir ?",
        answers: [
            {text: "Köpek Baliği",correct:false},
            {text: "Mavi Balina",correct:true},
            {text: "Fil",correct:false},
            {text: "Zürafa",correct:false},
        ]
    },
    {
        question: "Dünyann en küçük kitasi hangisidir ?",
        answers: [
            {text: "Asya",correct:false},
            {text: "Avusturalya",correct:true},
            {text: "Afrika",correct:false},
            {text: "Amerika",correct:false},
        ]
    },
    {
        question: "Dünyanin en büyük çölü hangisidir ?",
        answers: [
            {text: "Kalahari", correct:false},
            {text: "Antartika", correct:true},
            {text: "Gobi", correct:false},
            {text: "Sahra", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const asnwerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Devam";
    showQuestion();
}

function showQuestion(){
    resetStatae();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML=questionNo + ". " + currentQuestion.
    question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        asnwerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}






function resetStatae(){
    nextButton.style.display = "none";
    while(asnwerButtons.firstChild){
        asnwerButtons.removeChild(asnwerButtons.firstChild);
    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(asnwerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true ;
    });
    nextButton.style.display = "block"; 

}


function showScore(){
    resetStatae();
    questionElement.innerHTML = `  ${questions.length} de ${score} yaptin !`;
    nextButton.innerHTML = "Tekrar Basla";
    nextButton.style.display = "block";
}




function handleNextButtton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButtton();
    }else{
        startQuiz();
    }
});


startQuiz();