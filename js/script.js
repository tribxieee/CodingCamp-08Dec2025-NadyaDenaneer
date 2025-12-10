let tasks = [];
let editIndex = null;

// ADD TASK
document.querySelector(".btn-add").addEventListener("click", (e) => {
    e.preventDefault();
    
    const taskInput = document.querySelector("#task-input");
    const dateInput = document.querySelector("#date-input");

    const task = taskInput.value.trim();
    const date = dateInput.value;

    if (!task || !date) {
        Swal.fire("Isi dulu semua field!", "", "warning");
        return;
    }

    // MODE EDIT
    if (editIndex !== null) {
        tasks[editIndex].task = task;
        tasks[editIndex].due = date;
        Swal.fire("Task Updated!", "", "success");
        editIndex = null;
    } else {
        // MODE ADD
        tasks.push({
            task: task,
            due: date,
            status: "pending"
        });

        Swal.fire("Task Added!", "", "success");
    }

    taskInput.value = "";
    dateInput.value = "";

    renderTasks();
});

// RENDER TASK TABLE
function renderTasks(filter = "All") {
    const tbody = document.querySelector("#task-table-body");
    tbody.innerHTML = "";

    let filteredTasks = tasks.filter(t => {
        if (filter === "All") return true;
        return t.status === filter.toLowerCase();
    });

    filteredTasks.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.task}</td>
            <td>${formatDate(item.due)}</td>
            <td>
                <span class="status-pill ${item.status}">
                    ${capitalize(item.status)}
                </span>
            </td>
            <td class="actions">
                <button class="btn-icon edit" onclick="editTask(${index})"><i class="bi bi-pencil"></i></button>
                <button class="btn-icon complete" onclick="toggleStatus(${index})"><i class="bi bi-check-lg"></i></button>
                <button class="btn-icon delete" onclick="deleteTask(${index})"><i class="bi bi-trash"></i></button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

// DELETE TASK
function deleteTask(index) {
    Swal.fire({
        title: "Delete this task?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes",
    }).then((result) => {
        if (result.isConfirmed) {
            tasks.splice(index, 1);
            renderTasks();
            Swal.fire("Deleted!", "", "success");
        }
    });
}

// TOGGLE STATUS
function toggleStatus(index) {
    tasks[index].status = tasks[index].status === "pending" ? "completed" : "pending";
    renderTasks();
}

// EDIT TASK
function editTask(index) {
    const t = tasks[index];
    document.querySelector("#task-input").value = t.task;
    document.querySelector("#date-input").value = t.due;
    editIndex = index;
}

// FILTER BUTTONS
document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
        e.target.classList.add("active");

        renderTasks(e.target.textContent);
    });
});

// FORMAT DATE
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit"
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
