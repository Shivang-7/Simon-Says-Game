let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h4 = document.querySelector("h4");

//if any key is pressed in the complete document, then game will start (flash + level up)
document.addEventListener("keypress", function () {
    if (started == false) {
        started = true;
        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    h4.innerText = `Level ${level}`;
    //random btn choose
    let randIdx = Math.floor(Math.random() * 3);
    let randBtn = document.querySelector(`.${btns[randIdx]}`);
    gameSeq.push(btns[randIdx]);    //store that value in gameSeq array
    btnFlash(randBtn);
}

function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}


//once game is started, then user clicks any btn, add that value in userSeq array, and match the complete sequence
let boxes = document.querySelectorAll(".box");
for (let btn of boxes) {
    btn.addEventListener("click", btnPress);
}

function btnPress() {
    let btn = this;
    btnFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h4.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to restart.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();  //reset complete game
    }
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}