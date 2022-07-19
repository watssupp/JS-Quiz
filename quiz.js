//creating our variables
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
const timeText = document.querySelector('#timer');
//timer function
let timeSecond = 60
timeText.innerHTML= `00:${timeSecond}`
const countDown = setInterval (() => {
    timeSecond--

    timeText.innerHTML = `00:${timeSecond}`
    if(timeSecond===0){
   
    return window.location.assign('./end.html')
    }
},1000)


//question variable
let currentQuestion ={}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions  =[]

let questions =[
    {
        question: 'Commonly used data types DO NOT Include:',
        choice1: 'Strings' ,
        choice2: 'Booleans',
        choice3: 'Alerts',
        choice4: 'Numbers',
        answer: 3,
    },
    {
        question: 'What is if/else statment is enclosed with?',
        choice1: 'Quotes' ,
        choice2: 'Curly Brackets',
        choice3: 'Parenthesis',
        choice4: 'Squar Brackets',
        answer: 3,
    },
    {
        question: 'What can be stored with arrays using JavaScript?',
        choice1: 'Numbers and Strings' ,
        choice2: 'Other Arrays',
        choice3: 'Booleans',
        choice4: 'All of The Above',
        answer: 4,
    },
    {
        question: 'How do you close variables?',
        choice1: 'Commas' ,
        choice2: 'Curly Bracket',
        choice3: 'Quotes',
        choice4: 'Parenthesie',
        answer: 3,
    },
    {
        question: 'What debugging tool is used during development ?',
        choice1: 'JavaScript' ,
        choice2: 'Terminal/Bash',
        choice3: 'For loops',
        choice4: 'Console.log',
        answer: 4,
    }

]
const SCORE_POINTS = 100
const MAX_QUESTIONS =5


startGame = () => {
    questionCounter = 0
    score= 0
    availableQuestions =[...questions]
    getNewQuestion()
    
}

//gets you next question

getNewQuestion = () => {
    if(availableQuestions.length ===0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore' , score)
        return window.location.assign('./end.html')
    }
    //keeps track of what question its on
    questionCounter++
    progressText.innerText =`Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex,1)

    acceptingAnswers = true
}
//when you click on an answer, keeps track if its right or wrong 
choices.forEach(choice => {
    choice.addEventListener('click' ,e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        console.log(selectedChoice.parentElement.classList)

        let classToApply = selectedAnswer === currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incermentScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()

        }, 1000)
    })
}
)
//moves you to the next question
incermentScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame ()