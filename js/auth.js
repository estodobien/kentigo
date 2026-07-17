// ===============================
// Google Login
// ===============================

const googleLoginBtn = document.getElementById("googleLogin");

if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", async () => {

        try {

            const { error } = await db.auth.signInWithOAuth({

                provider: "google",

                options: {
                    redirectTo: `${window.location.origin}/login.html`
                }

            });

            if (error) {
                alert(error.message);
            }

        } catch (err) {
            console.error(err);
            alert(err.message);
        }

    });
}

// ===============================
// Email Registration
// ===============================

const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {

    registerBtn.addEventListener("click", async () => {

        try {

            const name = document.getElementById("registerName").value.trim();
            const email = document.getElementById("registerEmail").value.trim();
            const password = document.getElementById("registerPassword").value;

            if (!name || !email || !password) {
                alert("Заполните все поля");
                return;
            }

            const { data, error } = await db.auth.signUp({

                email,
                password

            });

            if (error) {
                alert(error.message);
                return;
            }

            if (data.user) {

                const { error: profileError } = await db
                    .from("profiles")
                    .update({
                        name: name
                    })
                    .eq("id", data.user.id);

                if (profileError) {
                    console.error(profileError);
                }

            }

            alert("Регистрация успешна. Проверьте почту.");

        } catch (err) {

            console.error(err);
            alert(err.message);

        }

    });

}

// ===============================
// Email Login
// ===============================

const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {

    loginBtn.addEventListener("click", async () => {

        try {

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value;

            const { error } = await db.auth.signInWithPassword({

                email,
                password

            });

            if (error) {
                alert(error.message);
                return;
            }

            window.location.href = "plans.html";

        } catch (err) {

            console.error(err);
            alert(err.message);

        }

    });

}

// ===============================
// Existing Session
// ===============================

(async () => {

    try {

        const {
            data: { session }
        } = await db.auth.getSession();

        if (!session) return;

        window.location.href = "plans.html";

    } catch (err) {

        console.error(err);

    }

})();