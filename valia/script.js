$(document).ready(function(){

    $(".layer").each(function(){
        var theid = $(this).attr("id").split("l");
        const myArray = theid;
        var layer = myArray[1];
        var layernum = 5 - layer;
        console.log(layernum);
        $(this).css("z-index",layernum);

        $(document).scroll(function(){
            // grab the scroll amount and the window height
            var scrollAmount = $(window).scrollTop();
            var documentHeight = $(document).height();
    
            // calculate the percentage the user has scrolled down the page
            var scrollPercent = (scrollAmount / documentHeight) * 100;
    
            if(scrollPercent >= 5) {
                layernum ++;
                if (layernum <= 4) {
                    layernum = layernum;
                } else {
                    layernum = 1;
                }
                console.log(layernum);
            }
        });
        setInterval(() => {
            $(this).css("z-index",layernum);
        }, 10);
    });

});