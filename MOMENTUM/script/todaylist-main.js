const todayKey='todaylist';
let todayList=[];
const memo=document.querySelector('.top> #memo');
const memoInput=document.querySelector('.today-input');
const todayForm=document.querySelector('#todo');
const writeList=document.querySelector('#todo>input');
const todolist=document.querySelector('.todo-list');
const $span=document.querySelector('.x');
console.log($span);

function saveStorage() {
  const strlist = JSON.stringify(todayList);
  localStorage.setItem(todayKey, strlist);
}
const loadStorage=()=>{
  return localStorage.getItem(todayKey);
}
const storageTodayList=(Num,txt,flag)=>{
  const obj={id:Num, value:txt, check:flag};
  todayList.push(obj);
  saveStorage();
}

const handlerDel=(event)=>{
  const delId=event.target.parentElement.id;
  console.log(delId);
    todayList=todayList.filter((item)=>{
      return delId!=item.id;
    });
    event.target.parentElement.remove();
    saveStorage();
}
const updateCheckBox=(id,check)=>{
  todayList=todayList.map((item)=>{
    if(item.id==id){
      return {...item, check};
    }else{
      return item;
    }
  });
  saveStorage();
}
const handlerCheck=(event)=>{
  // console.log('click');
  const changeID=event.target.parentElement.id;
  //event.target: this와 같은 역할 (!외우기!지금 이벤트가 일어난 객체)
  const check= event.target.checked;
  // console.log(check);
  updateCheckBox(changeID,check);
}
const addTodoList=(id,value,check)=>{
  const $label=document.createElement('label');
  $label.id=id;
  const $input=document.createElement('input');
  $input.type='checkbox';
  $input.checked=check;
  $input.addEventListener('change',handlerCheck);
  const span=document.createElement('span');
  span.textContent=value;
  const $span=document.createElement('span');
  $span.textContent='x';
  $span.classList='x';
  $span.addEventListener('click',handlerDel);
  $label.appendChild($input);
  $label.appendChild(span);
  $label.appendChild($span);
  todolist.appendChild($label);
  storageTodayList(id,value,check);
}

const handlerTodoEnter=()=>{
  let value=writeList.value;
  writeList.value=null;
  addTodoList(Date.now(),value,false);
}

const today_init=()=>{
  todayForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    addTodoList();
  });
  memo.addEventListener(('click'),()=>{
    memoInput.classList.toggle('hidden');
  });
  writeList.addEventListener('keypress',(e)=>{
    if(e.key==='Enter'){
      e.preventDefault();
      handlerTodoEnter();
    }
  });
}

today_init();