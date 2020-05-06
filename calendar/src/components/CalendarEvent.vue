
<template>
    <div class="day-event" :style="getEventBackgroundColor">
        <div v-if="!event.edit">
            <span class="has-text-centered details">{{ event.details }}</span>
            <div class="has-text-centered icons">
                <font-awesome-icon icon="pen-square"  @click="editEvent(day.id, event.details)"/>
                <font-awesome-icon icon="trash" />
            </div>
        </div>
        <div v-else>
            <span class="has-text-centered details">{{ event.details }}</span>
            <div class="has-text-centered icons">
                <font-awesome-icon icon="check" />
            </div>
        </div>
    </div>
</template>
<script>
import { store } from '../store.js';

export default {
    name: 'CalendarEvent',
    props: {
        event: null,
        day: null 
    },
    computed: {
         getEventBackgroundColor() {
            const colors = ['#FF9999', '#85D6FF', '#27ae60'];
            let randomColor = colors[Math.floor(Math.random() * colors.length)];
            return `background-color: ${randomColor}`;
        }
    },
    methods: {
        editEvent (dayId, eventDetails) {
            store.editEvent(dayId, eventDetails)
        }
    },

}
</script>
<style lang="scss" scoped>
    .day-event {
        margin-bottom: 5px;
    }
</style>