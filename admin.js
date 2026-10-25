const SUPABASE_URL = "MASUKKAN_PROJECT_URL_ANDA";
const SUPABASE_KEY = "MASUKKAN_PUBLISHABLE_KEY_ANDA";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


/* =========================
   LOGIN
========================= */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();

            const email =
                document.getElementById("email").value.trim();

            const password =
                document.getElementById("password").value;

            const message =
                document.getElementById("loginMessage");

            const button =
                document.getElementById("loginButton");


            button.disabled = true;

            button.innerHTML =
                '<i class="fa-solid fa-spinner fa-spin"></i> Login...';


            const {
                data,
                error
            } =
                await supabaseClient.auth.signInWithPassword({
                    email: email,
                    password: password
                });


            if (error) {

                message.textContent =
                    "Email atau password salah.";

                button.disabled = false;

                button.innerHTML =
                    '<i class="fa-solid fa-right-to-bracket"></i> Login Admin';

                return;
            }


            if (data.session) {

                window.location.href =
                    "admin.html";

            }

        }
    );

}


/* =========================
   SHOW PASSWORD
========================= */

const showPassword =
    document.getElementById("showPassword");


if (showPassword) {

    showPassword.addEventListener(
        "click",
        function() {

            const password =
                document.getElementById("password");

            if (password.type === "password") {

                password.type = "text";

                this.innerHTML =
                    '<i class="fa-solid fa-eye-slash"></i>';

            } else {

                password.type = "password";

                this.innerHTML =
                    '<i class="fa-solid fa-eye"></i>';

            }

        }
    );

}


/* =========================
   ADMIN PROTECTION
========================= */

async function checkAdmin() {

    const {
        data
    } =
        await supabaseClient.auth.getSession();


    if (!data.session) {

        window.location.href =
            "login.html";

    }

}


if (
    window.location.pathname.endsWith(
        "admin.html"
    )
) {

    checkAdmin();

}


/* =========================
   LOGOUT
========================= */

async function logoutAdmin() {

    await supabaseClient.auth.signOut();

    window.location.href =
        "login.html";

}
