import {schedule as ogschedule} from '../task.js'
console.log('Hello World!');
let name = document.querySelector('.nameInput')
let info = document.querySelector('.infoInput')
let deadline = document.querySelector('.deadlineInput')

let schedule = JSON.parse(localStorage.getItem('schedule')) || ogschedule;

console.log(schedule)


function getNewId() {
  if (schedule.length === 0){
    return 1;
  }else {
    return schedule[schedule.length-1].id +1
  }
}


  document.querySelector('.submit')
  .addEventListener('click', ()=>{
  
    let newSchedule ={
      id : getNewId(),
      name : name.value,
      deadline: deadline.value,
      info: info.value
    }
    
    schedule.push(newSchedule)
    reloadSchedule()
    localStorage.setItem('schedule',JSON.stringify(schedule));
    console.log(schedule)
    
  })


function reloadSchedule(){
localStorage.getItem('schedule')

let taskLayout = document.querySelector('.task-layout')
taskLayout.innerHTML = '';
  
  schedule.forEach((schedule)=>{ 
    taskLayout.innerHTML += `
     <nav class="task-box"> 
<div class="sec1">
     <div class="name">${schedule.name}</div>
     <div class="deadline">${schedule.deadline}</div>
</div>
 <div class="sec2">
    <div class="info">${schedule.info}
    </div>
    <div class="btns">
      <button data-schedule-id ="${schedule.id} class="pass">completed
      </button>
      <button data-schedule-id ="${schedule.id} class="fail">failed
      </button>
    </div>
 </div>
  </nav>
    `
  })
  
   
  
  
}
reloadSchedule()