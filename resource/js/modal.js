window.onload=function(){

    let id_modal = 'my_modal';
    let id_modal_layer = 'modal_layer';
    let url = "resource/json/skills.json";

    var skills = document.querySelector(".skill");
    var contains = document.getElementsByClassName("contain");
    var modal = document.getElementById(id_modal);    
    var modal_img = modal.querySelector('.modal_img');
    var modal_title = modal.querySelector('.modal_title');
    var modal_detail = modal.querySelector('.modal_detail');
    var modal_close = modal.querySelector('.modal_close_btn');
    var modal_left = modal.querySelector('.modal_left_btn');
    var modal_right = modal.querySelector('.modal_right_btn');
    var modal_layer;
    var arr;
    var opacity =0;
    var intervalID=0;
    var current_data=[0, 0];

    //json parsing
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{arr = data;})
    .then(function(){
        intervalID = setInterval(fade_in,50);
    })
    .catch(error=>console.error(error));

    function fade_in(){
		if(opacity<1){
			opacity = opacity+0.05;
			skills.style.opacity=opacity;
		}
		else{
			clearInterval(intervalID);
		}
    }


    function setContent(kind, num) {
        var content = arr[kind][num];

        modal_img.src = content.img;
        modal_title.innerText = content.title;
        
        var out ='';
        for(let i=0; i<content.detail.length; i++){
            out+=content.detail[i]+'\n';
        }
        modal_detail.innerText = out;

        setArrow();
    }

    function setArrow(){
        if(current_data[0] == 0){
            if(current_data[1] == 0){
                modal_left.style.display = 'none';
                return;
            }
        }
        else if(current_data[0] == contains.length-1){
            if(current_data[1] == contains[contains.length-1].childElementCount - 1 ){
                modal_right.style.display = 'none';
                return;
            }
        }
        modal_left.style.display = 'block';
        modal_right.style.display = 'block';
    }

    function open_modal() {
        //pop modal_layer
        modal_layer = document.createElement('div');
        modal_layer.id = id_modal_layer;
        document.body.append(modal_layer);

        //close modal
        modal_layer.addEventListener('click', function() {
            modal_layer.remove();
            modal.style.display = 'none';
        });
        modal_close.addEventListener('click', function() {
            modal_layer.remove();
            modal.style.display = 'none';
        });
    
        modal.setStyle({
            position: 'fixed',
            display: 'block',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            zIndex: 11,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            msTransform: 'translate(-50%, -50%)',
            webkitTransform: 'translate(-50%, -50%)'
        });
        
        if(matchMedia("prefers-color-scheme: dark").matches){
            modal.setStyle({
                boxShadow: 'none'
            });
        }
    }
    
    //set style
    Element.prototype.setStyle = function(styles) {
        for (var k in styles) this.style[k] = styles[k];
        return this;
    };
    
    //click event
    for(let i=0; i<contains.length; i++){
        for(let j=0; j<contains[i].childElementCount; j++){
            contains[i].children[j].addEventListener('click', function(){
                current_data = [i, j];
                setContent(contains[i].id, j);
                open_modal();
            });
        }
    }

    modal_left.addEventListener('click', function(){
        var num_kind = current_data[0];
        var num_value = current_data[1];

        num_value--;

        if(num_value < 0 ){
            if(num_kind <= 0){ return; }

            num_kind--;
            num_value = contains[num_kind].childElementCount - 1;
        }

        current_data = [num_kind, num_value];
        setContent(contains[num_kind].id, num_value);
    });

    modal_right.addEventListener('click', function(){
        var num_kind = current_data[0];
        var num_value = current_data[1];

        num_value++;

        if(num_value > contains[num_kind].childElementCount - 1 ){
            if(num_kind >= contains.length - 1){ return; }

            num_kind++;
            num_value = 0;
        }

        current_data = [num_kind, num_value];
        setContent(contains[num_kind].id, num_value);
    });
}

