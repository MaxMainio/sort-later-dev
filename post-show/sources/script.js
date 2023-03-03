console.log('https://www.youtube.com/watch?v=NuAKnbIr6TE');

const exhibitionSlide = document.getElementById('exhibition')
const workSlide = document.getElementById('work')
const creditsSlide = document.getElementById('credits')


exhibitionSlide.addEventListener('click', e => {
    workSlide.classList.add('removed');
    creditsSlide.classList.add('removed');
})

workSlide.addEventListener('click', e => {
    creditsSlide.classList.add('removed');
    workSlide.classList.remove('removed');
})

creditsSlide.addEventListener('click', e => {
    creditsSlide.classList.remove('removed');
    workSlide.classList.remove('removed');
})