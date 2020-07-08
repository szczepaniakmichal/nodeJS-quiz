function gameRoutes(app) {
    let goodAnswers = 0;
    let isGameOver = false;
    let callToFriendUsed = false;
    let questionToTheCrowdUsed = false;
    let halfOnHalfUsed = false;

    const questions = [
        {
            question: 'Jaki jest najlepszy język programowania?',
            answers: ['C++', 'Fortran', 'JavaScript', 'Java'],
            correctAnswer: 0,
        },
        {
            question: 'Czy ten kurs jest fajny?',
            answers: ['Nie', 'Nie wiem', 'Oczywiście, że tak', 'Jest najlepszy'],
            correctAnswer: 0,
        },
        {
            question: 'Czy chcesz zjeść pizze?',
            answers: ['Nawet dwie', 'Jestem na diecie', 'Nie dziekuje', 'Wolę brokuły'],
            correctAnswer: 0,
        },
    ];

    app.get('/question', (req, res) => {
        console.log("goodAnswers === questions.length", goodAnswers)
        console.log("goodAnswers === questions.length", questions.length)
        if (goodAnswers === questions.length) {
            res.json({
                winner: true,
            })
        } else if (isGameOver) {
            res.json({
                loser: true,
            })
        } else {
            const nextQuestion = questions[goodAnswers];

            const {question, answers} = nextQuestion;

            res.json({
                question, answers,
            })
        }
    });

    app.post('/answer/:index', (req, res) => {
        if (isGameOver) {
            res.json({
                loser: true,
            })
        }

        const {index} = req.params;
        const question = questions[goodAnswers];

        const isGoodAnswer = question.correctAnswer === Number(index);


        if (isGoodAnswer) {
            goodAnswers++;
        } else {
            isGameOver = true;
        }

        res.json({
            correct: isGoodAnswer,
            goodAnswers,
        });
    })
}

module.exports = gameRoutes;