let resultl = JSON.parse(localStorage.getItem('result')) || [];
  
  let gridd = document.querySelector('.gridd');
  let result = JSON.parse(localStorage.getItem('result')) || [];

reloadhistory();


document.querySelector('.clear').addEventListener('click', () => {
  localStorage.removeItem('result');
  gridd.innerHTML = '';
  reloadhistory();
})
  
function reloadhistory() {
  
 result = JSON.parse(localStorage.getItem('result')) ||[]

if (result.length ==0){
  gridd.innerHTML =`
  <div class="no-task">
  <img src="/images/8794579_3959808.svg" class="no-task">
  </div>
  `
} else {
resultl.forEach( (task)=>{
  let addtask = ` 
  
 <div class="task-box fade-in">
  <nav class="sec1">
    ${task.name}
 </nav>
  <nav class="sec33">
     deadline:
   <div class="a">${task.deadline}</div> <br>
    status:
    <div class="b">${task.taskStatus}</div> <br>
    feedback:
     <div class="c">${task.comment}</div><br>
 </nav>
   </div>  
  `
gridd.innerHTML += addtask
})
  
  }
}
  

  console.log(result)




