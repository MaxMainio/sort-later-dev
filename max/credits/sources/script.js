console.log('https://www.youtube.com/watch?v=NuAKnbIr6TE');

const backGround = document.getElementById('backGround');









window.onload = (event) => {
    backGround.style.background = generateGradient();
}









window.addEventListener('beforeprint', (event) => {
    document.getElementById('print-dots').src = getRandomDots();

    fetch('https://maxmainio.github.io/sort-later-dev/max/updated-1/sources/data.json')
    .then((response) => response.json())
    .then((json) => {
        var selectedWork = json[randomIntFromInterval(0, json.length - 1)];
        // console.log(selectedWork);

        var imgNumber = generateImgNum(selectedWork.workAmount);
        var imgPath = 'assets/work/' + selectedWork.path + imgNumber + selectedWork.extension;
        // console.log(imgPath);

        // GENERATE GRADIENT FOR BACKGROUND OF PRINT
        var generated = generateGradient();
        document.getElementById('print-gradient').style.background = generated;

        document.getElementById('work-img').src = imgPath;
        document.getElementById('work-title').innerHTML = selectedWork.workTitle.toString();
        document.getElementById('student-name').innerHTML = selectedWork.fullName.toString();
    });
});

window.addEventListener('afterprint', (event) => {
    
});









function getRandomDots() {
    var dotNum = randomIntFromInterval(1, 3);
    var dotPath = 'assets/svgs/dots-' + dotNum.toString() + '.svg';
    return dotPath
}









function generateImgNum(num){
    if (num != 1) {
        var imgNumber = randomIntFromInterval(1, num);
        return '-' + imgNumber.toString();
    } else {
        return '';
    }
}









function generateGradient(){
    // GETS RANDOM GRADIENT BY NAME AS STRING
    var gradTag = 'gradient' + Math.floor(Math.random() * 4.99);
    // ARRAY OF THE INDIVIDUAL COLORS OF SELECTED GRADIENT
    var gradColors = eval(gradTag);
    var gradSteps = gradColors.length;

    var gradPlacements = [];
    var min = 0;
    var max = 100;
    var offset = 0;

    // THIS GENERATES THE POSITIONS FOR EACH OCLOR
    for (var i = 0; i < gradSteps; i ++) {
        var wiggleRoom = 10 * (gradSteps - i);

        min = 0 + offset;
        max = 100;
        max = max - wiggleRoom;

        placement = randomIntFromInterval(min, max);
        gradPlacements[i] = placement
        offset = placement + 10;
    }









    // PREPARE THE CSS EXPRESSION OF NEW GRADIENT
    var lause = 'linear-gradient(' + flipACoin();

    // THIS DECIDES DIRECTION OF THE GRADIENT
    function flipACoin(){
        var coinFlip = Math.round(Math.random());
        if (coinFlip == 1) {
            return '0deg';
        } else {
            return '180deg';
        }
    }

    // GENERATES THE PROPER CSS EXPRESSION FOR THE GRADIENT
    for (var i=0; i < gradSteps; i++) {
        var appendable = gradColors[i] + ' ' + gradPlacements[i] + '%'
        lause = lause + ', ' + appendable
    }

    // RETURN THE FORMULA FOR THE GRADIENT
    return(lause + ')');
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}









// GRADIENTS
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