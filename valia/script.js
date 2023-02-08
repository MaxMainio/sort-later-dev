$(document).ready(function(){

    $(".layer").each(function(){
        var theid = $(this).attr("id").split("l");
        const myArray = theid;
        var layer = myArray[1];
        var layernum = 5 - layer;
        console.log(layernum);
        $(this).css("z-index",layernum);

        $("#prior").click(function(){
                layernum --;
                if (layernum >= 1) {
                    layernum = layernum;
                } else {
                    layernum = 4;
                }
                console.log(layernum);
            });

        $("#later").click(function(){
            layernum ++;
            if (layernum <= 4) {
                layernum = layernum;
            } else {
                layernum = 1;
            }
            console.log(layernum);
        });

        setInterval(() => {
            $(this).css("z-index",layernum);
        }, 10);
    });

});