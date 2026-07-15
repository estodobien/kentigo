// ===============================
// Google Login
// ===============================

const googleLoginBtn = document.getElementById("googleLogin");

if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", async () => {

        const { error } = await supabase.auth.signInWithOAuth({

            provider: "google",

            options: {
                redirectTo: "https://kentigo.netlify.app/login.html"
            }

        });

        if (error) {
            alert(error.message);
        }

    });
}

// ===============================
// Email Registration
// ===============================

const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {

    registerBtn.addEventListener("click", async () => {

        const name = document.getElementById("registerName").value.trim();

        const email = document.getElementById("registerEmail").value.trim();

        const password = document.getElementById("registerPassword").value;

        if (!name || !email || !password) {
            alert("Заполните все поля");
            return;
        }

        const { data, error } = await supabase.auth.signUp({

            email,
            password

        });

        if (error) {
            alert(error.message);
            return;
        }

        if (data.user) {

            await supabase
                .from("profiles")
                .update({
                    name: name
                })
                .eq("id", data.user.id);

        }

        alert("Регистрация успешна. Проверьте почту.");

    });

}

// ===============================
// Email Login
// ===============================

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", async () => {

        const email = document.getElementById("loginEmail").value.trim();

        const password = document.getElementById("loginPassword").value;

        const { error } = await supabase.auth.signInWithPassword({

            email,
            password

        });

        if (error) {

            alert(error.message);

            return;

        }

        window.location.href = "plans.html";

    });

}

// ===============================
// Existing Session
// ===============================

(async () => {

    const {

        data: { session }

    } = await supabase.auth.getSession();

    if (!session) return;

    window.location.href = "plans.html";

})();