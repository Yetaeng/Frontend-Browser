const items = document.querySelector('.items');
const inputText = document.querySelector('.footer_input')
const addBtn = document.querySelector('.footer_plus');

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

function createItem(text) {
    const itemLi = document.createElement('li');
    itemLi.setAttribute('class', 'item_li');

    const item = document.createElement('div');
    item.setAttribute('class', 'item');

    const itemDivider = document.createElement('div');
    itemDivider.setAttribute('class', 'item_divider');

    const name = document.createElement('span')
    name.setAttribute('class', 'item_name')
    name.innerText = text;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'item_delete');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.addEventListener('click', () => {
        items.removeChild(itemLi)
    })

    item.appendChild(name);
    item.appendChild(deleteBtn);

    itemLi.appendChild(item);
    itemLi.appendChild(itemDivider);

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