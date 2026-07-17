// ==========================================
// KENTIGO
// PLANS
// ==========================================

const categories = {
    coffee: "☕ Кофе",
    beach: "🏖 Пляж",
    bar: "🍺 Бар",
    restaurant: "🍕 Ресторан",
    sport: "⚽ Спорт",
    bike: "🚴 Велосипед",
    hiking: "🥾 Поход",
    trip: "🚗 Поездка",
    games: "🎲 Игры",
    movie: "🎬 Кино",
    other: "✨ Другое"
};

document.addEventListener("DOMContentLoaded", () => {

    loadPlans();

    initButtons();

});

// ==========================================
// Загрузка встреч
// ==========================================

async function loadPlans() {

    const container = document.getElementById("plans");

    if (!container) return;

    container.innerHTML = "<p>Загрузка...</p>";

    const { data, error } = await db
        .from("plans")
        .select("*")
        .eq("status", "open")
        .order("meeting_at", { ascending: true });

    if (error) {

        console.error(error);

        container.innerHTML = `
            <div class="empty-state">
                <h3>Ошибка</h3>
                <p>Не удалось загрузить встречи.</p>
            </div>
        `;

        return;

    }

    renderPlans(data);

}

// ==========================================
// Отрисовка
// ==========================================

function renderPlans(plans) {

    const container = document.getElementById("plans");

    container.innerHTML = "";

    const counter = document.getElementById("plansCount");

if (counter) {
    counter.textContent = `${plans.length} встреч`;
}

    if (!plans.length) {

        container.innerHTML = `
            <div class="empty-state">
                <h3>Пока пусто</h3>
                <p>Стань первым, кто создаст встречу 🎉</p>
            </div>
        `;

        return;

    }

    plans.forEach(plan => {

        container.appendChild(createPlanCard(plan));

    });

}

// ==========================================
// Карточка встречи
// ==========================================

function createPlanCard(plan) {

    const card = document.createElement("article");

    card.className = "plan-card";

    const date = new Date(plan.meeting_at);

    const day = date.toLocaleDateString("ru-RU");

    const time = date.toLocaleTimeString("ru-RU", {
        hour: "2-digit",
        minute: "2-digit"
    });

    card.innerHTML = `

        <div class="plan-image">
            📍
        </div>

        <div class="plan-content">

            <div class="plan-category">
                ${categories[plan.category] ?? "✨ Другое"}
            </div>

            <h3 class="plan-title">
                ${plan.title}
            </h3>

            <p class="plan-description">
                ${plan.description ?? ""}
            </p>

            <div class="plan-info">

                <div>📍 ${plan.city}</div>

                <div>📌 ${plan.meeting_place ?? "Место уточняется"}</div>

                <div>📅 ${day}</div>

                <div>🕒 ${time}</div>

                <div>👥 До ${plan.max_people} участников</div>

            </div>

            <div class="plan-footer">

                <button
                    class="btn btn-primary"
                    data-plan-id="${plan.id}"
                >
                    Подробнее
                </button>

            </div>

        </div>

    `;

    return card;

}

// ==========================================
// Кнопки
// ==========================================

function initButtons() {

    document.addEventListener("click", (event) => {

        const button = event.target.closest("[data-plan-id]");

        if (!button) return;

        const id = button.dataset.planId;

        window.location.href = `plan.html?id=${id}`;

    });

}