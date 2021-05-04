window.onload=function(){

    let id_modal = 'my_modal';
    let url = "resource/json/skills.json";

    var modal = document.getElementById(id_modal);    
    var modal_img = modal.querySelector('.modal_img');
    var modal_title = modal.querySelector('.modal_title');
    var modal_detail = modal.querySelector('.modal_detail');
    var modal_close = modal.querySelector('.modal_close_btn');
    var items = document.getElementsByClassName("item");

    function popup_modal() {
        var back_layer = document.createElement('div');
        
        back_layer.className='modal_back_layer';
        document.body.append(back_layer);

        // close event
        function close(){
            back_layer.remove();
            modal.style.display = 'none';
            modal_img.src = "";
            modal_title.innerText = "";
            modal_detail.innerText = "";
        }
        back_layer.addEventListener('click', function() {
            close();
        });
        modal_close.addEventListener('click', function() {
            close();
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
    }
    
    //set style
    Element.prototype.setStyle = function(styles) {
        for (var k in styles) this.style[k] = styles[k];
        return this;
    };

    function content(kind, num) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var arr = JSON.parse(xmlhttp.responseText);
                var content = arr[kind][num];
                modal_img.src = content.img;
                modal_title.innerText = content.title;
                modal_detail.innerText = content.detail;
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
    
    //click event
    for(let i=0; i<items.length; i++){
        items[i].addEventListener('click', function() {
            content('Language', 0);
            popup_modal();
        });
    }
}

