import {schedule as ogschedule, result as resultt} from '../task.js'
// variable names 
console.log('Hello World!');

let taskLayout = document.querySelector('.task-layout');
let name = document.querySelector('.nameInput')
let info = document.querySelector('.infoInput')
let deadline = document.querySelector('.deadlineInput')
let popup = document.querySelector('.popup')
let modal = document.querySelector('.modal')


let schedule = JSON.parse(localStorage.getItem('schedule')) || ogschedule;

let result = JSON.parse(localStorage.getItem('result')) || [];


console.log('result-  ', result)
//-------------&&&&&&&----------------//
//--------------&&&&&&&---------------//


// assigns new id for each new task entered
function getNewId() {
  if (schedule.length === 0){
    return 1;
  }else {
    return schedule[schedule.length-1].id +1
  }
}


//-------------&&&&&&&----------------//
//--------------&&&&&&&---------------//
document.querySelector('.add-input')
.addEventListener('click', ()=>{
  popup.classList.add('switch')
  modal.classList.add('slide-up')
})


document.querySelector('.popup')
.addEventListener('click', ()=>{
  popup.classList.remove('switch')
  modal.classList.remove('slide-up')

})


//-------------&&&&&&&----------------//
//-------------&&&&&&&----------------//


// this submit adds the task to dom
document.querySelector('.submit')
  .addEventListener('click', ()=>{
  
    let newSchedule ={
      id : getNewId(),
      name : name.value,
      deadline: deadline.value,
      info: info.value,
      comment:''
    }
    
    if(!info.value || !name.value || !deadline.value){
      alert('Enter all fields')
    }else{
      schedule.push(newSchedule)

    }
    
    
    localStorage.setItem('schedule',JSON.stringify(schedule));
    reloadSchedule()
    console.log(schedule)
    
//makes input bars to reset
  name.value  = '';
  info.value  = '';
  deadline.value  = '';
  
  popup.classList.remove('switch');
  })
  

//--------------&&&&&&&---------------//
//--------------&&&&&&&---------------//



// function to clear the screen 
// this clear removes all from dom

document.querySelector('.clear').addEventListener('click', ()=>{
  taskLayout.innerHTML = '';
  localStorage.removeItem('schedule');
  localStorage.removeItem('result');
  schedule=[];
  result = [];
  reloadSchedule();
})


//-------------&&&&&&&----------------//
//--------------&&&&&&&---------------//


// this function adds new input task to dom 
function reloadSchedule(){
let routine = JSON.parse(localStorage.getItem('schedule')) ||[]

if (routine.length == 0) {
  taskLayout.innerHTML = `
  <div class="no-task">
  <img src="/images/poki.png" class="no-task">
  </div>
  `
} else{

taskLayout.innerHTML = '';
  
  routine.forEach((schedule)=>{ 
    taskLayout.innerHTML += `
  <div class="task-box fade-in">
    <div class="sec1">
      ${schedule.name}
    </div>
    <div class="sec2">
      Duetime: ${schedule.deadline}
    </div>
    <div class="sec3">
      <nav class="info">Descripton:${schedule.info}</nav>
      <nav class="interact">
        <button data-schedule-id="${schedule.id}"
        class="pass">Completed</button>
        
        <button data-schedule-id="${schedule.id}" 
        class="fail"> Failed</button>
      </nav>
    </div>
  </div>

    `
    })
}
}

reloadSchedule()

//-------------&&&&&&&---------------//
//-------------&&&&&&&---------------//



  
  
//-------------&&&&&&&---------------//
//-------------&&&&&&&---------------//
let overlay = document.querySelector('.overlay')
let btnId ;
let taskStatus;



document.addEventListener('click',(event) =>{
  
  if (event.target.classList.contains('pass')) {
  btnId =event.target.dataset.scheduleId
  taskStatus = 'Completed';
  overlay.classList.add('show')
}
else if(event.target.classList.contains('fail')){
  btnId =event.target.dataset.scheduleId
  taskStatus = 'Failed';
  overlay.classList.add('show')
  
} else if (event.target.classList.contains('feedback-submit')){
  overlay.classList.remove('show')
  
  let comment = document.querySelector('.cmnt-box')
  
  let matched = null ;
  
  for (let i=0; i<schedule.length; i++){ 
    if (schedule[i].id=== Number(btnId)){
      matched = schedule[i] 
      break;
    } 
  }
  if(matched !== null){
    result.push({...matched,
    comment:comment.value,
    taskStatus})
  }
  console.log('res:', result)

  localStorage.setItem('result', JSON.stringify(result))
  
  let updated =[];
  for(let i=0; i<schedule.length;i++){
    if(schedule[i].id !== Number(btnId)){
      updated.push(schedule[i])
    }
  }
  schedule = updated
  localStorage.setItem('schedule',JSON.stringify(schedule))
  reloadSchedule()
}














  
})



/*
else if (event.target.classList.contains('feedback-submit')){
   overlay.classList.remove('show');
   let comment = document.querySelector('.cmnt-box')
   
   
   
   schedule.forEach((routine) => {
     let removeId = Number(btnId)

  let matchedTask = schedule.find(task => task.id === removeId);


if (matchedTask) {   
    result.push({
      ...routine,
      comment: comment.value,
      status: taskStatus
    });
    localStorage.setItem('result', JSON.stringify(result))
    

    schedule = schedule.filter( task =>task.id !== removeId)

  localStorage.setItem('schedule', JSON.stringify(schedule));
  reloadSchedule();
  
  
  }console.log(result)

  

  
  
  
});

   
  

  

}
  */
