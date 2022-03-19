var timeEl = document.querySelector(".timer");

var currentTimeEl = document.querySelector("currentTime");

var secondsLeft = 5;

// timer.addEventListener("click", function() {
//     if (holdInterval === 0) {
//         holdInterval = setInterval
//     }
// }

const questions = [
    {
        question: 'Commonly used data types DO NOT include:',
        answers: [
            'Answer',
            'Answer',
            'Answer',
            'Answer',
        ],
    },
    {
        question: 'The condition in an if / else statement is enclosed within ____.',
        answers: [
            'Answer',
        ]
    },
    {
        question: 'Arrays in JavaScript can be used to store ____.',
        answers: [
            'Answer',
        ]
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            'Answer',
        ]
    }
]

const pages = [
    document.querySelector('#finished-prompt'),
    document.querySelector('#start-prompt'),
    document.querySelector('#question'),
    document.querySelector('#highscores')
]

function changePage(activePage) {
    pages.forEach(function(page) {
        page.style.display = 'none'
    })
    document.querySelector(activePage).style.display = 'unset'
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
            return `<button class="btn">${i + 1}. ${answer}</button>`
        })
        .join('')
    document
        .querySelectorAll('#answers button')
        .forEach(function(answerButton) {
            answerButton.addEventListener('click', function(e) {
                if (idx < questions.length - 1) {
                    createQuestion(idx + 1)
                } else {
                    changePage('#finished-prompt')
                }
            })
        })
}

document
    .querySelector('#startTimer')
    .addEventListener('click', function() {
        changePage('#question')
        createQuestion(0)
    })

document
    .querySelector('#submit-score')
    .addEventListener('click', function() {
        changePage('#highscores')
    })

document
    .querySelector('#view-highscores')
    .addEventListener('click', function() {
        changePage('#highscores')
    })

document
    .querySelector('#highscores-go-home')
    .addEventListener('click', function() {
        changePage('#start-prompt')
    })

function startTime() {
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

            if(secondsLeft === 0) {
                clearInterval(timerInterval);
                timesUp();
            }
    }, 1000);
}

function timesUp() {
    timeEl.textContent = "Time's up! Quiz has ended. Review scores or start again!";
}
//startTime();
