function gameRoutes(app) {
    let goodAnswers = 0;
    let isGameOver = false;
    let callToFriendUsed = false;
    let halfOnHalfUsed = false;
    let questionToTheCrowdUsed = false;

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

    app.get ('/help/friend', (req, res) => {
        if (callToFriendUsed) {
            return res.json({
                text: 'To koło ratunkowe zostało juz wykorzystane',
            })
        }

        callToFriendUsed = true;

        const doesFriendKwonAnswer = Math.random() < 0.5;
        const question = questions[goodAnswers];

        res.json({
            text: doesFriendKwonAnswer ? `Hmm, wydaje mi się, że odpowiedz to ${questions.answers[question.correctAnswer]}` : 'Hmm, no nie wiem'
        })
    })

    app.get ('/help/half', (req, res) => {
        if (halfOnHalfUsed) {
            return res.json({
                text: 'To koło ratunkowe zostało juz wykorzystane',
            })
        }

        halfOnHalfUsed = true;

        const doesFriendKwonAnswer = Math.random() < 0.5;
        const question = questions[goodAnswers];

        const answersCopy = question.answers.filter((s, index) => (
            index !== question.correctAnswer
        ))

        console.log(answersCopy)

        answersCopy.splice(~~(Math.random() * answersCopy.length), 1)

        res.json({
            answersToRemove: answersCopy,
        })
    })

    app.get('/help/crowd', (req, res) => {
        if (questionToTheCrowdUsed) {
            return res.json({
                text: 'To koło ratunkowe zostało juz wykorzystane',
            })
        }

        questionToTheCrowdUsed = true;

        const chart = [10, 20, 30, 40];

        for (let i = chart.length - 1; i > 0; i--) {
            const change = Math.floor(Math.random() * 20 - 10);
            chart[i] += change;
            chart[i - 1] -= change;
        }

        const question = questions[goodAnswers];
        const { correctAnswer } = question;

        [chart[3], chart[correctAnswer]] = [chart[correctAnswer], chart[3]];

        res.json({
            chart,
        })
    })
}

module.exports = gameRoutes;