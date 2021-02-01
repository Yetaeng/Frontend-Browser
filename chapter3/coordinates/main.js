const horizontal = document.querySelector('.horizontal')
const vertical = document.querySelector('.vertical')
const target = document.querySelector('.target')
const tooltip = document.querySelector('.tooltip')

window.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;

    const targetRect = target.getBoundingClientRect();
    const targetHalfWidth = targetRect.width / 2
    const targetHalfHeight = targetRect.height / 2

    horizontal.style.transform = `translateY(${y}px)`;
    vertical.style.transform = `translateX(${x}px)`;

    target.style.transform = `translate(${x-targetHalfWidth}px, ${y-targetHalfHeight}px)`;


    tooltip.style.transform = `translate(${x}px, ${y}px)`;
    tooltip.innerText = `${event.pageX}px, ${event.pageY}px`;
}) 

// top이나 left는 layout부터 발생하는 속성이므로 애니메이션을 사용할 때 좋지 않다.
// 대신 composite만 일어나는 translate를 쓰면 성능 개선에 굿
// layout -> paint -> composite