window.onload=function(){

    var img = document.getElementsByClassName("modal_img")[0];
    var title = document.getElementsByClassName("modal_title")[0];
    var detail = document.getElementsByClassName("modal_detail")[0];
    var items = document.getElementsByClassName("item");

    function modal(id) {
        var modal = document.getElementById(id);    
        var back_layer = document.createElement('div');
        back_layer.className='modal_back_layer';
        document.body.append(back_layer);

        // close event
        function close(){
            back_layer.remove();
            modal.style.display = 'none';
            img.src = "";
            title.innerText = "";
            detail.innerText = "";
        }
        back_layer.addEventListener('click', function() {
            close();
        });
        modal.querySelector('.modal_close_btn').addEventListener('click', function() {
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
        var url = "resource/json/skills.json";
    
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var arr = JSON.parse(xmlhttp.responseText);
                var content = arr[kind][num];
                img.src = content.img;
                title.innerText = content.title;
                detail.innerText = content.detail;
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    }
    
    //click event
    for(let i=0; i<items.length; i++){
        items[i].addEventListener('click', function() {
            content('Language', 0);
            modal('my_modal');
        });
    }
}

