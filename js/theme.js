/*
==========================================
 Borderland SSC Tracker Pro
 theme.js
==========================================
*/

const Theme = {

    current: "light",

    init() {

        this.current = Storage.getTheme();

        this.apply(this.current);

        this.attachEvents();

    },

    apply(theme) {

        this.current = theme;

        document.body.classList.remove("light", "dark");

        document.body.classList.add(theme);

        Storage.saveTheme(theme);

        this.updateButton();

    },

    toggle() {

        if (this.current === "light") {

            this.apply("dark");

        } else {

            this.apply("light");

        }

    },

    updateButton() {

        const btn = document.getElementById("themeToggle");

        if (!btn) return;

        btn.textContent = this.current === "dark"
            ? "☀️"
            : "🌙";

    },

    attachEvents() {

        const btn = document.getElementById("themeToggle");

        if (!btn) return;

        btn.addEventListener("click", () => {

            this.toggle();

        });

    }

};

/* Initialize after page loads */

document.addEventListener("DOMContentLoaded", () => {

    Theme.init();

});
