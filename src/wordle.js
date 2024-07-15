const WORD_LIST = [
    'CRANE', 'PLANE', 'TRUCK', 'BRAVE', 'LIGHT', 'SWORD', 'FLYER', 'SPARK', 'SHINE', 'BREAD',
    'TRAIN', 'WATER', 'GLOBE', 'MOUSE', 'PHONE', 'HOUSE', 'TABLE', 'CHAIR', 'CLOCK', 'CABLE',
    'BRUSH', 'GLASS', 'PLANT', 'CLEAN', 'FLOOR', 'SHEET', 'SCALE', 'BLANK', 'CHAIN', 'SPACE',
    'SPOON', 'BLOOM', 'FRAME', 'COAST', 'ALERT', 'CROWN', 'ROBOT', 'STORM', 'BEACH', 'NIGHT',
    'SOUND', 'MUSIC', 'EARTH', 'CANDY', 'BROWN', 'BLACK', 'WHITE', 'GREEN', 'BREAD', 'STONE',
    'FRUIT', 'BLEND', 'COVER', 'BASIC', 'ARROW', 'BREAK', 'BRICK', 'BRING', 'CROSS', 'CLOUD',
    'CYCLE', 'DANCE', 'EARLY', 'FAITH', 'FRESH', 'FRANK', 'GRACE', 'GUARD', 'HAPPY', 'HEART',
    'HONEY', 'HUMAN', 'IMAGE', 'KNOCK', 'LARGE', 'LEMON', 'LEVEL', 'LIVER', 'MAGIC', 'MAJOR',
    'MEDIA', 'MELON', 'MIXED', 'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUTH', 'MUSIC', 'NERVE',
    'NOBLE', 'NORTH', 'OCEAN', 'ORDER', 'OTHER', 'PAINT', 'PAPER', 'PARTY', 'PEACE', 'PITCH'
];

function getRandomWord() {
    return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

let WORD_TO_GUESS = getRandomWord();
let attempts = 6;

document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    for (let i = 0; i < attempts; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 0; j < 5; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.id = `tile-${i}-${j}`;
            row.appendChild(tile);
        }
        board.appendChild(row);
    }

    const keyboard = document.getElementById('keyboard');
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Enter','Z', 'X', 'C', 'V', 'B', 'N', 'M','Back']
    ];

    keys.forEach(row => {
        const keyboardRow = document.createElement('div');
        keyboardRow.className = 'keyboard-row';
        row.forEach(key => {
            const keyElement = document.createElement('div');
            keyElement.className = 'key';
            keyElement.textContent = key;
            keyElement.setAttribute('data-key', key);
            keyElement.addEventListener('click', () => {
                if (key === "Enter") {
                    guessBtn.click();
                    return;
                }
                const guessInput = document.getElementById('guessInput');
                if (key === "Back") {
                    if (guessInput.value.length > 0) {
                        guessInput.value = guessInput.value.slice(0, -1);
                    }
                    return;
                }
                if (guessInput.value.length < 5) {
                    guessInput.value += key;
                }
            });
            keyboardRow.appendChild(keyElement);
        });
        keyboard.appendChild(keyboardRow);
    });

    const guessBtn = document.getElementById('guessBtn');
    guessBtn.addEventListener('click', function() {
        const guessInput = document.getElementById('guessInput');
        const guess = guessInput.value.toUpperCase();
        if (guess.length !== 5) {
            document.getElementById('message').textContent = 'Please enter a 5-letter word.';
            return;
        }

        if (attempts === 0) {
            document.getElementById('message').textContent = 'No attempts left. Game over!';
            return;
        }

        let correctLetters = new Set();
        for (let i = 0; i < guess.length; i++) {
            const keyElement = document.querySelector(`.key[data-key="${guess[i]}"]`);
            if (WORD_TO_GUESS.includes(guess[i])) {
                if (WORD_TO_GUESS.indexOf(guess[i]) === i) {
                    keyElement.classList.add('green-key');
                    correctLetters.add(guess[i]);
                } else {
                    keyElement.classList.add('yellow-key');
                }
            } else {
                keyElement.classList.add('grey-key');
            }
        }

        // Update board tiles based on correct letters
        for (let i = 0; i < WORD_TO_GUESS.length; i++) {
            const tile = document.getElementById(`tile-${attempts-1}-${i}`);
            tile.textContent = guess[i];
            if (correctLetters.has(guess[i])) {
                tile.classList.add('green');
            } else if (WORD_TO_GUESS.includes(guess[i])) {
                tile.classList.add('yellow');
            } else {
                tile.classList.add('grey');
            }
        }

        if (guess === WORD_TO_GUESS) {
            document.getElementById('message').textContent = 'Congratulations! You guessed the word correctly.';
            guessBtn.disabled = true;
        } else {
            attempts--;
            document.getElementById('message').textContent = `Incorrect guess. ${attempts} attempts left.`;
            if (attempts === 0) {
                document.getElementById('message').textContent = `No attempts left. The word was ${WORD_TO_GUESS}. Game over!`;
                guessBtn.disabled = true;
            }
        }

        guessInput.value = '';
    });
    document.getElementById('message').textContent = 'Guess the 5-letter word!';
});
