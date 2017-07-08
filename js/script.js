/**
 * Created by anshul on 23/6/17.
 */

let todoItems = [];

window.onload = function () {
    let newTodo = document.getElementById('newTodo');
    let addTodo = document.getElementById('addTodo');
    let todoList = document.getElementById('todoList');
    let clearTodos = document.getElementById('clearTodos');

    refreshTodos();

    addTodo.onclick = function () {
        addAndSave(newTodo.value);
        newTodo.value = '';
    };

    newTodo.addEventListener('keypress', function (e) {
        if(e.which === 13){
            addAndSave(newTodo.value);
            newTodo.value = '';
        }
    });

    clearTodos.onclick = function () {
        todoItems = todoItems.filter( function (item, idx, arr) {
            return !(item.done);
        });
        saveTodos();
        refreshTodos();
    };

    function addItemToList(list, itemIndex, itemObject) {
        let todoItem = document.createElement('li');
        let checkBox = document.createElement('input');
        let deleteButton = document.createElement('span');
        let up = document.createElement('span');
        let down = document.createElement('span');
        let data = document.createElement('label');

        deleteButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
        up.innerHTML = '<i class="fa fa-angle-up" aria-hidden="true"></i>';
        down.innerHTML = '<i class="fa fa-angle-down" aria-hidden="true"></i>';
        data.innerText = itemObject.task;

        checkBox.setAttribute('type','checkbox');
        checkBox.setAttribute('id',itemIndex);
        data.setAttribute('for',itemIndex);
        todoItem.setAttribute('data-id', itemIndex);

        checkBox.addEventListener('change',change);
        deleteButton.addEventListener('click', deleteSelf);
        up.addEventListener('click', shiftUp);
        down.addEventListener('click', shiftDown);

        up.classList.add('up');
        down.classList.add('down');
        deleteButton.classList.add('delete');

        todoItem.append(checkBox);
        todoItem.append(data);
        todoItem.append(up);
        todoItem.append(down);
        todoItem.append(deleteButton);

        if(itemObject.done){
            checkBox.setAttribute('checked', 'true');
            data.style.textDecoration = 'line-through';
            data.style.color = '##90a4ae ';
        }

        list.appendChild(todoItem);

    }

    function change(event) {
        let change = event.target.parentNode.getAttribute('data-id');
        todoItems[change].done = !todoItems[change].done;
        saveTodos();
        refreshTodos();
    }

    function shiftUp(event) {
        if(event.target.parentNode.classList.contains('up')){
            let idToshift = parseInt(event.target.parentNode.parentNode.getAttribute('data-id'));
            todoItems.splice(idToshift-1,2, todoItems[idToshift], todoItems[idToshift-1]);
            saveTodos();
            refreshTodos();
        }
    }

    function shiftDown(event) {
        if(event.target.parentNode.classList.contains('down')){
            let idToshift = parseInt(event.target.parentNode.parentNode.getAttribute('data-id'));
            todoItems.splice(idToshift,2, todoItems[idToshift+1], todoItems[idToshift]);
            saveTodos();
            refreshTodos();
        }
    }

    function deleteSelf(event) {
        if(event.target.parentNode.classList.contains('delete')){
            let idToDel = parseInt(event.target.parentNode.parentNode.getAttribute('data-id'));
            console.log("Delete = " + idToDel);
            todoItems.splice(idToDel,1);
            saveTodos();
            refreshTodos();
        }
    }

    function saveTodos() {
        localStorage.setItem('todolist',JSON.stringify(todoItems));
    }

    function setItemArrayToList(list, itemArray) {
        list.innerHTML = '';
        for(index in itemArray){
            addItemToList(list,index,itemArray[index]);
        }
    }

    function retrieveTodos() {
        let todoInStore = localStorage.getItem('todolist');
        if(todoInStore){
            todoItems = JSON.parse(todoInStore.split(','));
            console.log(todoInStore);
        }
    }

    function addAndSave(itemText) {
        todoItems.push({
            task: itemText,
            done: false
        });
        saveTodos();
        refreshTodos();
    }

    function refreshTodos() {
        retrieveTodos();
        setItemArrayToList(todoList,todoItems);
    }

    // Additional

    let featureBlock = document.getElementById('feature-block');
    let featureSpan = document.getElementById('features');
    let container = document.getElementById('container');

    featureSpan.addEventListener('mousedown', function () {
        featureBlock.style.display = 'block';
        container.style.filter = "blur(5px)";
    });

    featureBlock.addEventListener('mousedown', function () {
        featureBlock.style.display = 'none';
        container.style.filter = "";
    });
};

