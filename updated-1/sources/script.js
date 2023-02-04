console.log('https://www.youtube.com/watch?v=NuAKnbIr6TE');

const backGround = document.getElementById('backGround');









window.onload = (event) => {
    generateGradient();
}









function generateGradient(){
    var mainSelector = 'gradient' + Math.round(Math.random() * 4);
    // console.log(mainSelector);
    var subSelector = Math.round(Math.random() * eval(mainSelector).length);
    // console.log(eval(mainSelector) + [subSelector]);
    var selected = eval(mainSelector) + [subSelector];
    // console.log(selected);
    return(selected);
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