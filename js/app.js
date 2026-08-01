/*
==========================================
 Borderland SSC Tracker Pro
 app.js
==========================================
*/

const App = {

    currentDay:
Number(localStorage.getItem("selectedDay")) || 1,

    init() {

        console.log("Borderland SSC Tracker Pro Started");

        // Initialize modules
        if (typeof Theme !== "undefined") {
            Theme.init();
        }

        if (typeof Calendar !== "undefined") {
            Calendar.init();
        }
     if (typeof Navigation !== "undefined") {
            Navigation.init();
            Navigation.showPage("dashboard");
        }
        if (typeof Planner !== "undefined") {
            Planner.load(App.currentDay);
        }
     if (typeof Notes !== "undefined") {

    Notes.init();

    Notes.load(App.currentDay);

}
        if (typeof Dashboard !== "undefined") {
            Dashboard.update();
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
        // Notes
        if (typeof Notes !== "undefined") {
            Notes.load(day);
}

    }

};

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});
