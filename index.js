const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

console.log("number:", randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

//Start recognition and game
recognition.start();

//Capture user speak
function onSpeak(e) {
    const msg = e.results[0][0].transcript;
   
    writeMessage(msg);
    checkNumber(msg);
} 


//Write Speech
function writeMessage(msg) {
    msgEl.innerHTML =`
        <div>You said: </div>
        <span class="box">${msg}</span>
    `;
}

//Check msg against number
function checkNumber(msg) {
    const num = +msg;

    //check if valid number
    if (Number.isNaN(num)) {
        msgEl.classList.add('wrong')
        msgEl.innerHTML += '<div> That is not a valid number</div>';
        return;
    }

    //Check in range
    if (num > 100 || num < 1) {
        msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
        msgEl.classList.add('wrong');
        return;
    }

    //Check Number
    if (num === randomNum) {
        document.body.innerHTML = `
        <h2> Congrats! You have guessed the number! <br><br>
        It was ${num}</h2>
        <button classs="play-again" id="play-again">Play Again</button>
        `;
    } else if (num > randomNum) {
        msgEl.classList.remove('wrong');
        msgEl.classList.add('close')
        msgEl.innerHTML += '<div>GO LOWER</div>';
    } else {
        msgEl.classList.remove('wrong');
        msgEl.classList.add('close')
        msgEl.innerHTML += '<div>GO HIGHER</div>';
    }
}

//Generate Random Number
function getRandomNumber () {
    return Math.floor(Math.random() * 100) + 1;   
}


//Speak result
recognition.addEventListener('result', onSpeak); 

//Ens Speech Reconnition service
recognition.addEventListener('end', () => recognition.start());

//Play again event
document.body.addEventListener('click', (e) => {
    if (e.target.id == 'play-again') {
        window.location.reload();
    }
});
