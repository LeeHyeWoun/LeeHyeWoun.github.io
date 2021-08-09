function toggle_menu(x) {
    x.classList.toggle("change_nav");
    document.body.classList.toggle('not_scroll');
}
function click_close(x){
    x.parentNode.classList.remove("expand");
}

window.onload=function(){

    let url = "resource/json/skills.json";

    var skill = document.getElementById('skill');
    var contains = skill.querySelectorAll("article");
    var boxs = skill.getElementsByClassName('box');
    var arr;

    //json parsing
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        arr = data.skills;
    })
    .catch(error=>console.error(error));


    function setContent(kind, num) {
        var content = arr[contains[kind].id][num]; //0:languege, 1:c++

        boxs[kind].children[0].innerText = content.title;
        var out = content.detail[0]+'\n\n';
        for(let i=1; i<content.detail.length; i++){
            out+='- '+content.detail[i]+'\n';
        }
        boxs[kind].children[1].innerText = out;

    }

    
    //Add Event Listener
    for(let i=0; i<contains.length; i++){
        for(let j=0; j<contains[i].childElementCount-1; j++){
            contains[i].children[j].addEventListener('click', function(){
                setContent(i, j);
                boxs[i].classList.add("expand");
                for(let k=0; k<boxs.length; k++){
                    if(k==i){continue;}
                    boxs[k].classList.remove("expand");
                }
            });
        }
    }

}
