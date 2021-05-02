function changeModalText(skill_name) {

    let title = document.getElementsByClassName("modal_title")[0];
    
    switch(skill_name){
        case 0:
            title.innerText="c언어";
            break;
        case 1:
            title.innerText="c++";
            break;
        case 2:
            title.innerText="c#";
            break;
        case 3:
            title.innerText="java";
            break;
        default:
            title.innerText=skill_id;
            break;
    }
 }
 
window.onload=function(){
    function modal(id) {
        var zIndex = 9999;
        var modal = document.getElementById(id);
    
        // 모달 배경 레이어
        var bg = document.createElement('div');
        bg.setStyle({
            position: 'fixed',
            zIndex: zIndex,
            left: '0px',
            top: '0px',
            width: '100%',
            height: '100%',
            overflow: 'auto',
            backgroundColor: 'rgba(0,0,0,0.4)'
        });
        document.body.append(bg);
    
        // 닫기 이벤트
        modal.querySelector('.modal_close_btn').addEventListener('click', function() {
            bg.remove();
            modal.style.display = 'none';
        });
    
        modal.setStyle({
            position: 'fixed',
            display: 'block',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    
            // 모달 배경 레이어 위에 모달 보이기
            zIndex: zIndex + 1,
    
            // div center 정렬
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
