const toolTip = document.querySelector('.toolTip')

window.addEventListener('mousemove', (event) => {
    const x = event.clientX;
    const y = event.clientY;

    toolTip.innerText = `${event.pageX}px, ${event.pageY}px`;
    toolTip.style.top = (y + 70) + 'px';
    toolTip.style.left = (x + 70) + 'px';
}) 
