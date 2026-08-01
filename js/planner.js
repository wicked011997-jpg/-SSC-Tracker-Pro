/*
==========================================
 Borderland SSC Tracker Pro
 planner.js
==========================================
*/

const Planner = {

    currentDay: 1,

    load(day) {

        this.currentDay = day;

        const data = Schedule.get(day);

        if (!data) return;

        document.getElementById("plannerDayTitle").textContent =
            "Day " + day + " • " + data.title;

        const container = document.getElementById("plannerTasks");

        container.innerHTML = "";

        const tasks = [

            {
                key: "gs",
                label: "📚 General Studies",
                value: data.gs
            },

            {
                key: "reasoning",
                label: "🧩 Reasoning",
                value: data.reasoning.join(", ")
            },

            {
                key: "grammar",
                label: "📝 English Grammar",
                value: data.grammar
            },

            {
                key: "vocabulary",
                label: "📖 Vocabulary",
                value: data.vocabulary
            },

            {
                key: "maths",
                label: "➗ Maths",
                value: data.maths
            }

        ];

        if (data.cct) {

            tasks.push({

                key: "cct",

                label: "🧠 CCT Test",

                value: "Complete today's CCT"

            });

        }

        if (data.megaTest) {

            tasks.push({

                key: "mega",

                label: "🏆 Mega Test",

                value: data.title

            });

        }

        tasks.forEach(task => {

            container.appendChild(

                this.createTask(task)

            );

        });

    },

    createTask(task) {

        const label = document.createElement("label");

        label.className = "task";

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = Storage.isTaskCompleted(

            this.currentDay,

            task.key

        );

        checkbox.addEventListener("change", () => {

    Storage.markTask(
        this.currentDay,
        task.key,
        checkbox.checked
    );

    if (typeof Dashboard !== "undefined") {
        Dashboard.update();
    }

    if (typeof Calendar !== "undefined") {
        Calendar.render();
    }

});

        const text = document.createElement("span");

        text.innerHTML =

            "<strong>" +

            task.label +

            "</strong><br>" +

            task.value;

        label.appendChild(checkbox);

        label.appendChild(text);

        return label;

    }

};
