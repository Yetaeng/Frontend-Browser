const addBtn = document.querySelector('.btn');
const items = document.querySelector('.items');
const input = document.querySelector('#input');

function addItem() {
    const li = document.createElement('li');
    li.className = 'item';

    let inputValue = document.getElementById('input').value; // getElementById 쓸 때는 아이디이름만! #안씀
    let text = document.createTextNode(inputValue);
    li.appendChild(text);

    const delBtn = document.createElement('button');
    delBtn.className = 'delBtn';
    
    // let delText = document.createTextNode('DEL');
    // delBtn.appendChild(delText);
    li.appendChild(delBtn);

    if (inputValue === '') {
        alert('Enter the product to buy!');
    } else {
        items.appendChild(li);
    }
    
    // 입력창 초기화 시켜주는건데 왜 그냥 inputValue를 써주면 안되고, 이렇게 써줘야하나?
    document.getElementById('input').value = '';

    const del = document.getElementsByClassName('delBtn')
    let i;
    for (i=0; i<del.length; i++) {
        // 화살표 함수로 어케 바꾸지? 바꾸면 왜 undefined가 나오지ㅠ
        del[i].onclick =  function() {
            let parent = this.parentElement;
            parent.remove();
        }
    }
}

input.addEventListener('keydown', () => {
    if (window.event.keyCode === 13) {
        addItem();
    }
})

addBtn.addEventListener('click', () => {
    addItem();
})