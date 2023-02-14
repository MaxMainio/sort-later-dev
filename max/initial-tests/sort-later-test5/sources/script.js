console.log('https://www.youtube.com/watch?v=NuAKnbIr6TE');

function scaleType(){
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var texts = document.querySelectorAll('p');
    
    var i;
    for(i = 0; i < texts.length; i++){
        var heightToFit = texts[i].parentElement.offsetHeight
        texts[i].style.fontSize = heightToFit + 'px';
        texts[i].style.lineHeight = heightToFit + 'px';

        var lineWidth = texts[i].offsetWidth;
        var fitLength = vw / (lineWidth / 100);

        texts[i].style.transform = 'scaleX(' + fitLength + '%)';
    }
}





console.log(document.querySelector('#large').parentElement.offsetHeight)


window.onload = (event) => {
    scaleType();
}

addEventListener('resize', e => {
    scaleType();
});