document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       ELEMENT
    ========================= */

    const sidebar = document.getElementById("sidebar");
    const mobileToggle = document.getElementById("mobileToggle");
    const themeToggle = document.getElementById("themeToggle");

    const searchInput = document.getElementById("globalSearch");

    const modal = document.getElementById("memberModal");
    const modalClose = document.getElementById("modalClose");

    const modalName = document.getElementById("modalName");
    const modalRT = document.getElementById("modalRT");
    const modalPhone = document.getElementById("modalPhone");
    const modalCall = document.getElementById("modalCall");
    const modalAvatar = document.querySelector(".modal-avatar");


    /* =========================
       MOBILE SIDEBAR
    ========================= */

    if (mobileToggle) {

        mobileToggle.addEventListener("click", function () {

            sidebar.classList.toggle("open");

        });

    }


    /* =========================
       CLOSE MOBILE SIDEBAR
    ========================= */

    document.querySelectorAll(".nav-item").forEach(function (item) {

        item.addEventListener("click", function () {

            if (window.innerWidth <= 900) {
                sidebar.classList.remove("open");
            }

            document.querySelectorAll(".nav-item").forEach(function (nav) {
                nav.classList.remove("active");
            });

            item.classList.add("active");

        });

    });


    /* =========================
       DARK MODE
    ========================= */

    const savedTheme = localStorage.getItem("gadelan-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        if (themeToggle) {
            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';
        }

    }


    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            document.body.classList.toggle("dark");

            const dark =
                document.body.classList.contains("dark");

            localStorage.setItem(
                "gadelan-theme",
                dark ? "dark" : "light"
            );

            themeToggle.innerHTML = dark
                ? '<i class="fa-solid fa-sun"></i>'
                : '<i class="fa-solid fa-moon"></i>';

        });

    }


    /* =========================
       SEARCH ANGGOTA
    ========================= */

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const keyword =
                searchInput.value.toLowerCase().trim();

            const rows =
                document.querySelectorAll("#memberTable tbody tr");

            rows.forEach(function (row) {

                const name =
                    row.getAttribute("data-name") ||
                    row.textContent;

                if (
                    name.toLowerCase().includes(keyword)
                ) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }

            });

        });

    }


    /* =========================
       DATA ANGGOTA
    ========================= */

    const members = {

        "Andi Setiawan": {
            initials: "AS",
            rt: "RT 01",
            phone: "0812-3456-7890",
            color: "green-avatar"
        },

        "Sri Wahyuni": {
            initials: "SW",
            rt: "RT 02",
            phone: "0813-4567-8901",
            color: "blue-avatar"
        },

        "Budi Santoso": {
            initials: "BS",
            rt: "RT 03",
            phone: "0814-5678-9012",
            color: "orange-avatar"
        },

        "Siti Rahma": {
            initials: "SR",
            rt: "RT 04",
            phone: "0815-6789-0123",
            color: "pink-avatar"
        },

        "Dedi Kurniawan": {
            initials: "DK",
            rt: "RT 05",
            phone: "0816-7890-1234",
            color: "gray-avatar"
        }

    };


    /* =========================
       OPEN MEMBER MODAL
    ========================= */

    function openMemberModal(name) {

        const member = members[name];

        if (!member || !modal) {
            return;
        }

        modalName.textContent = name;
        modalRT.textContent = member.rt;
        modalPhone.textContent = member.phone;

        modalAvatar.textContent =
            member.initials;

        modalAvatar.className =
            "modal-avatar avatar " +
            member.color;

        const phoneNumber =
            member.phone.replace(/[^0-9+]/g, "");

        modalCall.href =
            "tel:" + phoneNumber;

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    }


    /* =========================
       MEMBER BUTTON
    ========================= */

    document.querySelectorAll(".view-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const name =
                button.getAttribute("data-member");

            openMemberModal(name);

        });

    });


    /* =========================
       CLOSE MODAL
    ========================= */

    function closeModal() {

        if (!modal) {
            return;
        }

        modal.classList.remove("show");

        document.body.style.overflow = "";

    }


    if (modalClose) {

        modalClose.addEventListener(
            "click",
            closeModal
        );

    }


    if (modal) {

        modal.addEventListener("click", function (event) {

            if (event.target === modal) {
                closeModal();
            }

        });

    }


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeModal();
        }

    });


    /* =========================
       BUTTON FEEDBACK
    ========================= */

    document.querySelectorAll(".text-button").forEach(function (button) {

        button.addEventListener("click", function () {

            alert(
                "Fitur data lengkap dapat dikembangkan selanjutnya."
            );

        });

    });


    const addButton =
        document.querySelector(".green-button");

    if (addButton) {

        addButton.addEventListener("click", function () {

            alert(
                "Form tambah anggota dapat dikembangkan pada tahap berikutnya."
            );

        });

    }


    /* =========================
       CONSOLE CHECK
    ========================= */

    console.log(
        "Gadelan Rukun Dashboard berhasil dimuat."
    );

});
