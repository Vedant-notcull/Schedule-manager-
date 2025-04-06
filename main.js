import {schedule as ogschedule} from '../task.js'
// variable names 
console.log('Hello World!');
let taskLayout = document.querySelector('.task-layout');
let name = document.querySelector('.nameInput')
let info = document.querySelector('.infoInput')
let deadline = document.querySelector('.deadlineInput')

let schedule = JSON.parse(localStorage.getItem('schedule')) || ogschedule;

console.log(schedule)


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


// this submit adds the task to dom
document.querySelector('.submit')
  .addEventListener('click', ()=>{
  
    let newSchedule ={
      id : getNewId(),
      name : name.value,
      deadline: deadline.value,
      info: info.value
    }
    
    schedule.push(newSchedule)
    localStorage.setItem('schedule',JSON.stringify(schedule));
    reloadSchedule()
    console.log(schedule)
    
//makes input bars to reset
  name.value  = '';
  info.value  = '';
  deadline.value  = '';
  })
  

//--------------&&&&&&&---------------//
//--------------&&&&&&&---------------//



// function to clear the screen 
// this clear removes all from dom
document.querySelector('.clear').addEventListener('click', ()=>{
  taskLayout.innerHTML = '';
  localStorage.removeItem('schedule');
  schedule=[];
  reloadSchedule();
})


//-------------&&&&&&&----------------//
//--------------&&&&&&&---------------//


// this function adds new input task to dom 
function reloadSchedule(){
let routine = JSON.parse(localStorage.getItem('schedule')) ||[]

taskLayout.innerHTML = '';
  
  routine.forEach((schedule)=>{ 
    taskLayout.innerHTML += `
  <div class="task-box">
    <div class="sec1">
      ${schedule.name}
    </div>
    <div class="sec2">
      Duetime: ${schedule.deadline}
    </div>
    <div class="sec3">
      <nav class="info">Descripton:${schedule.info}</nav>
      <nav class="interact">
        <button class="pass">completed</button>
        <button class="fail"> Failed</button>
      </nav>
    </div>
  </div>

    ` })
}
reloadSchedule()

//-------------&&&&&&&---------------//
//-------------&&&&&&&---------------//

let popup = document.querySelector('.popup')

document.querySelector('.add-input')
.addEventListener('click', ()=>{
  popup.classList.add('switch')
})

document.querySelector('.popup')
.addEventListener('click', ()=>{
  popup.classList.remove('switch')
})