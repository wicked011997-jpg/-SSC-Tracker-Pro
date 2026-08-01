/*
==========================================
 Borderland SSC Tracker Pro
 navigation.js
==========================================
*/

const Navigation = {

    init() {

        const menuItems = document.querySelectorAll("nav li");

        menuItems.forEach(item => {

            item.addEventListener("click", () => {

                this.showPage(item.dataset.page);

            });

        });

    },

    showPage(page) {

        // Hide all pages
        document.querySelectorAll(".page").forEach(section => {

            section.style.display = "none";

        });

        // Show selected page
        const selected = document.getElementById(page);

        if (selected) {

            selected.style.display = "block";

        }

        // Update active menu
        document.querySelectorAll("nav li").forEach(item => {

            item.classList.remove("active");

        });

        document.querySelector(`nav li[data-page="${page}"]`)
            ?.classList.add("active");

    }

};
