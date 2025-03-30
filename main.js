import {schedule} from '../task.js'
console.log('Hello World!');

let name = document.querySelector('.nameInput')
let info = document.querySelector('.infoInput')
let deadline = document.querySelector('.deadlineInput')


function getNewId() {
  if (schedule.length === 0){
    return 1;
  }else {
    return schedule[schedule.length-1].id +1
  }
}

function addTask(){
  document.querySelector('.submit')
  .addEventListener('click', ()=>{
    let newSchedule ={
      id : getNewId(),
      name : name.value,
      deadline: deadline.value,
      info: info.value
    }
    
    schedule.push(newSchedule)
    localStorage.setItem('schedule',JSON.stringify(schedule))
  })
}

function reloadSchedule(){
  document.querySelector('.task-layout')
  .innerHTML += `
    <nav class="task-box"> 
<div class="sec1">
     <div class="name">${schedule.name}</div>
     <div class="deadline">${schedule.deadline}</div>
</div>
 <div class="sec2">
    <div class="info">${schedule.info}
    </div>
    <div class="btns">
      <button class="pass">completed
      </button>
      <button class="fail">failed
      </button>
    </div>
 </div>
  </nav>
  `
  
  
}