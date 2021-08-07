function toggle_menu(x) {
    x.classList.toggle("change_nav");
    document.body.classList.toggle('not_scroll');
}

window.onload=function(){

    let url = "resource/json/skills.json";

    var skill = document.getElementById('skill');
    var contains = skill.getElementsByClassName("contain");
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
        var out = "";
        for(let i=0; i<content.detail.length; i++){
            out+=content.detail[i]+'\n';
        }
        boxs[kind].children[1].innerText = out;

    }

    
    //Add Event Listener
    for(let i=0; i<contains.length; i++){
        for(let j=0; j<contains[i].childElementCount-1; j++){
            contains[i].children[j].addEventListener('click', function(){
                setContent(i, j);
                boxs[i].classList.add("expand");
            });
        }
    }

}
