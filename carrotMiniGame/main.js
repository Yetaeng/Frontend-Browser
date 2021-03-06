'use strict';

const area = document.querySelector('.game_area');
const areaRect = area.getBoundingClientRect();
const carrotSize = 80;
const carrotCount = 5;
const bugCount = 5;
const gameBtn = document.querySelector('.game_btn');
const gameTimer = document.querySelector('.game_timer');
const gameCnt = document.querySelector('.game_cnt');
const setTime = 5;
const replayBtn = document.querySelector('.replay_btn');
const popupMsg = document.querySelector('.popup_msg');

const sndbgm = new Audio('./sound/bg.mp3');
const sndAlert = new Audio('./sound/alert.wav');
const sndBugPull = new Audio('./sound/bug_pull.mp3');
const sndCarrotPull = new Audio('./sound/carrot_pull.mp3');
const sndGameWin = new Audio('./sound/game_win.mp3');

let started = false;


/* 이벤트 */
gameBtn.addEventListener('click', () => {
    if(started) {
        stopGame();
        changePopupMsg('replay');
        sndbgm.pause();
        sndAlert.play();
    } else {
        startGame();
        sndbgm.play();
    }
    started = !started
})

replayBtn.addEventListener('click', () => {
    started = !started;
    startGame();
    hidePopup();
    sndbgm.play();
})


/* 함수 */
function startGame() { 
    initGame();
    showStopBtn();
    showTimerAndCount();
    startTimer();
    hidePopup();
    removeCarrot();
    checkClickBug();
}

function stopGame() {
    showPlayBtn();
    stopTimer();
    showPopup();
}

/* step 3 */
function removeCarrot() {
    const carrot = document.querySelectorAll('.carrot');
    for (let i=0; i<carrot.length; i++) {
        carrot[i].addEventListener('click', () => {
            gameCnt.textContent--;
            carrot[i].remove()
            sndCarrotPull.play();
            
            if (gameTimer.textContent != '0:0' && gameCnt.textContent == '0') {
                stopGame();
                changePopupMsg('win');
                sndbgm.pause();
                sndGameWin.play();
                started = !started;
            }
        })
    }
}

function changePopupMsg(param) {
    if (param == 'win') {
        popupMsg.innerText = "You Won!"
    }
    else if (param == 'lose') {
        popupMsg.innerText = "You lost!"
    }
    else if (param == 'replay') {
        popupMsg.innerText = "Replay?"
    }
}

function checkClickBug() {
    const bug = document.querySelectorAll('.bug');

    for (let i=0; i<bug.length; i++) {
        bug[i].addEventListener('click', () => {
            sndbgm.pause();
            sndBugPull.play();
            stopGame();
            changePopupMsg('lose');
            started = !started;
        })
    }
}

/* step 2 */
function showStopBtn() {
    const icon =  gameBtn.querySelector('.fa-play');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
}

function showPlayBtn() {
    const icon =  gameBtn.querySelector('.fa-stop');
    icon.classList.add('fa-play');
    icon.classList.remove('fa-stop');
}

function showTimerAndCount() {
    gameTimer.style.visibility = 'visible';
    gameCnt.style.visibility = 'visible';
}

let nIntervId;
let time = setTime;

function startTimer() {
    nIntervId = setInterval(countDown, 1000);
    }

function countDown() {
    let min = '';
    let sec = '';

    time--;
    min = parseInt(time / 60);
    sec = time % 60;
    gameTimer.innerHTML = `${min}:${sec}`;

    if (time == 0) {
        stopGame();
        sndbgm.pause();
        sndAlert.play();
        changePopupMsg('lose');
        started = !started;
    }
}

function stopTimer() {
    clearInterval(nIntervId);
    return time = setTime;
}

function showPopup() {
    const popup = document.querySelector('.popup');
    popup.classList.remove('popup_hide');

    // 팝업창이 있다면, gameBtn 비활성화하기 (To do - 스케일 없애기)
    if(showPopup) {
        gameBtn.disabled = true;
    }
}

function hidePopup() {
    const popup = document.querySelector('.popup');
    popup.classList.add('popup_hide');
    gameBtn.disabled = false;
}

/* step 1 */
function initGame() {
    area.innerHTML = '';

    addItem('carrot', carrotCount, 'img/carrot.png');
    addItem('bug', bugCount, 'img/bug.png');
    gameCnt.innerText = carrotCount;
    gameTimer.innerHTML = `0:${setTime}`;
}

function addItem(itemName, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = areaRect.width - carrotSize;
    const y2 = areaRect.height - carrotSize;

    for (let i=0; i<count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', itemName);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';

        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;

        area.append(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}