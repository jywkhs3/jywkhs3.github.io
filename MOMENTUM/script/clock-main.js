const clock=document.querySelector('h2');
const goodText = document.querySelector('main> .center> .c-txt> .hello');
// console.log(goodText);
//현재시간
const getClock=()=>{
  const today=new Date();
  const hours=String(today.getHours()).padStart(2,'0');
  const minutes=String(today.getMinutes()).padStart(2,'0');
  const seconds=String(today.getSeconds()).padStart(2,'0');
  clock.textContent=`${hours}:${minutes}:${seconds}`;
  sunTime(today);
}
const greetingTxt =()=>{
  const current = new Date();
  const hours = current.getHours();
  let greeting='';

  if(hours >= 6 && hours < 12 ){
    greeting='Good morning,';
  } else if( hours >= 12 && hours < 18){
    greeting = 'Good afternoon,';
  }
  else if( hours >= 18 && hours < 21){
    greeting = 'Good evening,';
  }
  else{
    greeting = 'Good night,';
  }
  goodText.textContent = greeting;
};
greetingTxt();
getClock();
setInterval(getClock,1000);