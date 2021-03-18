const gameBtn = document.querySelector('.game_btn');
const gameArea = document.querySelector('.game_area'); // All을 하면 getBoundingClientRect 함수 사용 못함
const gameAreaSize = gameArea.getBoundingClientRect();

// init함수를 호출하면 당근과 벌레들이 랜덤으로 배치된다.
function init() {
    // 당근과 벌레 수를 선언한다.
    const carrots = 5;
    const bugs = 5;
    let checkCarrot = 0;
    let checkBug = 0;

    
    // 당근
    for (i=0; checkCarrot < carrots; i++) {
        // Math.random()을 이용해 난수를 얻는다.
        let randomX = Math.random()*1000;
        let randomY = Math.random()*1000;

        // gameArea 범위 내의 난수들만 살려냄
        if (randomX > gameAreaSize.left && randomX < gameAreaSize.right) {
            if (randomY > gameAreaSize.top && randomY < gameAreaSize.bottom-100) {
                checkCarrot += 1;
                createCarrots(randomX, randomY);
            }
        }
    }
    // 벌레
    for (i=0; checkBug < bugs; i++) {
        let randomX2 = Math.random()*1000;
        let randomY2 = Math.random()*1000;

        if (randomX2 > gameAreaSize.left && randomX2 < gameAreaSize.right) {
            if (randomY2 > gameAreaSize.top && randomY2 < gameAreaSize.bottom-100) {
                checkBug += 1;
                createBugs(randomX2, randomY2);
            }
        }
    }
};

// gama_area의 width, height 등과 난수를 이용하여, game_area 영역에 요소를 생성해준다.
function createCarrots(x, y) {
    let carrotItem = document.createElement('img');
    carrotItem.setAttribute('class', 'carrotItem');
    carrotItem.setAttribute('src', './img/carrot.png')
    gameArea.append(carrotItem);

    carrotItem.style.transform = `translateX(${x}px)`;
    carrotItem.style.transform = `translateY(${y-321}px)`;
}

function createBugs(x, y) {
    let BugsItem = document.createElement('img');
    BugsItem.setAttribute('class', 'BugsItem');
    BugsItem.setAttribute('src', './img/bug.png')
    gameArea.append(BugsItem);

    BugsItem.style.transform = `translateX(${x}px)`;
    BugsItem.style.transform = `translateY(${y-321}px)`;
}

// gameBtn을 클릭하면 init 함수가 호출된다.
gameBtn.addEventListener('click', () => {
    init();
})
