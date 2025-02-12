const clock=document.querySelector('h2');
// console.log(clock);
//현재시간
const getClock=()=>{
  const today=new Date();
  const hours=String(today.getHours()).padStart(2,'0');
  const minutes=String(today.getMinutes()).padStart(2,'0');
  const seconds=String(today.getSeconds()).padStart(2,'0');
  clock.textContent=`${hours}:${minutes}:${seconds}`;
  sunTime(today);
}
getClock();
setInterval(getClock,1000);