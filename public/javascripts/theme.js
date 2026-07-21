document.addEventListener("DOMContentLoaded", () => {

    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) return;


    const savedTheme = localStorage.getItem("theme");


    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "Light Mode";
    }


    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark = document.body.classList.contains("dark-mode");


        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );


        themeToggle.textContent = isDark
            ? "Light Mode"
            : "Dark Mode";

    });

});