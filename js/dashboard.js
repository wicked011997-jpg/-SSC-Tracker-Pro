/*
==========================================
 Borderland SSC Tracker Pro
 dashboard.js
==========================================
*/

const Dashboard = {

    update() {

        this.updateProgress();
        this.updateStatistics();
        this.updateTodayTarget();
        this.updateSubjectBars();

    },

    /* -----------------------------
       Overall Progress
    ----------------------------- */

    updateProgress() {

        const percent = Storage.getCompletionPercentage(
            Schedule.totalDays()
        );

        const circle = document.getElementById("overallProgress");

        if (circle) {

            circle.textContent = percent + "%";

        }

    },

    /* -----------------------------
       Statistics
    ----------------------------- */

    updateStatistics() {

        const completed = Storage.getCompletedDays();

        const total = Schedule.totalDays();

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
                (total - completed) + " Days";

        }

    },

    /* -----------------------------
       Today's Target
    ----------------------------- */

    updateTodayTarget() {

        const data = Schedule.get(App.currentDay);

        const target =
            document.getElementById("todayTarget");

        if (!target || !data) return;

        target.innerHTML = `
<strong>${data.block}</strong><br>
${data.title}<br><br>

<b>GS:</b> ${data.gs}<br>
<b>Reasoning:</b> ${data.reasoning.join(", ")}<br>
<b>Grammar:</b> ${data.grammar}<br>
<b>Vocabulary:</b> ${data.vocabulary}<br>
<b>Maths:</b> ${data.maths}
`;

    },

    /* -----------------------------
       Subject Progress Bars
    ----------------------------- */

    updateSubjectBars() {

    const subjects = [
        ["gs", "gsBar"],
        ["reasoning", "reasoningBar"],
        ["grammar", "englishBar"],
        ["vocabulary", "vocabBar"],
        ["maths", "mathBar"]
    ];

    subjects.forEach(([subject, id]) => {

        const result = Storage.getSubjectProgress(subject);

        const bar = document.getElementById(id);

        if (!bar) return;

        bar.style.width = result.percent + "%";
        bar.textContent = result.percent + "%";

    });

}

};
