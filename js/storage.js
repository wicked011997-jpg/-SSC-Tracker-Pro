/*
==========================================
 Borderland SSC Tracker Pro
 storage.js
 Version 1.0
==========================================
*/

const Storage = {

    KEYS: {
        PROGRESS: "ssc_progress",
        NOTES: "ssc_notes",
        SETTINGS: "ssc_settings",
        THEME: "ssc_theme"
    },

    /* -------------------------
       Progress
    ------------------------- */

    getProgress() {

        return JSON.parse(
            localStorage.getItem(this.KEYS.PROGRESS)
        ) || {};

    },

    saveProgress(progress) {

        localStorage.setItem(
            this.KEYS.PROGRESS,
            JSON.stringify(progress)
        );

    },

    markTask(day, task, completed = true) {

        const progress = this.getProgress();

        if (!progress[day]) {

            progress[day] = {
                completed: {},
                notes: ""
            };

        }

        progress[day].completed[task] = completed;

        this.saveProgress(progress);

    },

    isTaskCompleted(day, task) {

        const progress = this.getProgress();

        return progress?.[day]?.completed?.[task] || false;

    },

    getDayProgress(day) {

        const progress = this.getProgress();

        return progress[day] || {
            completed: {},
            notes: ""
        };

    },

    /* -------------------------
       Notes
    ------------------------- */

    saveNotes(day, text) {

        const progress = this.getProgress();

        if (!progress[day]) {

            progress[day] = {
                completed: {},
                notes: ""
            };

        }

        progress[day].notes = text;

        this.saveProgress(progress);

    },

    getNotes(day) {

        const progress = this.getProgress();

        return progress?.[day]?.notes || "";

    },

    /* -------------------------
       Theme
    ------------------------- */

    saveTheme(theme) {

        localStorage.setItem(
            this.KEYS.THEME,
            theme
        );

    },

    getTheme() {

        return localStorage.getItem(
            this.KEYS.THEME
        ) || "light";

    },

    /* -------------------------
       Settings
    ------------------------- */

    saveSettings(settings) {

        localStorage.setItem(
            this.KEYS.SETTINGS,
            JSON.stringify(settings)
        );

    },

    getSettings() {

        return JSON.parse(
            localStorage.getItem(this.KEYS.SETTINGS)
        ) || {

            goalHours: 6

        };

    },

    /* -------------------------
       Statistics
    ------------------------- */

    getCompletedDays() {

    const progress = this.getProgress();

    let completed = 0;

    Schedule.all().forEach(day => {

        const tasks = progress[day.day]?.completed || {};

        const required = [

            "gs",
            "reasoning",
            "grammar",
            "vocabulary",
            "maths"

        ];

        if(day.cct){

            required.push("cct");

        }

        if(day.megaTest){

            required.push("mega");

        }

        const done = required.every(task => tasks[task]);

        if(done){

            completed++;

        }

    });

    return completed;

},

    getCompletionPercentage(totalDays = 65) {

        const completed = this.getCompletedDays();

        return Math.round(
            completed / totalDays * 100
        );

    },

    /* -------------------------
       Export
    ------------------------- */

    exportData() {

        return {

            progress: this.getProgress(),

            settings: this.getSettings(),

            theme: this.getTheme(),

            exportedAt: new Date().toISOString()

        };

    },

    importData(data) {

        if (data.progress) {

            this.saveProgress(data.progress);

        }

        if (data.settings) {

            this.saveSettings(data.settings);

        }

        if (data.theme) {

            this.saveTheme(data.theme);

        }

    },

    /* -------------------------
       Reset
    ------------------------- */

 getTaskCompletion(day){

    const progress=this.getDayProgress(day);

    const tasks=progress.completed;

    return Object.values(tasks).filter(Boolean).length;

},   
 getSubjectProgress(subject) {

    let total = 0;
    let completed = 0;

    Schedule.all().forEach(day => {

        if (day[subject] !== undefined) {

            total++;

            if (this.isTaskCompleted(day.day, subject)) {
                completed++;
            }

        }

    });

    return {
        completed,
        total,
        percent: total === 0 ? 0 : Math.round((completed / total) * 100)
    };

},
 resetAll() {

        if (
            confirm(
                "Delete all saved progress?"
            )
        ) {

            localStorage.removeItem(this.KEYS.PROGRESS);

            localStorage.removeItem(this.KEYS.NOTES);

            localStorage.removeItem(this.KEYS.SETTINGS);

            localStorage.removeItem(this.KEYS.THEME);

            location.reload();

        }

    }

};
