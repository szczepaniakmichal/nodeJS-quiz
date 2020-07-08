const question = document.querySelector('#question')
const answerButtons = document.querySelectorAll('.answer');
const goodAnswerSpan = document.querySelector('#good-answers');
const gameBoard = document.querySelector('#game-board');
const h2 = document.querySelector('h2');
const btnCallToFriend = document.querySelector('#callToAFriend');
const tip = document.querySelector('#tip');
const halfOnHalf = document.querySelector('#halfOnHalf');

function fillQuestionElements(data) {
    // console.log("data w fillQuestionElements", data)
    if (data.winner === true) {
        gameBoard.style.display = 'none';
        h2.textContent = 'Wygrałeś/aś';
        return;
    }

    if (data.loser === true) {
        gameBoard.style.display = 'none';
        h2.textContent = 'No cóż, dziękuje Ci za gre. Tym razem udzieliłeś błędnej odpowiedzi';
        return;
    }

    question.innerText = data.question;

    // answerButtons.forEach((el, index) => {
    //     el.innerText = data.answers[index];
    // })

    for (const i in data.answers) {
        const answerEl = document.querySelector(`#answer${Number(i) + 1}`);
        answerEl.innerText = data.answers[i];
    }

}

function showNextQuestion() {
    fetch('/question', {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => {
            fillQuestionElements(data);
        });
}

showNextQuestion();

function handleAnswerFeedback(data) {
    goodAnswerSpan.textContent = data.goodAnswers;
    showNextQuestion();
}

function sendAnswer(answerIndex) {
    fetch(`/answer/${answerIndex}`, {
        method: 'POST',
    })
        .then(res => res.json())
        .then(data => {
            handleAnswerFeedback(data);
        })
}

for (const button of answerButtons) {
    button.addEventListener('click', (e) => {
        const answerIndex = e.target.dataset.answer;
        sendAnswer(answerIndex);
    })
}


function handleFriendsAnswer(data) {
    tip.textContent = data.text;
}

function callToFriend() {
    fetch(`/help/friend`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => {
            handleFriendsAnswer(data);
        })
}

btnCallToFriend.addEventListener('click', callToFriend);

function handlehalfOnHalfAnswer(data) {
    if (typeof data.text === 'string') {
        tip.textContent = data.text;
    } else {
        for (const button of answerButtons) {
            if (data.answersToRemove.indexOf(button.textContent) > -1) {
                button.textContent = '';
            }
        }
    }
}

function handlehalfOnHalf() {
    fetch(`/help/half`, {
        method: 'GET',
    })
        .then(res => res.json())
        .then(data => {
            handlehalfOnHalfAnswer(data);
        })
}

halfOnHalf.addEventListener('click', handlehalfOnHalf);

