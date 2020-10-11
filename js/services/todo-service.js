const STORAGE_KEY = 'todoDB';

var gFilterBy = 'ALL';
var gTodos = _createTodos();
var gSortBy= 'created'


function getTodosForDisplay() {
    
    if (gSortBy==='created') {
        gTodos.sort(comparByTime)
    }
    if(gSortBy==='text') {
        gTodos.sort(comparByTxt)
    }
    else if (gSortBy==='importance'){
        gTodos.sort(comparByImportance)
    }
    if (gFilterBy === 'ALL') return gTodos;
    var res = gTodos.filter(function (todo) {
        return (
            gFilterBy === 'DONE' && todo.isDone ||
            gFilterBy === 'ACTIVE' && !todo.isDone
        )
    })
    return res;
}

function comparByTxt(todo1,todo2){
    if (todo1.txt>todo2.txt) return 1
    if (todo2.txt>todo1.txt) return -1
    return 0
}
function comparByTime(todo1,todo2){
    if (todo1.createdAt<todo2.createdAt) return 1
    if (todo2.createdAt<todo1.createdAt) return -1
    return 0
}
function comparByImportance(todo1,todo2){
    if (todo1.importance>todo2.importance) return 1
    if (todo2.importance>todo1.importance) return -1
    return 0
}


function addTodo(txt,importance) {
    gTodos.unshift(_createTodo(txt,importance))
    saveToStorage(STORAGE_KEY, gTodos);

}

function removeTodo(id) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === id
    })
    gTodos.splice(idx, 1);
    saveToStorage(STORAGE_KEY, gTodos);
}

function toggleTodo(id) {
    var todo = gTodos.find(function (todo) {
        return todo.id === id
    })
    todo.isDone = !todo.isDone;
    saveToStorage(STORAGE_KEY, gTodos);
}

function setFilter(filterBy) {
    gFilterBy = filterBy;
}
function setSort(sortBy) {
    gSortBy = sortBy;
}

function getTodosCount() {
    return gTodos.length
}
function getActiveTodosCount() {
    var count = gTodos.reduce(function (count, todo) {
        if (!todo.isDone) count += 1
        return count;
    }, 0)
    return count;
}
function getActiveTodosCount1() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone
    })
    return activeTodos.length;
}

function timeStempOnTodo(timestemp) {
    var time = new Date(timestemp).toLocaleTimeString()
    return time

}



// Those functions are PRIVATE - not to be used outside this file!
function _createTodo(txt,importance) {
    return {
        id: makeId(),
        txt: txt,
        isDone: false,
        createdAt: Date.now(),
        importance : importance

    };
}
function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY);
    if (!todos) {
        todos = []
        todos.push(_createTodo('Learn HTML'))
        todos.push(_createTodo('Master CSS'))
        todos.push(_createTodo('Become JS Ninja'))
    }
    return todos;
}



