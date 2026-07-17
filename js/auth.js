// ==========================================
// KENTIGO
// AUTH
// ==========================================

let currentUser = null;

// ==========================================
// INIT
// ==========================================

document.addEventListener("DOMContentLoaded", initAuth);

async function initAuth() {

    const {
        data: { session }
    } = await db.auth.getSession();

    currentUser = session?.user ?? null;

    updateHeader();

}
// ==========================================
// HEADER
// ==========================================

function updateHeader() {

    const loginButton = document.querySelector("[data-login]");

    if (!loginButton) return;

    if (!currentUser) {

        loginButton.textContent = "Войти";

        return;

    }

    loginButton.textContent =
        currentUser.user_metadata?.full_name ||
        currentUser.email;

}