// ==========================================
// KENTIGO
// APP
// ==========================================

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {

    initModal();

    initButtons();

    console.log("Kentigo started");

}

// ==========================================
// BUTTONS
// ==========================================

function initButtons() {

    document
        .querySelectorAll("[data-login]")
        .forEach(button => {

            button.addEventListener("click", openLoginModal);

        });

    document
        .querySelectorAll("[data-create]")
        .forEach(button => {

            button.addEventListener("click", openCreatePlanModal);

        });

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

    if (event.target.matches("[data-close-create]")) {

        closeCreatePlanModal();

    }

    const modal = document.getElementById("createPlanModal");

    if (event.target === modal) {

        closeCreatePlanModal();

    }

});