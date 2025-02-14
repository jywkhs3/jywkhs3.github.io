let currentImg=0;
const $ul=document.querySelector('.slide>ul');
console.log($ul.childElementCount);
const LIST_COUNT=$ul.childElementCount-1;
const nextBtn=document.querySelector('.next');
const prevBtn=document.querySelector('.prev');
const $slide=document.querySelector('.slide');
console.log(`slide with${$slide.clientWidth}, height=${$slide.clientHeight}`);
const IMG_WIDTH=$slide.clientWidth;

const updateDotActive=()=>{
  //1.$ul자식 중에 active클래스를 가진 자식에서 클래스 삭제
  const elem=document.querySelector('.active');
  elem.classList.remove('active');
  //2.클래스dot들 중에서 currentImg값을 가진 dot에게 active 클래스 추가
  const dot=document.querySelectorAll('.dot');
  dot[currentImg].classList.add('active');
}
const handlerPrevBtn=()=>{
  //이전 버튼 클릭했을 때
  // console.log('이전버튼클릭');
  //currentImg 5>4>3>2>1 prev버튼을 눌러도 1에서 유지
  currentImg--;
  if(currentImg<0){
    currentImg=0;
    prevBtn.disabled=true;
  }
  nextBtn.disabled=false;
  // console.log(currentImg);
  $ul.style.transform=`translateX(-${currentImg*IMG_WIDTH}px)`;
  updateDotActive();
}
const handlerNextBtn=()=>{
  //다음 버튼 클릭했을 때
  // console.log('다음버튼클릭');
  // transform:translateX(-300px) 300 600 900 1200 1500
  //currentImg 1>2>3>4>5 next버튼 눌러도 5에서 유지
  currentImg++;
  if(currentImg>LIST_COUNT){
    currentImg=LIST_COUNT;
    nextBtn.disabled=true;
  }
  // console.log(currentImg);
  prevBtn.disabled=false;
  $ul.style.transform=`translateX(-${currentImg*IMG_WIDTH}px)`;
  updateDotActive();
}

const updateDotImage=(idx)=>{
  currentImg=idx;
  $ul.style.transform=`translateX(-${currentImg*IMG_WIDTH}px)`;
  updateDotActive();
  if(currentImg===0){
    prevBtn.disabled=true;
    nextBtn.disabled=flase;
  }else if(currentImg===LIST_COUNT){
    prevBtn.disabled=false;
    nextBtn.disabled=true;
  }else{
    prevBtn.disabled=false;
    nextBtn.disabled=flase;
  }
}

//div.circle부모 안에 span자식요소 넣기
//<span></span> 도트 만들기!
const createDot=()=>{
  //1.부모요소 div 객체불러오기
  const circle=document.querySelector('.circle');
  // console.log(circle);
  //2.span 이라는 자식요소 생성하기
  //$ul의 자식인 이미지의 데이터를 가진 함수명으로,for문으로 객체 생성
  for(let i=0; i<=LIST_COUNT; i++){
    const elem=document.createElement('span');
    //첫번째 span자식요소에는 클래스 두가지를 넣고, 나머지는 클래스 하나만 넣기
    if(i===0){
      elem.className='dot active';
    }else{
      elem.className='dot';
    }
    elem.addEventListener('click',()=>{
      updateDotImage(i);
    });
    circle.appendChild(elem);
  }
}
const init=()=>{
  createDot();
  //처음실행되는 함수
  //1.다음 버튼 클릭했을 때
  nextBtn.addEventListener('click',handlerNextBtn);
  prevBtn.addEventListener('click',handlerPrevBtn);
}
window.onload=init;