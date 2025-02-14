const setDateSelect=(id,options)=>{
  const obj=document.querySelector('#'+id);
  options.forEach((value)=>{
    const elem= document.createElement('option');
    elem.value=value;
    elem.textContent=value;
    obj.appendChild(elem);
  });

}
const addSelectOption=()=>{
  //start,target select에 옵션을 추가
  //year: 1990~2050
  //month: 1~12
  //day: 1~31
  const years=Array.from({length:(2050-1990)+1},(_,i)=>{
    return i+1990;
  });
  setDateSelect('start-years',years);
  setDateSelect('target-years',years);
  const months=Array.from({length:12},(v,i)=>{
    return i+1;
  });
  setDateSelect('start-months',months);
  setDateSelect('target-months',months);
  const dates=Array.from({length:31},(_,i)=>{
    return  i+1;
  });
  setDateSelect('start-dates',dates);
  setDateSelect('target-dates',dates);
}
const setSelectValue=(id,value)=>{
  const elem=document.querySelector('#'+id);
  elem.value=value;
}
  //오늘 날짜로 세팅
const setTodayAsDefault=()=>{
  //오늘날짜정보
  const today=new Date();
  const year = today.getFullYear(); //년
  const month = today.getMonth()+1; //월:시작값 :0
  const date = today.getDate();   //일
  setSelectValue('start-years',year);
  setSelectValue('target-years',year);
  setSelectValue('start-months',month);
  setSelectValue('target-months',month);
  setSelectValue('start-dates',date);
  setSelectValue('target-dates',date);
}

const getCalcTime=(id)=>{
  return document.querySelector('#'+id).value;
  //const elem=document.querySelector('#'+id);
  //return elem.value;
}
const calculateTime=()=>{
  // console.log('button click'); //->버튼클릭되는지 콘솔확인.
  //시작시간 알아오기
  //시작시간을 알아와서 startStr에 저장
  const startDate= new Date(getCalcTime('start-years'),getCalcTime('start-months')-1,getCalcTime('start-dates'));
  //목표시간 알아오기
  //목표시간을 알아와서 targetStr에 저장
  const targetDate= new Date(getCalcTime('target-years'),getCalcTime('target-months')-1,getCalcTime('target-dates'));
  // console.log(startDate);
  console.log(targetDate);
  //남은시간 계산하기
  const today=new Date(); //오늘날짜
  const reTime=targetDate - today;
  //남은 날짜
  const reDays= Math.floor(reTime/(1000*60*60*24)); 
  const reHours=Math.floor((reTime%(1000*60*60*24))/(1000*60*60));
  const reMinutes=Math.floor((reTime%(1000*60*60))/(1000*60));
  const reSeconds=Math.floor((reTime%(1000*60))/(1000));
  document.querySelector('.n-days').textContent=`남은날짜:${reDays}일`;
  document.querySelector('.n-times').textContent=`남은시간:${reDays}일${reHours}시${reMinutes}분${reSeconds}초`;
  document.querySelector('.times').textContent=`현재날짜 : ${today.toLocaleString()}`;

}
const init=()=>{
    // console.log('init');
  // 처음 실행되는 함수
  //1.select에 option을 추가
  addSelectOption();
  //2.option에 현재 날짜로 보여지도록, 제일 하단에 현재 시간 표시
  setTodayAsDefault();
  //3.남은시간 계산
  //언제 실행이 될까? -> 결과보기 버튼을 클릭했을 때
  const $result=document.querySelector('button');
  $result.addEventListener('click',calculateTime);
  // calculateTime();
  setInterval(calculateTime,1000); //1초에 한번씩 실행
}
window.onload=init;