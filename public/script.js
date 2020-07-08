const question = document.querySelector('#question')
const answerButtons = document.querySelectorAll('.answer');

function fillQuestionElements(data) {
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
        })
}

showNextQuestion();

function sendAnswer(answerIndex) {
    fetch(`/answer/${answerIndex}`, {
        method: 'POST',
    })
        .then(res => res.json())
        .then(data => {
            // fillQuestionElements(data);
            console.log("data", data)
        })
}

for (const button of answerButtons) {
    button.addEventListener('click', (e) => {
        const answerIndex = e.target.dataset.answer;
        sendAnswer(answerIndex);
    })
}