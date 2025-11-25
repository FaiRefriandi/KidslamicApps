const question = [
    {
        question: "Apa yang dimaksud dengan tajwid dalam membaca Al-Quran?",
        OptionA: "Ilmu menghafal Al-Quran",
        OptionB: "Ilmu yang mempelajari cara membaca Al-Quran dengan baik dan benar",
        OptionC: "Ilmu menghafal hadits",
        OptionD: "Ilmu bahasa Arab klasik",
        correctOption: "optionB"
    },

    {
        question: "Apa bacaan yang mempunyai arti memantul?",
        OptionA: "Ikhfa",
        OptionB: "Iqlab",
        OptionC: "Qalqalah",
        OptionD: "Idzhar",
        correctOption: "optionC"
    },

    {
        question: "Jelaskan pengertian dari ghunnah.",
        OptionA: "Suara gemetar yang dihasilkan oleh lidah",
        OptionB: "Suara hidung yang terdengar saat membaca huruf nun dan mim sukun",
        OptionC: "Suara keras yang dihasilkan saat membaca huruf qalqalah",
        OptionD: "Suara lembut yang dihasilkan saat membaca huruf tajwid",
        correctOption: "optionB"
    },

    {
        question: "Apa perbedaan antara huruf tanwin dengan huruf mad?",
        OptionA: "Huruf tanwin menunjukkan panjangnya bacaan, sedangkan huruf mad menunjukkan bentuk akhiran kata",
        OptionB: "Huruf tanwin menunjukkan bentuk akhiran kata, sedangkan huruf mad menunjukkan panjangnya bacaan",
        OptionC: "Keduanya menunjukkan panjangnya bacaan",
        OptionD: "Keduanya menunjukkan bentuk akhiran kata",
        correctOption: "optionA"
    },

    {
        question: "Apa yang dimaksud dengan tajwid qalqalah?",
        OptionA: "Menggandakan huruf-huruf tertentu",
        OptionB: "Menggabungkan huruf-huruf yang berhimpitan",
        OptionC: "Mengkhususkan bacaan pada beberapa huruf tertentu",
        OptionD: "Mengatur cara mengucapkan huruf-huruf qalqalah",
        correctOption: "optionD"
    },

    {
        question: "Sebutkan tiga macam hukum bacaan tajwid.",
        OptionA: "Hukum Ikhtiṣāṣ, Hukum ʻĀm, Hukum Mutlaq",
        OptionB: "Hukum Mad, Hukum Ikhfa, Hukum Idgham",
        OptionC: "Hukum Qalqalah, Hukum Idgham, Hukum Ikhfa",
        OptionD: "Hukum Waqaf, Hukum Ghunnah, Hukum Tafsir",
        correctOption: "optionA"
    },

    {
        question: "Bagaimana cara membaca huruf mad jaiz munfasil?",
        OptionA: "Dengan memanjangkan bacaan satu harakat (ٓ)",
        OptionB: "Dengan memanjangkan bacaan dua harakat (ـٓ)",
        OptionC: "Dengan merapatkan bacaan dua harakat (ـٓ)",
        OptionD: "Dengan merapatkan bacaan satu harakat (ٓ)",
        correctOption: "optionB"
    },

    {
        question: "Apa yang dimaksud dengan tajwid idgham?",
        OptionA: "Menggandakan huruf-huruf tertentu",
        OptionB: "Menggabungkan atau merapatkan huruf-huruf yang berhimpitan",
        OptionC: "Mengkhususkan bacaan pada beberapa huruf tertentu",
        OptionD: "Mengatur cara mengucapkan huruf-huruf qalqalah",
        correctOption: "optionB"
    },

    {
        question: "Kapan kita menggunakan hukum bacaan tajwid ikhfa?",
        OptionA: "Ketika huruf nun sukun atau tanwin bertemu dengan salah satu dari 15 huruf ikhfa",
        OptionB: "Saar membaca huruf mati",
        OptionC: "Pada awal kalimat",
        OptionD: "Hanya pada akhir ayat",
        correctOption: "optionA"
    },

    {
        question: "Sebutkan tiga macam tanda-tanda tajwid yang digunakan dalam mushaf Al-Quran.",
        OptionA: "Tanda waqaf, Tanda mad, Tanda tafsir",
        OptionB: "Tanda qalqalah, Tanda idgham, Tanda ikhfa",
        OptionC: "Tanda tajwid khusus, Tanda tafsir, Tanda waqaf",
        OptionD: "Tanda tafsir, Tanda mad, Tanda idgham",
        correctOption: "optionA"
    },

    {
        question: "Apa yang dimaksud dengan tajwid tafsir?",
        OptionA: "Hukum bacaan yang mengatur cara membaca Al-Quran dengan baik dan benar",
        OptionB: "Ilmu yang mempelajari tafsir Al-Quran",
        OptionC: "Hukum bacaan yang disesuaikan dengan makna kata atau ayat Al-Quran",
        OptionD: "Ilmu yang mempelajari tanda-tanda tajwid dalam mushaf Al-Quran",
        correctOption: "optionC"
    }
]



let shuffledQuestions = []

function handleQuestion() {
    while (shuffledQuestions.length <= 9) {
        const random = question[Math.floor(Math.random() * question.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}

let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0

function NextQuestion(index) {
    handleQuestion()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.OptionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.OptionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.OptionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.OptionD;
}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber]
    const currentQuestionAnswer = currentQuestion.correctOption
    const options = document.getElementsByName("option");
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked === false) {
        document.getElementById('option-modal').style.display = "flex"
        return; // Hentikan fungsi jika tidak ada jawaban yang dipilih
    }

    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "#00ff32"
            playerScore++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        } else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "#00ff32"
            wrongAttempt++
            indexNumber++
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}

function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        } else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000)
}

function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        if (option.labels[0]) {
            document.getElementById(option.labels[0].id).style.backgroundColor = ""
        }
    })
}

function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function handleEndGame() {
    let remark = null
    let remarkColor = null

    if (playerScore <= 3) {
        remark = "Nilai kamu kurang sempurna, Terus belajar yaa!"
        remarkColor = "red"
    } else if (playerScore >= 4 && playerScore < 7) {
        remark = "Sedikit lagi, Ayo kamu pasti bisa!."
        remarkColor = "orange"
    } else if (playerScore >= 7) {
        remark = "Keren, tingkatkan terus belajarmu!."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answer').innerHTML = wrongAttempt
    document.getElementById('right-answer').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"
}

function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}
