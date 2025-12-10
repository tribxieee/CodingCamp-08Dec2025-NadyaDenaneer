document.querySelector(".btn-add").addEventListener("click", (e) => {
    e.preventDefault();

    Swal.fire({
        title: "Task added!",
        icon: "success",
        draggable: true
    });
});

document.querySelector(".clear-btn").addEventListener("click", (e) => {
    e.preventDefault();

    Swal.fire({
    title: "Do you want to delete?",
    showCancelButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`
    }).then((result) => {
    if (result.isConfirmed) {
        Swal.fire("Success Delete Task!", "", "success");
    }
    });
});