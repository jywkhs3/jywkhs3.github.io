//객체 불러오기
const prevBtn=document.querySelector('.prev');
const nextBtn=document.querySelector('.next');
const imgSlider=document.querySelector('ul');
const circle=document.querySelector('.circle');
const startBtn=document.querySelector('.player>button:nth-child(1)');
const stopBtn=document.querySelector('.player>button:nth-child(2)');
//변수 설정
let current=1; //슬라이드 시작값.
const SLIDE_COUNT=imgSlider.childElementCount; //5 (1~5)
const TOTAL=SLIDE_COUNT+2; //이미지 슬라이드 총갯수
const img_Width=document.querySelector('.slide').clientWidth;
let loopID=null;

startBtn.addEventListener('click',()=>{
  if(loopID===null){
    loopID=setInterval(handlerNextBtn,1000);
    prevBtn.disabled=true;
    nextBtn.disabled=true;
  }
});
stopBtn.addEventListener('click',()=>{
  clearInterval(loopID);
  loopID=null;
  prevBtn.disabled=false;
  nextBtn.disabled=false;
});
//이미지 사이즈-이동거리
const updateSlidPos=(idx)=>{
  imgSlider.style.transition='0.5s';
  imgSlider.style.transform=`translateX(-${img_Width*idx}px)`;
}

const resetSlidePos=(idx)=>{
  setTimeout(()=>{
    imgSlider.style.transition='none';
    imgSlider.style.transform=`translateX(-${img_Width*idx}px)`;
    },500);
}

//prev 버튼 클릭 핸들러
prevBtn.addEventListener('click',()=>{
  current--;
  updateSlidPos(current);
  // if(current===0){
  //   current=SLIDE_COUNT;
  // }
  if(current<1){
    current=SLIDE_COUNT;
    resetSlidePos(current);
  }
  updateDot();
  // if(current<1){
  //   current=SLIDE_COUNT;
  // }
  // console.log(current);
});

//next 버튼 클릭 핸들러
const handlerNextBtn=()=>{
    current++;
    updateSlidPos(current);
    // if(current===TOTAL-1){
    //   current=1;
    //   resetSlidePos(current);
    // }
    if(current>SLIDE_COUNT){
      current=1;
      resetSlidePos(current);
    }
    updateDot();
    // if(current>SLIDE_COUNT){
    //   current=1;
    // }
    // console.log(current);
}
nextBtn.addEventListener('click',handlerNextBtn);

const updateDot=()=>{
  const elem=document.querySelector('.active');
  // console.log(elem);
  if(elem !== null){
    elem.classList.remove('active');
  }
  circle.children[current-1].classList.add('active');
}
const createDot=()=>{
  //1.부모
  for(let i=0; i<SLIDE_COUNT; i++){
    const elem=document.createElement('span');
    elem.className='dot';
    circle.appendChild(elem);
  }
}

//1번이미지 앞에 5번이미지 복사하기
const cloneSlide= ()=>{
  //자식 객체 불러오기
  const slides=imgSlider.children;
  //cloneNode: 첫번째 이미지, 마지막 이미지 복사
  const first=slides[0].cloneNode(true);  //true(깊은복사): 전체 다 복제, false(얕은복사): 자신만 복제
  const last=slides[SLIDE_COUNT-1].cloneNode(true);
  // console.log(first);
  // console.log(last);
  //1번 앞에 5번이 오도록:prepend(맨앞에) 
  imgSlider.prepend(last);
  // imgSlider.insertBefore
  //5번 앞에 1번이 오도록:append(맨뒤에)
  imgSlider.appendChild(first); //append 로 입력 가능
}
const setCssValue=()=>{
  //css의 변수값 가져오기
  let result=getComputedStyle(document.documentElement).getPropertyValue('--COUNT');
  // console.log(result);
  document.documentElement.style.setProperty('--COUNT',`${TOTAL}`);
}

const init=()=>{
  //처음 실행되는 함수
  createDot();
  updateDot();
  cloneSlide();
  setCssValue();
  //슬라이드 초기 위치 설정
  imgSlider.style.transform=`translateX(-${img_Width}px)`;
}

window.onload=init;