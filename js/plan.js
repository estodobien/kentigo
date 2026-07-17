// ==========================================
// KENTIGO
// PLAN
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

document.addEventListener("DOMContentLoaded", loadPlan);

async function loadPlan() {

    const params = new URLSearchParams(window.location.search);

    const id = params.get("id");

    if (!id) {

        alert("Встреча не найдена");

        window.location.href = "index.html";

        return;

    }

    const { data, error } = await db
        .from("plans")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {

        console.error(error);

        alert("Не удалось загрузить встречу");

        return;

    }

    renderPlan(data);

}
function renderPlan(plan) {

    document.getElementById("planCategory").textContent =
        categories[plan.category] ?? "✨ Другое";

    document.getElementById("planTitle").textContent =
        plan.title;

    document.getElementById("planDescription").textContent =
        plan.description || "Описание отсутствует";

    document.getElementById("planCity").textContent =
        "📍 " + plan.city;

    document.getElementById("planPlace").textContent =
        "📌 " + (plan.meeting_place || "Место уточняется");

    const date = new Date(plan.meeting_at);

    document.getElementById("planDate").textContent =
        "📅 " + date.toLocaleDateString("ru-RU");

    document.getElementById("planTime").textContent =
        "🕒 " + date.toLocaleTimeString("ru-RU", {

            hour: "2-digit",
            minute: "2-digit"

        });

    document.getElementById("planMembers").textContent =
        `0 / ${plan.max_people} участников`;

}