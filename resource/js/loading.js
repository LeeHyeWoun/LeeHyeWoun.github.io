window.onload=function(){
    var layer = document.createElement('div');
    var opacity =0;
    var intervalID=0;

    layer.classList.add("layer");
    layer.setStyle({
        position: 'fixed',
        zIndex: '30',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'white'
    });
    document.body.append(layer);


    setTimeout(stop_loading(), 3000);

    async function stop_loading(){
        intervalID = await setInterval(fade_in,50);
        layer.remove();
    }
    
    function fade_in(){
        if(opacity<1){
            opacity = opacity+0.05;
            skills.style.opacity=opacity;
        }
        else{
            clearInterval(intervalID);
        }
    }
    
}

