'use strict'

console.log('Hi');


function onInit() {
    renderTodos();
}


function renderTodos() {
    var strHTML = ''
    var todos = getTodosForDisplay();

    if (todos.length === 0) {
        strHTML+='<h2>No '
        if (gFilterBy === 'ALL') {
            strHTML += '' 
        } else if (gFilterBy === 'DONE') {
            strHTML +='Done'
        } else if (gFilterBy === 'ACTIVE') {
            strHTML += 'Active'
        }
        strHTML +=' Todos </h2>'

    } else {
        todos.forEach(function (todo) {
            strHTML +=
                `<li class="${(todo.isDone) ? 'done' : ''}" onclick="onToggleTodo('${todo.id}')" >
             ${todo.importance}-   ${todo.txt}-  <span class="date" >${timeStempOnTodo(todo.createdAt)}</span> 
            <button onclick="onRemoveTodo(event,'${todo.id}')">x</button>
        </li>`
        })
    }
    document.querySelector('.todo-list').innerHTML = strHTML;

    document.querySelector('.total').innerText = getTodosCount()
    document.querySelector('.active').innerText = getActiveTodosCount()
}

function onAddTodo() {
    var elNewTodoTxt = document.querySelector('.new-todo-txt');
    var importance = document.querySelector('.importance').value
    var txt = elNewTodoTxt.value
    if (!txt) return
    else {
        addTodo(txt, importance);
        renderTodos();
    }
    elNewTodoTxt.value = '';
    // console.log (new Date().getTime())
}

function onRemoveTodo(ev, todoId) {
    ev.stopPropagation();
    removeTodo(todoId);
    renderTodos();
}
function onToggleTodo(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderTodos();
}

function onSetFilterSort(sortBy) {
    setSort(sortBy)
    renderTodos();
}