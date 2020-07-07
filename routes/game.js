function gameRoutes(app) {
    let goodAnswers = 0;
    let callToFriendUsed = false;
    let questionToTheCrowdUsed = false;
    let halfOnHalfUsed = false;

    const questions = [
        {
            question: 'Jaki jest najlepszy język programowania?',
            answers: ['C++', 'Fortran', 'JavaScript', 'Java'],
            correctAnswer: 2,
        },
        {
            question: 'Czy ten kurs jest fajny?',
            answers: ['Nie', 'Nie wiem', 'Oczywiście, że tak', 'Jest najlepszy'],
            correctAnswer: 3,
        },
        {
            question: 'Czy chcesz zjeść pizze?',
            answers: ['Nawet dwie', 'Jestem na diecie', 'Nie dziekuje', 'Wolę brokuły'],
            correctAnswer: 0,
        },
    ];

    app.get('/question', (req, res) => {
        if (goodAnswers === questions.length) {
            res.json({
                winner: true,
            })
        } else {
            const nextQuestion = questions[goodAnswers];

            const {question, answers} = nextQuestion;

            res.json({
                question, answers,
            })
        }
    });
}

module.exports = gameRoutes;