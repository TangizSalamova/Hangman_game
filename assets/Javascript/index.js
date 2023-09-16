const words = ['genesis','madonna','toto','queen','u2','metallica','journey','inxs','poison','rush','blondie'
]

let musicName = document.querySelector('#music-name');
let image = document.querySelector('#img');
let winScore = document.querySelector('#wins');
let lossesScore = document.querySelector('#losses');
let currentWord = document.querySelector('#current-word');
let guessesRemaining = document.querySelector('#guesses-remaining');
let guessedLetters = document.querySelector('#guessed-letters');
let button = document.querySelector('#btn');

let win = 0;
let lost = 0;
let heart = 11;
let pressLetters = [];
let trueAnswers = 0;

let wordsElement = {
    blondie: {
        photo: './assets/images/blondie.jpg',
        music: "Call Me"
    },

    rush: {
        photo: './assets/images/rush.jpg',
        music: "Limelight"

    },

    poison: {
        photo: './assets/images/poison.jpg',
        music: "Fallen Angel"
    },

    inxs: {
        photo: './assets/images/inxs.jpg',
        music: "Need You Tonight"
    },

    journey: {
        photo: './assets/images/journey.jpg',
        music: "Don't Stop Believin"
    },

    metallica: {
        photo: './assets/images/metallica.jpg',
        music: "Master of Puppets"
    },

    u2: {
        photo: './assets/images/u2.jpg',
        music: "With or Without You"
    },

    queen: {
        photo: './assets/images/queen.jpg',
        music: "Princes of the Universe"
    },

    toto: {
        photo: './assets/images/toto.jpg',
        music: "Rosanna"
    },

    madonna: {
        photo: './assets/images/madonna.jpg',
        music: "Material Girl"
    },

    genesis: {
        photo: './assets/images/genesis.jpg',
        music: "Illegal Alien"
    }

};

function randomWord () {
    var index = Math.floor(Math.random() * (words.length));

    return words[index];
}

function putDashes(word, pressLetters){
    var dashes = [];
    for(let i of word){
        if(i === ' '){
            dashes.push('&nbsp;');
        }else if(pressLetters.includes(i)){
            dashes.push(i);
        }else{
            dashes.push('-');
        }
    }
    return dashes.join(' ');
}

let word = randomWord();

function dashesShow (pressLetter) {
    const dash = putDashes(word, pressLetters);

    currentWord.innerHTML = dash;
}

let calculateHeartsAndShow = (pressLetter)=>{
    if(!word.includes(pressLetter)){
        heart--;
    }
    guessesRemaining.innerHTML = heart;
}

let showTypedLetters = (pressLetter)=>{
    guessedLetters.innerHTML = pressLetter;
}

let gameIsLost = () => {
    lost++;
    heart = 11;
    pressLetters = [];
    trueAnswers=0;

    lossesScore.innerHTML = lost;
    guessesRemaining.innerHTML = heart;
    guessedLetters.innerHTML = pressLetters;
    word = randomWord();
    dashesShow('');
    image.setAttribute("src", "./assets/images/hangman-boardgame.jpg");
}

let gameIsWin = () => {
    image.setAttribute("src", `${wordsElement[word].photo}`);
    musicName.innerHTML = wordsElement[word].music;
    win++;
    heart = 11;
    pressLetters = [];
    trueAnswers=0;
    winScore.innerHTML = win;
    guessesRemaining.innerHTML = heart;
    guessedLetters.innerHTML = pressLetters;
    word = randomWord();
    dashesShow('');
    
}

dashesShow('');
window.addEventListener('keyup', function (e) {
    const pressLetter = e.key;

    if(!pressLetters.includes(pressLetter)){
        pressLetters.push(pressLetter);
    }
    if(word.split('').includes(e.key)){
        trueAnswers++;
    }

    dashesShow(pressLetter);

    calculateHeartsAndShow(e.key);
    showTypedLetters(pressLetters);

    if(!currentWord.innerHTML.includes('-')){
        gameIsWin();
    }
    if(heart === 0) {
        gameIsLost();
    }
})

button.addEventListener('click', () => {
    word = randomWord();
    win = 0;
    lost = 0;
    heart = 11;
    pressLetters = [];
    trueAnswers = 0;
    dashesShow('');
    winScore.innerHTML = '';
    lossesScore.innerHTML = '';
    guessesRemaining.innerHTML = heart;
    guessedLetters.innerHTML = pressLetters;
    image.setAttribute('src', './assets/images/hangman-boardgame.jpg');
    
})




