/*
==========================================
 Borderland SSC Tracker Pro
 calendar.js
==========================================
*/

const Calendar = {

    currentDay: 1,

    init() {

        this.render();

        this.attachEvents();

    },

    render() {

        const grid = document.getElementById("calendarGrid");

        if (!grid) return;

        grid.innerHTML = "";

        Schedule.all().forEach(day => {

            const card = document.createElement("div");

            card.className = "calendar-day";

            card.dataset.day = day.day;

            /* Day Number */

            const number = document.createElement("h3");
            number.textContent = "Day " + day.day;

            /* Block */

            const block = document.createElement("p");
            block.textContent = day.block;

            /* Subject */

            const title = document.createElement("small");
            title.textContent = day.title;

            card.appendChild(number);
            card.appendChild(block);
            card.appendChild(title);

            /* Mega Test */

            if(day.megaTest){

                card.classList.add("mega-test");

            }

            /* CCT */

            if(day.cct){

                card.classList.add("cct-day");

            }

            /* Completed */

            const progress = Storage.getDayProgress(day.day);

            if(this.isCompleted(progress)){

                card.classList.add("completed");

            }

            /* Selected */

            if(day.day === this.currentDay){

                card.classList.add("today");

            }

            card.addEventListener("click", ()=>{

                this.selectDay(day.day);

            });

            grid.appendChild(card);

        });

    },

    selectDay(day){

        this.currentDay = day;

    this.render();

    App.setCurrentDay(day);

    if(typeof Navigation!=="undefined"){

        Navigation.showPage("planner");

    }

},

    isCompleted(progress){

        const tasks = progress.completed || {};

        if(Object.keys(tasks).length===0){

            return false;

        }

        return Object.values(tasks).every(v=>v===true);

    },

    nextDay(){

        if(this.currentDay<65){

            this.currentDay++;

            this.selectDay(this.currentDay);

        }

    },

    previousDay(){

        if(this.currentDay>1){

            this.currentDay--;

            this.selectDay(this.currentDay);

        }

    },

    attachEvents(){

        const next=document.getElementById("nextWeek");

        const prev=document.getElementById("prevWeek");

        const today=document.getElementById("todayBtn");

        if(next){

            next.addEventListener("click",()=>{

                this.nextDay();

            });

        }

        if(prev){

            prev.addEventListener("click",()=>{

                this.previousDay();

            });

        }

        if(today){

            today.addEventListener("click",()=>{

                this.selectDay(1);

            });

        }

    }

};

document.addEventListener("DOMContentLoaded",()=>{

    Calendar.init();

});
