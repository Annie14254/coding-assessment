
// creating variables for quesiton titles and answers
var questionFull = document.querySelector("#questionFull")
var answerCard = document.querySelector("#answerCard")
var startPage = document.querySelector("#startPage")
var answerButton = document.querySelector(".answerButton")
var questionName = document.querySelector("#questionName")
var startButton = document.querySelector("#startButton");
var timer = document.querySelector("#timer")
var endScreen = document.querySelector("#endscreenContainer")
var submitScoreForm = document.querySelector("#submitscore")
var pastHighScores = document.querySelector("#pasthighscores")
var showUserScore = document.querySelector("#score")
var countdown
var quizInProgress
var currentQuestion
var questionCount = 0
var arrayAnswers
var userScore = 0

//creating button to start, add event listener
startButton.textContent = "Start"
startButton.setAttribute("style", "margin-left:10px; margin-top:10px; font-size: 25px; padding: 2px;")

startButton.addEventListener("click", function(){
    clearStartPage();
    quizInProgress = true;
    startTimer();
    displayQuestion();

})

// clears start page and loads first question
function clearStartPage(){
    questionFull.setAttribute("style", "visibility: visible");
    startPage.setAttribute("style", "display:none");
    startButton.setAttribute("style", "display:none")
}

// framework for questions
// have each answer be a button, with an if else statement to determine if it is correct or not

questionsArray = [ 
    {
        name: "Which of these is NOT a primitive data type?",
        answers: [
        "Number", "String", "Boolean", "Object"
        ],
        correctanswer: "Object"
    }
    ,
    {
        name: "The acronym DOM in programming stands for:",
        answers: [
        "Document Opening Method", "Day of Month", "Document Object Model", "Data Obsolescence Model"
        ],
        correctanswer: "Document Object Model"
    }
    ,
    {
        name: "Class tags in CSS are considered more specific than ID tags. True or False?",
        answers: [
        "True", "False"
        ],
        correctanswer: "False"
    }
]


// answer buttons

function displayQuestion(){
    answerButton.innerHTML = '';
    /*for (i = 0; i < questionsArray.length; i++){*/
        currentQuestion = questionsArray[questionCount]
        questionName.textContent = currentQuestion.name
        questionName.setAttribute("style", "margin-left: 10px; padding: 5px")

        for(i = 0; i < currentQuestion.answers.length; i++){

            arrayAnswers = document.createElement("button");
            arrayAnswers.textContent = currentQuestion.answers[i];
            arrayAnswers.value = currentQuestion.answers[i]

            arrayAnswers.addEventListener("click", function(e){
                console.log(e.target.value);
                
                    correctAnswerCheck(e.target.value);
                
        })
            answerButton.appendChild(arrayAnswers)
        }
}

function correctAnswerCheck(answer) {
    if(answer === questionsArray[questionCount].correctanswer) {
        console.log("correct")
        userScore += 1
        // add print for correct/incorrect
        // add ++ for correct or incorrect score
    } else {
        console.log("incorrect")
        userScore -= 1
        timer.textContent = timer.textContent - 10
        if (timer.textContent <= 0) {
            clearInterval(countdown);
            endScreenShow();
        }
    }
    questionCount++;
    if (questionCount < questionsArray.length){
        displayQuestion();
    } else {
        endScreenShow();
    }
}


// create timer
// TODO: *add endgame*
function startTimer() {
    countdown = setInterval(function() {
      if (timer.textContent > 0) {
        timer.textContent = timer.textContent - 1
      } else if (timer.textContent <= 0) {
        clearInterval(countdown);
        endScreenShow();
      }
    }
    , 1000)
  }


  // display end screen
  function endScreenShow() {

    // hide questions, show end screen
    questionFull.setAttribute("style", "visibility:hidden")
    endScreen.setAttribute("style", "visibility:visible")

    // print user score
    var userScoreFinal = document.createElement("div")
    userScoreFinal.textContent = "Your score is " + userScore
    showUserScore.appendChild(userScoreFinal)

    // get high scores from local storage
    var highScores = JSON.parse(localStorage.getItem("highscores")) || []

    for(var i  = 0; i < highScores.length; i++){
        var li = document.createElement("li");
        li.textContent = highScores[i].userInitials + " : " + highScores[i].userScore
        pastHighScores.appendChild(li)
    }
  }

  submitScoreForm.addEventListener("submit", function(event){
    event.preventDefault();
    var userInitials = document.getElementById("initials").value
    console.log(userInitials)
    var highScores = JSON.parse(localStorage.getItem("highscores")) || []
    highScores.push({userInitials, userScore})
    localStorage.setItem("highscores",JSON.stringify(highScores))
    var li = document.createElement("li");
    li.textContent = userInitials + " : " + userScore
    pastHighScores.appendChild(li)
  })
  // event listener for button answers
  // clear ul with element.innerHTML = ''
