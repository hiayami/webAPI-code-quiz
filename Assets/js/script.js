const questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: [
            'strings', //strings
            'booleans',//booleans
            'alerts',//alerts <--correct answer
            'numbers',//numbers
            //correct: alerts
        ],
        correct: 2,
    },
    {
        question: 'The condition in an if / else statement is enclosed within ____.',
        answers: [
            'curly', //curly brackets
            'parentheses',//parentheses <--correct answer
            'square brackets',//square brackets
            'quotes',//quotes
        ],
        correct: 1,
    },
    {
        question: 'Arrays in JavaScript can be used to store ____.',
        answers: [
            'Answer',//numbers and strings
            'other arrays',//other arrays
            'booleans',//booleans
            'All of the above',//All of the above  <<--correct answer
        ],
        correct: 3,
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            'console log',//console log <--correct answer
            'Javascript',//Javascript
            'terminal/bash',//terminal/bash
            'for loops',//for loops
        ],
        correct: 0,
    }
]

const questionPage = document.querySelector('#question')
const currentTimeEl = document.querySelector("#currentTime")
const finalScoreEl = document.querySelector("#finished-prompt-score")
let secondsLeft = 75
function updateSecondsLeft() {
    secondsLeft = Math.max(0, secondsLeft - 1)
    currentTimeEl.textContent = secondsLeft
    finalScoreEl.textContent = secondsLeft
}
setInterval(function() {
    if (questionPage.style.display === 'block') {
        updateSecondsLeft()
    }
}, 1000);

const pages = [
    document.querySelector('#finished-prompt'),
    document.querySelector('#start-prompt'),
    questionPage,
    document.querySelector('#highscores')
]

function changePage(activePage) {
    pages.forEach(function(page) {
        page.style.display = 'none'
    })
    document.querySelector(activePage).style.display = 'block'
}

function createQuestion(idx) {
    document
        .querySelector('#question-text')
        .innerText = questions[idx].question
    const answers = document
        .querySelector('#answers')
    answers.innerHTML = questions[idx]
        .answers
        .map(function(answer, i) {
            const value = questions[idx].correct === i
            return '<button class="btn" value="' + value + '">'
                + (i + 1) + '. ' + answer
                + '</button>'
        })
        .join('')
    document
        .querySelectorAll('#answers button')
        .forEach(function(answerButton) {
            answerButton.addEventListener('click', function(e) {
                const resultEl = document.querySelector('#answer-result')
                resultEl.style.display = 'block'
                setTimeout(function() {
                    resultEl.style.display = 'none'
                }, 750)
                if (e.target.value === 'true') {
                    resultEl.innerText = 'Correct!'
                } else {
                    resultEl.innerText = 'Wrong!'
                    secondsLeft -= 10
                    updateSecondsLeft()
                }
                if (idx < questions.length - 1) {
                    createQuestion(idx + 1)
                } else {
                    changePage('#finished-prompt')
                }
            })
        })
}

function showHighscoresPage() {
    localStorage.getItem('highscores') || ''
    const highscoresListEl = document.querySelector('#highscores-list')
    const highscores = (localStorage.getItem('highscores') || '').split(',')
    let elList = ''
    for (let i = 1; i < highscores.length; i++) {
        elList += '<div>' + i + '. ' + highscores[i] + '</div>'
    }
    changePage('#highscores')
    highscoresListEl.innerHTML = elList
}

document
    .querySelector('#startTimer')
    .addEventListener('click', function() {
        changePage('#question')
        createQuestion(0)
        secondsLeft = 75
        currentTimeEl.innerText = '75'
    })

document
    .querySelector('#view-highscores')
    .addEventListener('click', function() {
        //changePage('#highscores')
        showHighscoresPage()
    })

document
    .querySelector('#highscores-go-home')
    .addEventListener('click', function() {
        changePage('#start-prompt')
    })

document
    .querySelector('#highscores-clear')
    .addEventListener('click', function() {
        localStorage.removeItem('highscores')
        showHighscoresPage()
    })

document
    .querySelector('#submit-score')
    .addEventListener('click', function() {
        const highscoresString = localStorage.getItem('highscores') || ''
        const highscores = highscoresString.split(',')
        highscores.push(
            document.querySelector('#initials-input').value
            + ' - '
            + secondsLeft
        )
        localStorage.setItem('highscores', highscores.join(','))
        showHighscoresPage()
    })
