(async () => {

    const {
        data: { session }
    } = await db.auth.getSession();

    if (!session) {

        window.location.href = "login.html";
        return;

    }

    const user = session.user;

    document.getElementById("welcome").textContent =
        "Привет, " + (user.email || "Пользователь");

})();

document
    .getElementById("logoutBtn")
    .addEventListener("click", async () => {

        await db.auth.signOut();

        window.location.href = "login.html";

    });

document
    .getElementById("createPlanBtn")
    .addEventListener("click", () => {

        alert("Следующий шаг — создание плана");

    });