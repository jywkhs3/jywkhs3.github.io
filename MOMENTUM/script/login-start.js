const welcome=document.querySelector('#welcome');
const startPage=document.querySelector('#start');
const loginForm=document.querySelector('#loginName');
const input=document.querySelector('input');
const main=document.querySelector('main');
const goodname=document.querySelector('.c-txt>.name');
const logout=document.querySelector('.bottom>i:nth-of-type(2)');
// console.log(goodname);

const loginKey='loginname';
const saveLoginName=(strInput)=>{
  localStorage.setItem(loginKey,strInput);
}
const loadLoginName=()=>{
  return localStorage.getItem(loginKey);
}

const printLoginName=(strName)=>{
  if (!strName)return;
  goodname.textContent=`"${strName}"`;
  main.style.display=('block');
  startPage.style.display=('none');
  welcome.style.display=('none');
}
const handlerSubmit=(event)=>{
  event.preventDefault();
  const userName = input.value.trim();
  if(userName === '') return;
  printLoginName(userName);
  saveLoginName(userName);
  input.value='';
}
const init=()=>{
  //처음 실행되는 함수
  let loginName=loadLoginName();
  if(loginName){
    printLoginName(loginName);
  }else{
    //윈도우 첫 실행시 나타나는 화면
    welcome.style.display = 'block';
    startPage.style.display = 'none';
    main.style.display = 'none';

    loginForm.addEventListener('submit',handlerSubmit);
  }
  welcome.addEventListener('click',()=>{
    console.log('click');
    welcome.style.display=('none');
    startPage.style.display=('block');
    main.style.display=('none');
  });
  logout.addEventListener('click',()=>{
    localStorage.removeItem(loginKey);
    welcome.style.display=('block');
    startPage.style.display=('none');
    main.style.display=('none');
  });
  printLoginName();
}
  window.onload=init;