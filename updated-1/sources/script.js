console.log('https://www.youtube.com/watch?v=NuAKnbIr6TE');

const backGround = document.getElementById('backGround');









window.onload = (event) => {
    backGround.style.background = generateGradient();
}

addEventListener('click', e => {
    // fetch('sort-later-work-key.json')
    // console.log(fetch('sort-later-work-key.json'));
    fetch('sort-later-work-key.json')
    .then((response) => response.json())
    .then((json) => console.log(json));
});




function generateGradient(){
    // GETS RANDOM GRADIENT BY NAME AS STRING
    var gradTag = 'gradient' + Math.floor(Math.random() * 4.99);
    // ARRAY OF THE INDIVIDUAL COLORS OF SELECTED GRADIENT
    var gradColors = eval(gradTag);
    // NUMBER OF COLORS IN SELECTED GRADIENT
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

    var lause = 'linear-gradient(0deg'

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