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
let currentPlan = null;
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

    currentPlan = data;

renderPlan(data);

updateJoinButton();

console.log(data);

}
function renderPlan(plan) {

    const date = new Date(plan.meeting_at);

    document.getElementById("categoryBadge").textContent =
        categories[plan.category] ?? "✨ Другое";

    document.getElementById("planTitle").textContent =
        plan.title;

    document.getElementById("planDescription").textContent =
        plan.description || "Описание отсутствует";

    document.getElementById("planCity").textContent =
        "📍 " + plan.city;

    document.getElementById("planPlace").textContent =
        "📌 " + (plan.meeting_place || "Место уточняется");

    document.getElementById("planDate").textContent =
        "📅 " + date.toLocaleDateString("ru-RU");

    document.getElementById("planTime").textContent =
        "🕒 " + date.toLocaleTimeString("ru-RU", {
            hour: "2-digit",
            minute: "2-digit"
        });

    updateParticipantsCount();

}
// ==========================================
// ПРИСОЕДИНЕНИЕ К ВСТРЕЧЕ
// ==========================================

async function updateJoinButton() {

    const button = document.getElementById("joinPlanBtn");

    if (!button) return;

    const {
        data: { user }
    } = await db.auth.getUser();

    if (!user) {

        button.textContent = "Войти для участия";
        return;

    }

    const { data } = await db
        .from("plan_members")
        .select("id")
        .eq("plan_id", currentPlan.id)
        .eq("user_id", user.id)
        .maybeSingle();

    if (data) {

        button.textContent = "Покинуть встречу";

    } else {

        button.textContent = "Присоединиться";

    }

}

document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("joinPlanBtn");

    if (!button) return;

    button.addEventListener("click", toggleJoin);

});

async function toggleJoin() {

    const {
        data: { user }
    } = await db.auth.getUser();

    if (!user) {

        alert("Необходимо войти");

        return;

    }

    const { data } = await db
        .from("plan_members")
        .select("id")
        .eq("plan_id", currentPlan.id)
        .eq("user_id", user.id)
        .maybeSingle();

    if (data) {

        await db
            .from("plan_members")
            .delete()
            .eq("id", data.id);

    } else {

        await db
            .from("plan_members")
            .insert({
                plan_id: currentPlan.id,
                user_id: user.id
            });

    }

    updateJoinButton();
    updateParticipantsCount();

}
async function updateParticipantsCount() {

    const { count } = await db
        .from("plan_members")
        .select("*", { count: "exact", head: true })
        .eq("plan_id", currentPlan.id);

    document.getElementById("participantsCount").textContent =
        `${count} / ${currentPlan.max_people} участников`;

}