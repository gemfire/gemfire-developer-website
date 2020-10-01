
var savedTheme = localStorage.getItem("light-dark-mode-storage") || "dark";
changeTheme(savedTheme);
function changeTheme(mode) {
    if (mode === "light") {
        var head = document.head;
        var link = document.createElement("link");

        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = "{{ printf "%s" "/css/light-theme.css" | relURL }}";
        link.id = "light-theme"

        head.prepend(link);

        document.documentElement.classList.add('light-mode')
    }
}
