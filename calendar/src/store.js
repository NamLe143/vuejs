import { seedData } from './seed.js'
export const store = {
    state: {
        seedData
    },
    getActiveDay () {
        const activeDay = this.state.seedData.filter((day) => day.active)
        return activeDay[0];
    },
    setActiveDay (dayId) {
        this.state.seedData.map((dayObj) => {
            dayObj.id === dayId ? dayObj.active = true : dayObj.active = false;
        });        
    },
    editEvent (dayId, eventDetails) {
        this.resetEditOfAllEvents();
        const dayObjCurrent = this.state.seedData.filter(
            day => day.id === dayId
        );  
        const eventObj = dayObjCurrent[0].events.filter(
            event => event.details === eventDetails
        );
        eventObj[0].edit = true;

    },   
    resetEditOfAllEvents () {
        this.state.seedData.map((dayObj) => {
                dayObj.events.map((event) => {
                event.edit = false;
            });
        });
    },     
    submitEvent (eventDetails) {
        const activeDay = this.getActiveDay()
        activeDay.events.push({ "details": eventDetails, "edit": false });
    }
        
}