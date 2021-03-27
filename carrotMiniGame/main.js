'use strict';

const area = document.querySelector('.game_area');
const areaRect = area.getBoundingClientRect();
const carrotSize = 80;
const gameBtn = document.querySelector('.game_btn');

function initGame() {
    console.log(areaRect);
    addItem('carrot', 5, 'img/carrot.png');
    addItem('bug', 5, 'img/bug.png');
}

function addItem(itemName, count, imgPath) {
    // x1, x2, y1, y2를 이용해 특정 범위 내에 속하는 난수를 구한다.
    const x1 = 0;
    const y1 = 0;
    const x2 = areaRect.width - carrotSize; // bug는 50인데 가장 큰 거를 빼주자.
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

function removeAllItem() {
    const carrot = document.querySelectorAll('.carrot');
    const bug = document.querySelectorAll('.bug');

    for (let i=0; i<carrot.length; i++) {
        carrot[i].remove()
        bug[i].remove()
    }
}

function timer(setTimeSecond) {
    let x = document.querySelector('.game_timer')
    x.innerText = `0:${setTimeSecond}`;
    for(let i=0; i<=setTimeSecond; i++) {
        setTimeout(() => { x.innerText = `0:${setTimeSecond-i}` }, `${i}000`);
    }
}

gameBtn.addEventListener('click', () => {
    console.log('Game Start!')
    removeAllItem();
    initGame();
    timer(15);
})


// game_area를 position:relative를 주고, item을 position으로 주면 그 영역 내에서 x, y대로 배치시킬 수 있다.

// 나는 난수를 구할 떄 0 이상 1 미만의 난수 생성하기를 했는데, 엘리쌤은 두 값 사이의 난수 생성하기를 하심
// 그래서 나는 소수점에 1000 같은 수를 곱해서 코드를 짰고,
// 엘리쌤처럼 하면 두 값(맨 왼쪽부터 맨 오른쪽이랑 맨 위부터 맨 아래)사이의 난수를 그냥 구할 수 있다.