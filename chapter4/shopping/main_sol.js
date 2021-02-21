const items = document.querySelector('.items');
const inputText = document.querySelector('.footer_input')
const addBtn = document.querySelector('.footer_plus');
const footer = document.querySelector('.footer');

function onAdd() {
    // 1. 사용자가 입력한 테스트를 받아온다.
    const text = inputText.value;
    if (text === '') {
        inputText.focus();
        return
    }

    // 2. 새로운 아이템을 만든다.
    const item = createItem(text);

    // 3. items 컨테이너 안에 새로 만든 아이템을 추가한다.
    items.appendChild(item);

    // 4. 새로 추가된 아이템으로 스크롤링
    item.scrollIntoView({block: 'center'});

    // 5. 인풋을 초기화 한다.
    inputText.value = '';
    inputText.focus();
}

let id = 0;
// 고유 아이디를 이용해서 해당 항목을 삭제할 수 있도록 함.
// 이때 UUID라는 라이브러리를 이용해도 되지만 여기서는 간단하게 global integer를 이용
// 사실 integer를 쓰는 것은 정말 좋지 않다. 
// UUID 같은 유니크 아이디나, 오브젝트에 있는 해시 코드를 이용해서 고유한 아이디를 만드는 것이 더 좋다.
function createItem(text) {
    const itemLi = document.createElement('li');
    itemLi.setAttribute('class', 'item_li');
    itemLi.setAttribute('data-id', id)
    itemLi.innerHTML = `
        <div class="item">
            <span class="item_name">${text}</span>
            <button class="item_delete">
                <i class="fas fa-trash-alt" data-id=${id}></i>
            </button>
        </div>
        <div class="item_divider"></div>
    `;
    id++;
    return itemLi;
}

addBtn.addEventListener('click', () => {
    onAdd();
});

inputText.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        onAdd();
    }
});

items.addEventListener('click', (event) => {
    const targetId = event.target.dataset.id;
    // if (nodeName = I)로 하면 휴지통이 아닌 다른 아이콘과 혼동이 올 수 있기 때문에 지양
    if (targetId) {// targetId가 있다면
        const toBeDeleted = document.querySelector(`.item_li[data-id="${targetId}"]`)
        toBeDeleted.remove()
    }
});