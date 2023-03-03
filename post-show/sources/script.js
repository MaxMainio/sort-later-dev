console.log('https://www.youtube.com/watch?v=NuAKnbIr6TE');

const favicon = document.querySelector("link[rel~='icon']");

const exhibitionSlide = document.getElementById('exhibition')
const workSlide = document.getElementById('work')
const studentsSlide = document.getElementById('students')

// const webGradient = document.getElementById('web-gradient');
const falseFile = document.getElementById('false-file');
// const monthSvg = document.getElementById('month-container');

// const printGradient = document.getElementById('print-gradient');
// const printIMG = document.getElementById('work-img');
// const workTitle = document.getElementById('work-title');
// const studentName = document.getElementById('student-name');



// ON LOAD ---------------------------------------------------------------------------------------------------------------
window.onload = (event) => {
    falseFile.style.setProperty("background-image", getRandomWebDots());
    favicon.href = 'assets/favicons/favicon-' + randomIntFromInterval(1, 10) + '.ico';
}



// GENERATE DOTS    ------------------------------------------------------------------------------------------------------
function getRandomWebDots() {
    var dotNum = randomIntFromInterval(1, 3);
    var dotPath = 'url(assets/web-svg/dots-web-' + dotNum.toString() + '.svg';
    return dotPath
}



// CLICK ON STUDENTS / CREDITS PAGE --------------------------------------------------------------------------------------
studentsSlide.addEventListener('click', e => {
    studentsSlide.classList.add('animatable');
    workSlide.classList.add('animatable');

    studentsSlide.classList.remove('removed');
    workSlide.classList.remove('removed');

    setTimeout(() => {
        studentsSlide.classList.remove('animatable')
        workSlide.classList.remove('animatable')
    },500);
})

// CLICK ON WORK PAGE ----------------------------------------------------------------------------------------------------
workSlide.addEventListener('click', e => {
    studentsSlide.classList.add('animatable');
    workSlide.classList.add('animatable');

    studentsSlide.classList.add('removed');
    workSlide.classList.remove('removed');

    setTimeout(() => {
        studentsSlide.classList.remove('animatable');
        workSlide.classList.remove('animatable');
    },500);
})

// CLICK ON EXHIBITION PAGE ----------------------------------------------------------------------------------------------
exhibitionSlide.addEventListener('click', e => {
    workSlide.classList.add('animatable');
    studentsSlide.classList.add('animatable');

    workSlide.classList.add('removed')
    studentsSlide.classList.add('removed')

    setTimeout(() => {
        workSlide.classList.remove('animatable')
        studentsSlide.classList.remove('animatable')
    },500);
})



// GENERATES RANDOM INTEGER BETWEEN TWO VALUES    ------------------------------------------------------------------------
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}



// GRADIENTS    ----------------------------------------------------------------------------------------------------------
const gradient0 = [];
gradient0[0] = '#94ff3f';
gradient0[1] = '#ffff00';
gradient0[2] = '#ccc';
gradient0[3] = '#fff';

const gradient1 = [];
gradient1[0] = '#fff';
gradient1[1] = '#ff9145';
gradient1[2] = '#abff62';
gradient1[3] = '#ff77be';

const gradient2 = [];
gradient2[0] = '#fff';
gradient2[1] = '#ffff00';
gradient2[2] = '#ff96e0';
gradient2[3] = '#b3b3b3';

const gradient3 = [];
gradient3[0] = '#fff';
gradient3[1] = '#ff7fdf';
gradient3[2] = '#3fc1ff';
gradient3[3] = '#bfffb4';

const gradient4 = [];
gradient4[0] = '#fff';
gradient4[1] = '#f0008d';
gradient4[2] = '#c465ff';