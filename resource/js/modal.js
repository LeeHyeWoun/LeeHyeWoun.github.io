function changeModalText(kind, num) {
    var xmlhttp = new XMLHttpRequest();
    var url = "resource/json/skills.json";

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(xmlhttp.responseText);
            document.getElementsByClassName("modal_img").setAttribute('src') = arr[kind][num].img;
            document.getElementsByClassName("modal_title")[0].innerText = arr[kind][num].title;
            document.getElementsByClassName("modal_detail")[0].innerText = arr[kind][num].detail;
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
 
window.onload=function(){
    function modal(id) {
        var zIndex = 10;
        var modal = document.getElementById(id);
    
        var back_layer = document.createElement('div');
        back_layer.setStyle({
            position: 'fixed',
            zIndex: zIndex,
            left: '0px',
            top: '0px',
            width: '100vw',
            height: '100vh',
            overflow: 'auto',
            backgroundColor: 'rgba(0,0,0,0.4)'
        });
        document.body.append(back_layer);

        // close event
        back_layer.addEventListener('click', function() {
            back_layer.remove();
            modal.style.display = 'none';
        });
        modal.querySelector('.modal_close_btn').addEventListener('click', function() {
            back_layer.remove();
            modal.style.display = 'none';
        });
    
        modal.setStyle({
            position: 'fixed',
            display: 'block',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            zIndex: zIndex + 1,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            msTransform: 'translate(-50%, -50%)',
            webkitTransform: 'translate(-50%, -50%)'
        });
    }
    
    // Element 에 style 한번에 오브젝트로 설정하는 함수 추가
    Element.prototype.setStyle = function(styles) {
        for (var k in styles) this.style[k] = styles[k];
        return this;
    };
    
    //아이템 클릭 시 모달 띄우기
    var items = document.getElementsByClassName("item");
    for(let i=0; i<items.length; i++){
        items[i].addEventListener('click', function() {
            modal('my_modal');
        });
    }
}

