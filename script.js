let input = document.getElementById("input");
let list = document.getElementById("list");
let btn = document.getElementById("btn");

let uniqueId = 1;

let data = JSON.parse(localStorage.getItem("myTask")) || [];

function onLoad(data) {

    if (data.length > 0) {
        uniqueId = data[data.length - 1].id + 1;
        data.forEach(function (task) {
            addTodo(task.task, task.id);
        });
    }
}

function addTodo(task, id) {

    let li = document.createElement("li");
    let title = document.createElement("span");
    title.innerText = task;

    let btnContainer = document.createElement("div");
    btnContainer.classList.add("btn-container");

    let btnDelete = document.createElement("button");
    btnDelete.innerText = "Delete";
    btnDelete.classList.add("delete-btn");

    let btnEdit = document.createElement("button");
    btnEdit.innerText = "Edit";
    btnEdit.classList.add("edit-btn");

    btnContainer.appendChild(btnEdit);
    btnContainer.appendChild(btnDelete);

    li.appendChild(title);
    li.appendChild(btnContainer);

    list.appendChild(li);

    input.value = "";

    btnDelete.addEventListener("click", function () {
        let store = JSON.parse(localStorage.getItem("myTask"));
        let newData = store.filter(function (element) {
            return element.id != id;
        });
        data = newData;
        localStorage.setItem("myTask", JSON.stringify(newData));
        list.removeChild(li);
    });

    btnEdit.addEventListener("click", function () {
        let newTask = prompt("Edit your task:", title.innerText);
        if (newTask !== null && newTask.trim() !== "") {
            title.innerText = newTask;
            let store = JSON.parse(localStorage.getItem("myTask"));
            let updatedData = store.map(function (element) {
                if (element.id == id) {
                    return {
                        task: newTask,
                        id: id
                    };
                }
                return element;
            });
            data = updatedData;
            localStorage.setItem("myTask", JSON.stringify(updatedData));
        }
    });
}

input.addEventListener("keyup", function (event) {

    if (event.key === "Enter") {
        if (input.value.trim() === "") {
            alert("Please enter a task");
            return;
        }
        let task = {
            task: input.value,
            id: uniqueId
        };
        data.push(task);
        localStorage.setItem("myTask", JSON.stringify(data));
        addTodo(task.task, task.id);
        uniqueId++;
    }
});

btn.addEventListener("click", function () {

    if (input.value.trim() === "") {
        alert("Please enter a task");
        return;
    }
    let task = {
        task: input.value,
        id: uniqueId
    };
    data.push(task);
    localStorage.setItem("myTask", JSON.stringify(data));
    addTodo(task.task, task.id);
    uniqueId++;
});

onLoad(data);