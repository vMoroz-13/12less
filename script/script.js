'use strict';

const
todoControl = document.querySelector('.todo-control'),
headerInput = document.querySelector('.header-input'),
todoList = document.querySelector('.todo-list'),
todoCompleted = document.querySelector('.todo-completed'),
headerButton = document.querySelector('.header-button'),
todo = document.querySelector('.todo'),
completed = document.querySelector('.completed');

let todoData = [];
  if(localStorage.getItem('keyV')){
     todoData = JSON.parse(localStorage.getItem('keyV'));
  }
const appDateToLocalSt = function(){
    localStorage.setItem('keyV',JSON.stringify(todoData));
    console.log(localStorage.getItem('keyV'));
    
};

 const itemRemove = function(el){
     const item = el.parentNode.parentNode;
     const itemParent =item.parentNode;
     const id = itemParent.id;
     const text =item.textContent;
     console.log(id);
     todoData.splice(todoData.indexOf(text), 1);
   
     itemParent.removeChild(item);
     appDateToLocalSt();
 };

let render = ()=>{

    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach((item,i)=>{
        const li = document.createElement('li');
        li.classList.add('todo-item');
			
            li.innerHTML = `
                <span class="text-todo">${item.value}</span>
			    <div class="todo-buttons">
				<button class="todo-remove"></button>
                <button class="todo-complete"></button>
                </div>
            `;
            (item.completed) ? todoCompleted.append(li) : todoList.append(li);
             
           const todoComplete = li.querySelector('.todo-complete');
           todoComplete.addEventListener('click',()=>{
               item.completed = !item.completed;
               render();
               appDateToLocalSt();
           });
           // 5) Удаление дел на кнопку КОРЗИНА
           const todoRemove = li.querySelector('.todo-remove');
           todoRemove.addEventListener('click',(e)=>{
            
                 itemRemove(e.target);                 
           });           
    });     
};

todoControl.addEventListener('submit',(event)=>{
    event.preventDefault();
    
    //3) Пустые дела добавляться не должны

    const newTodo = {
        value: headerInput.value,
        completed: false
    };
    if(newTodo.value === ''){
        return;
    }
    todoData.push(newTodo);
    render();
   // localStorage.setItem('keyV',JSON.stringify(todoData));
    //4)Поле ввода после добавления дела должно очищаться
    headerInput.value ='';
    appDateToLocalSt();

});

render();