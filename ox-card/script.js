const updateResult=(ele,txt,bg)=>{
ele.textContent=txt;
ele.style.backgroundColor=bg;
}

const checkAnswer=(answer)=>{
const result = document.querySelector("p")
if(answer==true){
    updateResult(result,"정답입니다","green");
}else{
    updateResult(result,"틀렸습니다","black");
}
}


document.addEventListener("DOMContentLoaded",()=>{
    const oBtn=document.querySelector(".o");
    const xBtn=document.querySelector(".x");
    oBtn.addEventListener("click",()=>{checkAnswer(true)});
    xBtn.addEventListener("click",()=>{checkAnswer(false)});
});