$(document).ready(function(){

    $('#folder').click(function(){
        $('main').css({"width":"50%",});
        $('h1').css({"font-size": "2rem",})
        $('#credits').css({"width": "calc(100% + 2rem)","margin": "-1rem 0 -5rem -1rem",})
        $('#browser').css({"transform": "translateX(50vw)",})
        $('#folder2').css({"transform": "translate(calc(50vw - 4px),5vw)",})
        $('#folder').css({"transform": "translate(calc(-44vw - 4px),5vw)","border-left":"3vw solid transparent",})
    });

    $('#folder2').click(function(){
        $('main').css({"width":"94%",});
        $('h1').css({"font-size": "3rem",})
        $('#credits').css({"width": "calc(100% + 6rem)","margin": "-1rem 0 -5rem -3rem",})
        $('#browser').css({"transform": "translateX(0)",})
        $('#folder2').css({"transform": "translate(-4px,5vw)",})
        $('#folder').css({"transform": "translate(-4px,5vw)","border-left":"3vw solid white",})
    });
    
});