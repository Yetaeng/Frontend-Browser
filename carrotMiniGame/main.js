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

// 게임의 상태를 기억할 수 있는 변수 필요
let started = false; // 게임이 시작되지 않은 상태

gameBtn.addEventListener('click', () => {
    if(started) {
        stopGame();
    } else {
        startGame();
    }
    
    started = !started // 현 started의 상태와 반대로 만듬
})

replayBtn.addEventListener('click', () => {
    startGame();
    hidePopup();
    started = !started;
})

function startGame() { 
    initGame();
    showStopBtn();
    showTimerAndCount();
    startTimer();
    hidePopup();
}

function stopGame() {
    showPlayBtn();
    stopTimer();
    showPopup();
}

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

///////////////////////////////
let nIntervId;
let time = setTime;

function startTimer() {
    nIntervId = setInterval(countDown, 1000);
    }

function countDown() {
    let min = '';
    let sec = '';

    time--;
    min = parseInt(time / 60); // parseInt는 정수로 반환하는 함수이며, 이를 이용해 몫을 계산
    sec = time % 60; // 나머지를 계산
    gameTimer.innerHTML = `${min}:${sec}`;

    if (time == 0) {
        stopTimer();
        showPopup();
    }
}

function stopTimer() {
    clearInterval(nIntervId);
    return time = setTime;
}
///////////////////////////////

function showPopup() {
    const popup = document.querySelector('.popup');
    popup.classList.remove('popup_hide');
}

function hidePopup() {
    const popup = document.querySelector('.popup');
    popup.classList.add('popup_hide');
}

function initGame() {
    area.innerHTML = '' // 처음에 remove()를 써서 아이템을 하나하나 지웠는데, 그냥 innerHtml = ''로 초기화하여 지울 수 있다.

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