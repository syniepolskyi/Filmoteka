const upBtn = document.querySelector('#up-btn');
window.addEventListener("scroll", scrollFunction)

function scrollFunction () {
    if(window.scrollY > 300) {
        upBtn.style.display = "block";
    } else {
        upBtn.style.display = "none";
}
}
upBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
})