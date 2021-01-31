const horizontal = document.querySelector('.horizontal')
const vertical = document.querySelector('.vertical')
const target = document.querySelector('.target')
const tooltip = document.querySelector('.tooltip')

window.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;

    horizontal.style.top = `${y}px`
    vertical.style.left = `${x}px`

    target.style.top = `${y}px`
    target.style.left = `${x}px`

    tooltip.style.top = `${y}px`
    tooltip.style.left = `${x}px`

    tooltip.innerText = `${event.pageX}px, ${event.pageY}px`;
}) 
