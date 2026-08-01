/*
==========================================
 Borderland SSC Tracker Pro
 notes.js
==========================================
*/

const Notes = {

    currentDay: 1,

    init() {

        const textarea =
            document.getElementById("dailyNotes");

        if (!textarea) return;

        // Auto save while typing
        textarea.addEventListener("input", () => {

            Storage.saveNotes(
                this.currentDay,
                textarea.value
            );

        });

        // Save button
        const saveBtn =
            document.getElementById("saveNotes");

        if (saveBtn) {

            saveBtn.addEventListener("click", () => {

                Storage.saveNotes(
                    this.currentDay,
                    textarea.value
                );

                alert("✅ Notes saved!");

            });

        }

        // Clear button
        const clearBtn =
            document.getElementById("clearNotes");

        if (clearBtn) {

            clearBtn.addEventListener("click", () => {

                if (!confirm("Clear notes for this day?")) return;

                textarea.value = "";

                Storage.saveNotes(
                    this.currentDay,
                    ""
                );

            });

        }

    },

    load(day) {

        this.currentDay = day;

        const textarea =
            document.getElementById("dailyNotes");

        if (!textarea) return;

        textarea.value =
            Storage.getNotes(day);

    }

};
