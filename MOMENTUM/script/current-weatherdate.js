/***
 * KEY= 71b12e2244f4df53148d3ada9b89fed9
 */
const temp=document.querySelector('#weather>.temp');
const currentMap=document.querySelector('#weather>.current');
const sunsetrise=document.querySelector('.sunsetrise');
const currentDate=document.querySelector('.currentdate');
const bottomDate=document.querySelector('.b-dates>p:nth-of-type(2)');
const bottomDay=document.querySelector('.b-dates>p:nth-of-type(1)');
let sunrise;
let sunset;

//현재날짜
const toDay=()=>{
  const currentDay= new Date();
  const Days=['(일)','(월)','(화)','(수)','(목)','(금)','(토)'];
  // console.log(currentDay);
  const years=String(currentDay.getFullYear());
  const months=String(currentDay.getMonth()+1); //월 +1
  const dates=String(currentDay.getDate()); //일
  const daysnum=String(currentDay.getDay()); //요일 0,1,2,3,4,5,6
  strDays=Days[daysnum]; //요일 문자
  currentDate.textContent=`${months}-${dates}${strDays}`;
  bottomDate.textContent=`${years}-${months}-${dates}`;
  bottomDay.textContent=`${strDays}`;
}

const success=(position)=>{
  const lat=position.coords.latitude;
  const lon=position.coords.longitude;
  const apiKey=`71b12e2244f4df53148d3ada9b89fed9`;
  let url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  console.log(url);
  fetch(url).then((response)=>{
    return response.json();
  }).then((data)=>{
    console.log(data);
    // console.log(data.name); // 현재위치
    // console.log(Math.floor(data.main.temp-273.15)); //현재온도
    temp.textContent=`${Math.floor(data.main.temp-273.15)}℃`;
    currentMap.textContent=`${data.name}`;
    sunrise= new Date(data.sys.sunrise*1000);
    sunset= new Date(data.sys.sunset*1000);
    // console.log(sunrise);
    // console.log(sunset);
  });
}
//일출,일몰시간계산
const sunTime=(current)=>{
  if(sunrise<current){
    // sunsetrise.textContent=`${sunset}`;
  }
}
const handlerWeather=(e)=>{
  temp.classList.toggle('hidden');
  currentMap.classList.toggle('hidden');
}
const error=()=>{
  console.log('error');
}

const weather_Init=()=>{
  if(!navigator.geolocation){
    console.log('현재위치를 가져올 수 없습니다');
  }else{
    console.log('위치 파악 중');
    navigator.geolocation.getCurrentPosition(success,error);
  }
  //날씨아이콘 클릭
  const weatherIcon=document.querySelector('#weather>i');
  weatherIcon.addEventListener('click',(event)=>{
    event.preventDefault();
    handlerWeather(event);
  });
  toDay();
}
weather_Init();