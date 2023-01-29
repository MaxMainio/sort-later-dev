console.log('https://www.youtube.com/watch?v=NuAKnbIr6TE');

function scaleType(){
    var vw = window.innerWidth
    var vh = window.innerHeight
    var texts = document.querySelectorAll('p');
    
    var i;
    for(i = 0; i < texts.length; i++){
        texts[i].style.fontSize = vh / texts.length + 'px';
        texts[i].style.lineHeight = vh / texts.length + 'px';

        var lineWidth = texts[i].offsetWidth;
        var fitLength = vw / (lineWidth / 100);

        texts[i].style.transform = 'scaleX(' + fitLength + '%)';
    }
}


window.onload = (event) => {
    scaleType();
}

addEventListener('resize', e => {
    scaleType();
});
















// const body = document.querySelector(body);

const firstLine = document.getElementById('first');
const secondLine = document.getElementById('second');
const thirdLine = document.getElementById('third');
const fourthLine = document.getElementById('fourth');
const fifthLine = document.getElementById('fifth');

const studentArea = document.getElementById('student-print');





var clickCount = 0;

addEventListener('click', e => {
    clickCount ++

    if (clickCount % 3 === 0) {
        posterThree();
    }

    if (clickCount % 3 === 1) {
        posterOne();
    }

    if (clickCount % 3 === 2) {
        posterTwo();
    }
})

function posterOne(){
    document.querySelector('body').classList.add('bg-1');

    firstLine.classList.add('onetonine');
    firstLine.classList.add('first');

    secondLine.classList.add('onetonine');
    secondLine.classList.add('second');

    thirdLine.classList.add('onetonine');
    thirdLine.classList.add('third');

    fourthLine.classList.add('onetosix');
    fourthLine.classList.add('fourth');

    fifthLine.classList.add('onetosix');
    fifthLine.classList.add('fifth');

    studentArea.classList.add('sixtonine');

    window.print();
    document.querySelector('body').classList.remove('bg-1');
}