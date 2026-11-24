const menuButton = document.getElementById("nav-icon1");
new MutationObserver(() => menuButton.setAttribute("aria-expanded", document.body.classList.contains("open"))).observe(document.body, { attributes: true, attributeFilter: ["class"] });
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("open")) {
        document.body.classList.remove("open");
        menuButton.focus();
    }
});
