// =========================
// Категории
// =========================

const categories = {
    coffee: "☕ Coffee",
    beach: "🏖 Beach",
    bar: "🍺 Bar",
    restaurant: "🍕 Restaurant",
    sport: "⚽ Sport",
    bike: "🚴 Bike",
    hiking: "🥾 Hiking",
    trip: "🚗 Trip",
    games: "🎲 Games",
    movie: "🎬 Movie",
    other: "✨ Other"
};

// =========================
// Запуск
// =========================

init();

async function init() {

    const user = await checkSession();

    document.getElementById("welcome").textContent =
        "Привет, " + user.email;

    await loadPlans();

}

// =========================
// Проверка авторизации
// =========================

async function checkSession() {

    const {
        data: { session }
    } = await db.auth.getSession();

    if (!session) {

        window.location.href = "login.html";
        return;

    }

    return session.user;

}

// =========================
// Загрузка планов
// =========================

async function loadPlans() {

    const { data, error } = await db
        .from("plans")
        .select("*")
        .eq("status", "open")
        .order("meeting_at", { ascending: true });

    if (error) {

        console.error(error);
        return;

    }

    renderPlans(data);

}

// =========================
// Отрисовка списка
// =========================

function renderPlans(plans) {

    const container = document.getElementById("plans");

    container.innerHTML = "";

    if (plans.length === 0) {

        container.innerHTML = `
            <p>
                Пока никто ничего не запланировал.
                <br><br>
                Создай первый план 😊
            </p>
        `;

        return;

    }

    plans.forEach(plan => {

        container.appendChild(createPlanCard(plan));

    });

}

// =========================
// Карточка
// =========================

function createPlanCard(plan) {

    const card = document.createElement("div");

    card.className = "plan-card";

    const date = new Date(plan.meeting_at);

    card.innerHTML = `

        <h3>${categories[plan.category] || plan.category}</h3>

        <p><strong>${plan.title}</strong></p>

        <p>📍 ${plan.city}</p>

        <p>📌 ${plan.meeting_place}</p>

        <p>📅 ${date.toLocaleDateString()}</p>

        <p>🕒 ${date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        })}</p>

        <p>👥 До ${plan.max_people} человек</p>

        <p>${plan.description ?? ""}</p>

        <button>
            Подробнее
        </button>

        <hr>

    `;

    return card;

}

// =========================
// Выход
// =========================

document
    .getElementById("logoutBtn")
    .addEventListener("click", async () => {

        await db.auth.signOut();

        window.location.href = "login.html";

    });

// =========================
// Создать план
// =========================

document
    .getElementById("createPlanBtn")
    .addEventListener("click", () => {

        alert("Следующий шаг — модальное окно создания плана");

    });