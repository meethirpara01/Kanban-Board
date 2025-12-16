let taskData = {}

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const columns = [todo, progress, done];
let dragElement = null;

// console.log(todo, progress, done);

function addTask(title, desc, column) {
    const div = document.createElement("div");

    div.classList.add("task");
    div.setAttribute("draggable", "true");

    div.innerHTML = `<h2>${title}</h2>
                    <p>${desc}</p>
                    <button>Delete</button>`

    column.appendChild(div);

    div.addEventListener("drag", () => {
        dragElement = div;
    })

    const deletButton = div.querySelector("button");
    deletButton.addEventListener("click", () => {
        div.remove();
        updateTaskCount();
    })

    return div;
}

function updateTaskCount() {
    columns.forEach(col => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");

        taskData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerHTML,
                desc: t.querySelector("p").innerHTML
            }
        })
        // console.log(taskData);
        localStorage.setItem("tasks", JSON.stringify(taskData));

        count.textContent = tasks.length;
    })
}

if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));

    for (const col in data) {
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            addTask(task.title, task.desc, column);
        })
    }

    updateTaskCount();
}


const tasks = document.querySelectorAll(".task");
tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        // console.log(e); 
        dragElement = task;
        // console.log(dragElement);    
    })
});

function addDragEventsOnColumn(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
    column.addEventListener("drop", (e) => {
        e.preventDefault();
        console.log(e);

        if (dragElement) {
            column.appendChild(dragElement);
            column.classList.remove("hover-over");
        }

        columns.forEach(col => {
            const tasks = col.querySelectorAll(".task");
            const count = col.querySelector(".right");

            taskData[col.id] = Array.from(tasks).map(t => {
                return {
                    title: t.querySelector("h2").innerHTML,
                    desc: t.querySelector("p").innerHTML
                }
            })
            // console.log(taskData);
            localStorage.setItem("tasks", JSON.stringify(taskData));

            count.textContent = tasks.length;
        })
    });
};

addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);


const toggleModal = document.querySelector("#toggle-modal");
const modal = document.querySelector(".model");
const modelBg = document.querySelector(".bg");
const addTaskButton = document.querySelector("#add-new-task");

toggleModal.addEventListener("click", () => {
    modal.classList.toggle("modelActive")
})

modelBg.addEventListener("click", () => {
    modal.classList.toggle("modelActive")
})

addTaskButton.addEventListener("click", () => {

    const tasktitle = document.querySelector("#task-title-input").value;
    const taskDec = document.querySelector("#task-dec-input").value;

    addTask(tasktitle, taskDec, todo);

    updateTaskCount();

    document.querySelector("#task-title-input").value = "";
    document.querySelector("#task-dec-input").value = "";

    modal.classList.remove("modelActive")
})