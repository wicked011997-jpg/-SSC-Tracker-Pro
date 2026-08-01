/*
==========================================
 Borderland SSC Tracker Pro
 dashboard.js
==========================================
*/

const Dashboard = {

    update() {

        this.updateProgress();

        this.updateTodayTarget();

        this.updateStatistics();

    },

    updateProgress() {

        const percent = Storage.getCompletionPercentage(
            Schedule.totalDays()
        );

        const progressCircle =
            document.getElementById("overallProgress");

        if (progressCircle) {

            progressCircle.textContent = percent + "%";

        }

    },

    updateStatistics() {

        const completed =
            Storage.getCompletedDays();

        const total =
            Schedule.totalDays();

        const completedCard =
            document.getElementById("completedDays");

        const remainingCard =
            document.getElementById("remainingDays");

        if (completedCard) {

            completedCard.textContent =
                completed + " / " + total;

        }

        if (remainingCard) {

            remainingCard.textContent =
                total - completed + " Days";

        }

    },

    updateTodayTarget() {

        const day =
            App.currentDay;

        const data =
            Schedule.get(day);

        if (!data) return;

        const target =
            document.getElementById("todayTarget");

        if (!target) return;

        target.innerHTML = `

            <strong>${data.block}</strong><br>

            ${data.title}<br><br>

            <b>GS:</b> ${data.gs}<br>

            <b>Reasoning:</b> ${data.reasoning.join(", ")}<br>

            <b>Grammar:</b> ${data.grammar}<br>

            <b>Vocabulary:</b> ${data.vocabulary}<br>

            <b>Maths:</b> ${data.maths}

        `;

    }

};
