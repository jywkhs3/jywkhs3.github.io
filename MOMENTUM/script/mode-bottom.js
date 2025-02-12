
const modeKey='mode';
const modeBtn=document.querySelector('.bottom>i:nth-of-type(1)');
// console.log(modeBtn);
const darkMode=()=>{
  localStorage.setItem(modeKey,'dark');
}
const lightMode=()=>{
  localStorage.setItem(modeKey,'light');
}
const loadMode=()=>{
  return localStorage.getItem(modeKey);
}
modeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('light');
  if(document.body.classList.contains('light')){
    lightMode();
  }else{
    darkMode();
  }
});

const mode_init=()=>{
  let mode=loadMode();
  if(mode){
    document.body.classList.remove('dark');
    document.body.classList.remove('light');
  }else{
    document.body.classList.add('dark');
  }
}
mode_init();