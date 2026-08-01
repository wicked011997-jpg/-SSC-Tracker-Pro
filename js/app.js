/*
==========================================
 Borderland SSC Tracker Pro
 app.js
==========================================
*/

const App = {

    currentDay: 1,

    init() {

        console.log("Borderland SSC Tracker Pro Started");

        // Initialize modules
        if (typeof Theme !== "undefined") {
            Theme.init();
        }

        if (typeof Calendar !== "undefined") {
            Calendar.init();
        }

    },

    setCurrentDay(day) {

        this.currentDay = day;

        console.log("Current Day:", day);

        // Planner
        if (typeof Planner !== "undefined") {
            Planner.load(day);
        }

        // Dashboard
        if (typeof Dashboard !== "undefined") {
            Dashboard.update();
        }

    }

};

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});
