document.querySelector(".btn-add").addEventListener("click", (e) => {
    e.preventDefault();

    Swal.fire({
        title: "Task added!",
        icon: "success",
        draggable: true
    });
});
