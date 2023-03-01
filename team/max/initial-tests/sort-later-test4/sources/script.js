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

















const firstLine = document.getElementById('first');
const secondLine = document.getElementById('second');
const thirdLine = document.getElementById('third');
const fourthLine = document.getElementById('fourth');
const fifthLine = document.getElementById('fifth');

const studentArea = document.getElementById('student-print');
const studentWork = document.getElementById('student-work')









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
    firstLine.classList.add('first-1');

    secondLine.classList.add('onetonine');
    secondLine.classList.add('second-1');

    thirdLine.classList.add('onetonine');
    thirdLine.classList.add('third-1');

    fourthLine.classList.add('onetosix');
    fourthLine.classList.add('fourth-1');

    fifthLine.classList.add('onetosix');
    fifthLine.classList.add('fifth-1');

    studentArea.classList.add('sixtonine');
    studentArea.classList.add('rows-fourtosix');
    
    document.querySelector('h1').classList.add('second-1');
    document.querySelector('h2').classList.add('second-1');

    studentWork.src = '../assets/img/gardener-3.jpg';
    studentWork.classList.add('aspectratio-1');



    setTimeout(() => {
        window.print();

        setTimeout(() => {
            document.querySelector('body').classList.remove('bg-1');

            firstLine.classList.remove('onetonine');
            firstLine.classList.remove('first-1');
        
            secondLine.classList.remove('onetonine');
            secondLine.classList.remove('second-1');
        
            thirdLine.classList.remove('onetonine');
            thirdLine.classList.remove('third-1');
        
            fourthLine.classList.remove('onetosix');
            fourthLine.classList.remove('fourth-1');
        
            fifthLine.classList.remove('onetosix');
            fifthLine.classList.remove('fifth-1');
        
            studentArea.classList.remove('sixtonine');
            studentArea.classList.remove('rows-fourtosix');

            document.querySelector('h1').classList.remove('second-1');
            document.querySelector('h2').classList.remove('second-1');
        
            studentWork.src = '';
            studentWork.classList.remove('aspectratio-1');
        }, 1)
    }, 10)
}









function posterTwo(){
    document.querySelector('body').classList.add('bg-2');

    firstLine.classList.add('onetofive');
    firstLine.classList.add('first-2');

    secondLine.classList.add('fivetonine');
    secondLine.classList.add('second-2');

    thirdLine.classList.add('onetonine');
    thirdLine.classList.add('third-2');

    fourthLine.classList.add('fivetonine');
    fourthLine.classList.add('fourth-2');

    fifthLine.classList.add('fivetonine');
    fifthLine.classList.add('fifth-2');

    studentArea.classList.add('rows-twotofour');
    studentArea.classList.add('onetonine');
    document.querySelector('h1').classList.add('second-2');
    document.querySelector('h2').classList.add('second-2');

    studentWork.src = '../assets/img/interview-interior.webp';
    studentWork.classList.add('aspectratio-2');



    setTimeout(() => {
        window.print();

        setTimeout(() => {
            document.querySelector('body').classList.remove('bg-2');

            firstLine.classList.remove('onetofive');
            firstLine.classList.remove('first-2');
        
            secondLine.classList.remove('fivetonine');
            secondLine.classList.remove('second-2');
        
            thirdLine.classList.remove('onetonine');
            thirdLine.classList.remove('third-2');
        
            fourthLine.classList.remove('fivetonine');
            fourthLine.classList.remove('fourth-2');
        
            fifthLine.classList.remove('fivetonine');
            fifthLine.classList.remove('fifth-2');
        
            studentArea.classList.remove('rows-twotofour');
            studentArea.classList.remove('onetonine');
            document.querySelector('h1').classList.remove('second-2');
            document.querySelector('h2').classList.remove('second-2');
        
            studentWork.src = '';
            studentWork.classList.remove('aspectratio-2');
        }, 1)
    }, 10)
}









function posterThree(){
    document.querySelector('body').classList.add('bg-3');

    firstLine.classList.add('onetofive');
    firstLine.classList.add('first-3');
    firstLine.classList.add('zindex');

    secondLine.classList.add('fivetonine');
    secondLine.classList.add('second-3');
    secondLine.classList.add('zindex');

    thirdLine.classList.add('onetonine');
    thirdLine.classList.add('third-3');

    fourthLine.classList.add('onetofive');
    fourthLine.classList.add('fourth-3');

    fifthLine.classList.add('fivetonine');
    fifthLine.classList.add('fifth-3');

    studentArea.classList.add('rows-onetofour');
    studentArea.classList.add('onetonine');
    document.querySelector('h1').classList.add('second-3');
    document.querySelector('h2').classList.add('second-3');

    studentWork.src = '../assets/img/best-of-weekly-large.png';
    studentWork.classList.add('aspectratio-3');



    setTimeout(() => {
        window.print();

        setTimeout(() => {
            document.querySelector('body').classList.remove('bg-3');

            firstLine.classList.remove('onetofive');
            firstLine.classList.remove('first-3');
        
            secondLine.classList.remove('fivetonine');
            secondLine.classList.remove('second-3');
        
            thirdLine.classList.remove('onetonine');
            thirdLine.classList.remove('third-3');
        
            fourthLine.classList.remove('onetofive');
            fourthLine.classList.remove('fourth-3');
        
            fifthLine.classList.remove('fivetonine');
            fifthLine.classList.remove('fifth-3');
        
            studentArea.classList.remove('rows-onetofour');
            studentArea.classList.remove('onetonine');
            document.querySelector('h1').classList.remove('second-3');
            document.querySelector('h2').classList.remove('second-3');
        
            studentWork.src = '';
            studentWork.classList.remove('aspectratio-3');
        }, 1)
    }, 10)
}