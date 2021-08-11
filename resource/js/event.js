function toggle_menu(x) {
    x.classList.toggle('change_nav');
    document.body.classList.toggle('not_scroll');
}
function click_close(x){
    x.parentNode.classList.remove('expand');
}

window.onload=function(){

    var arr;
    var section_skill = document.getElementById('skill');
    var items = section_skill.querySelectorAll('article');
    var boxs = section_skill.getElementsByClassName('box');

    //json parsing
    fetch('resource/json/skills.json')
    .then((res)=>res.json())
    .then((data)=>{arr = data.skills;})
    .catch(error=>console.error(error));

    function setContent(kind, num) {
        var out = '';
        let pick = arr[items[kind].id][num]; //1:back-end, 1:c++
        
        pick.detail.forEach(string=>{out+='- '+string+'\n';});
        boxs[kind].children[1].innerText = out;
        boxs[kind].children[0].innerText = pick.title;

        for(let i=0; i<boxs.length; i++){
            if(i!=kind){boxs[i].classList.remove('expand');}
            else{boxs[i].classList.add('expand');}            
        }
    }
    
    //Add Event Listener
    for(let i=0; i<items.length; i++){
        for(let j=0; j<items[i].childElementCount-1; j++){
            items[i].children[j].addEventListener('click', function(){
                setContent(i, j);
            });
        }
    }

    //이미지 복사 금지
    var imgs = document.querySelectorAll('img');
    for(let i=0; i<imgs.length; i++){
        imgs[i].oncontextmenu = function(){return false};
        imgs[i].ondragstart = function(){return false};
    }
}
