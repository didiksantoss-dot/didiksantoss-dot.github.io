document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const mobileToggle = document.getElementById("mobileToggle");
    const sidebar = document.getElementById("sidebar");
    const globalSearch = document.getElementById("globalSearch");
    const modal = document.getElementById("memberModal");
    const modalClose = document.getElementById("modalClose");

    // Dark mode
    const savedTheme = localStorage.getItem("arisan-theme");
    if (savedTheme === "dark") {
        body.classList.add("dark");
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark");
        const dark = body.classList.contains("dark");
        localStorage.setItem("arisan-theme", dark ? "dark" : "light");
        themeToggle.innerHTML = dark
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    });

    // Mobile sidebar
    mobileToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", () => {
            document.querySelectorAll(".nav-item").forEach(x => x.classList.remove("active"));
            item.classList.add("active");
            sidebar.classList.remove("open");
        });
    });

    // Search anggota / content
    globalSearch.addEventListener("input", e => {
        const keyword = e.target.value.trim().toLowerCase();

        document.querySelectorAll("#memberTable tbody tr").forEach(row => {
            const name = row.dataset.name.toLowerCase();
            row.style.display = name.includes(keyword) ? "" : "none";
        });

        document.querySelectorAll(".nav-item").forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.opacity = keyword && !text.includes(keyword) ? ".55" : "1";
        });
    });

    // Member modal
    const memberData = {
        "Andi Setiawan": ["RT 01", "0812-3456-7890", "AS", "purple"],
        "Sri Wahyuni": ["RT 02", "0813-4567-8901", "SW", "green"],
        "Budi Santoso": ["RT 03", "0814-5678-9012", "BS", "orange"],
        "Siti Rahma": ["RT 04", "0815-6789-0123", "SR", "pink"],
        "Dedi Kurniawan": ["RT 05", "0816-7890-1234", "DK", "gray"]
    };

    document.querySelectorAll(".view-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const name = btn.dataset.member;
            const data = memberData[name];
            if (!data) return;

            document.getElementById("modalName").textContent = name;
            document.getElementById("modalRT").textContent = data[0];
            document.getElementById("modalPhone").textContent = data[1];

            const avatar = document.querySelector(".modal-avatar");
            avatar.textContent = data[2];
            avatar.className = "avatar modal-avatar " + data[3];

            document.getElementById("modalCall").href = "tel:" + data[1].replace(/[^0-9+]/g, "");
            modal.classList.add("show");
        });
    });

    function closeModal() {
        modal.classList.remove("show");
    }

    modalClose.addEventListener("click", closeModal);
    modal.addEventListener("click", e => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            closeModal();
            sidebar.classList.remove("open");
        }
    });

    // Active menu follows section scrolling
    const sections = [...document.querySelectorAll("[id]")].filter(el =>
        ["dashboard", "anggota", "iuran", "jadwal", "penerima", "pengumuman", "galeri", "kontak"].includes(el.id)
    );

    const observer = new IntersectionObserver(entries => {
        const visible = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const target = document.querySelector(`.nav-item[href="#${visible.target.id}"]`);
        if (target) {
            document.querySelectorAll(".nav-item").forEach(x => x.classList.remove("active"));
            target.classList.add("active");
        }
    }, { rootMargin: "-30% 0px -60% 0px", threshold: [0, .2, .5] });

    sections.forEach(section => observer.observe(section));
});
