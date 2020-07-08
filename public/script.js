const question = document.querySelector('#question')
const answerButtons = document.querySelectorAll('.answer');
const goodAnswerSpan = document.querySelector('#good-answers');
const gameBoard = document.querySelector('#game-board');
const h2 = document.querySelector('h2');

function fillQuestionElements(data) {
    console.log("data w fillQuestionElements", data)
    if (data.winner === true) {
        gameBoard.style.display = 'none';
        h2.textContent = 'Wygrałeś/aś';
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