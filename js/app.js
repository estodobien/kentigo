// ==========================================
// KENTIGO
// APP
// ==========================================

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {

    initModal();

    console.log("Kentigo started");

}



// ==========================================
// LOGIN MODAL
// ==========================================

function initModal() {

    const modal = document.getElementById("loginModal");

    if (!modal) return;

    const closeButton = modal.querySelector(".modal-close");

    closeButton?.addEventListener("click", closeLoginModal);

    modal.addEventListener("click", (event) => {

        if (event.target === modal) {

            closeLoginModal();

        }

    });

}

function openLoginModal() {

    const modal = document.getElementById("loginModal");

    if (!modal) return;

    modal.classList.add("active");

}

function closeLoginModal() {

    const modal = document.getElementById("loginModal");

    if (!modal) return;

    modal.classList.remove("active");

}
// ==========================================
// CREATE PLAN MODAL
// ==========================================

function openCreatePlanModal() {

    const modal = document.getElementById("createPlanModal");

    if (!modal) return;

    modal.classList.add("active");

}

function closeCreatePlanModal() {

    const modal = document.getElementById("createPlanModal");

    if (!modal) return;

    modal.classList.remove("active");

}

document.addEventListener("click", (event) => {

    if (event.target.closest("[data-login]")) {
        openLoginModal();
        return;
    }

    if (event.target.closest("[data-create]")) {
        openCreatePlanModal();
        return;
    }

    if (event.target.closest("[data-close-create]")) {
        closeCreatePlanModal();
        return;
    }

    if (event.target.id === "loginModal") {
        closeLoginModal();
        return;
    }

    if (event.target.id === "createPlanModal") {
        closeCreatePlanModal();
    }

});