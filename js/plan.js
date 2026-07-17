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
    .select(`
        *,
        creator:profiles!plans_creator_id_fkey(
            id,
            name,
            avatar_url
        )
    `)
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
    updateParticipantsList();
    updateOwnerActions();
    document.getElementById("planCreator").textContent =
    plan.creator?.name || "Без имени";

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
    button.disabled = false;

} else {

    const { count } = await db
        .from("plan_members")
        .select("*", { count: "exact", head: true })
        .eq("plan_id", currentPlan.id);

    if (count >= currentPlan.max_people) {

        button.textContent = "Мест нет";
        button.disabled = true;

    } else {

        button.textContent = "Присоединиться";
        button.disabled = false;

    }

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
    updateParticipantsList();

}
async function updateParticipantsCount() {

    const { count } = await db
        .from("plan_members")
        .select("*", { count: "exact", head: true })
        .eq("plan_id", currentPlan.id);

    document.getElementById("participantsCount").textContent =
        `${count} / ${currentPlan.max_people} участников`;

}
async function updateParticipantsList() {

    const list = document.getElementById("participantsList");

    const { data, error } = await db
        .from("plan_members")
        .select(`
            profiles (
                name
            )
        `)
        .eq("plan_id", currentPlan.id);

    if (error) {

        console.error(error);

        return;

    }

    if (!data.length) {

        list.innerHTML = "<p>Пока никто не присоединился</p>";

        return;

    }

    list.innerHTML = data.map(member => `
        <div class="participant-item">
            👤 ${member.profiles?.name || "Без имени"}
        </div>
    `).join("");

}
async function updateOwnerActions() {

    const {
        data: { user }
    } = await db.auth.getUser();

    const actions = document.getElementById("ownerActions");

    if (!actions) return;

    if (user && user.id === currentPlan.creator_id) {

        actions.style.display = "block";

    } else {

        actions.style.display = "none";

    }

}