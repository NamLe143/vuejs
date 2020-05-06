
<template>
    <div id="calendar-entry" class="container">
       <div class="calendar-entry-note">
            <input type="text" placeholder="New Event" v-model="inputEntry" @keyup="activeError = inputEntry.trim() ? false : isValid"/>
            <p class="calendar-entry-day">
                Day of event: <span class="bold">{{ titleOfActiveDay }}</span>
            </p>
            <a class="btn btn-primary" @click="submitEvent(inputEntry)">Submit</a>
        </div>
        <p class="error" v-if="activeError">
            You must type something first!
        </p>
    </div>
</template>
<script>
import { store } from '../store.js';

export default {
    name: 'CalendarEntry',
    data() {
        return {
            inputEntry: '',
            activeError: false,
            isValid: false
        }
    },
    computed: {
        titleOfActiveDay () {
            return store.getActiveDay().fullTitle;
        }
    },
    methods: {
        submitEvent (eventDetailsName) {
            this.isValid = true,
            this.activeError = eventDetailsName.trim() ? false : true;
            if (eventDetailsName.trim()) {
                store.submitEvent(eventDetailsName);
                this.inputEntry = '';
                this.activeError = false;
                this.isValid = false;
            }
        }
    },
}
</script>
<style lang="scss" scoped>
#calendar-entry {
  background: #FFF;
  border: 1px solid #42b883;
  border-radius: 10px;
  max-width: 300px;
  margin: 0 auto;
  padding: 20px;
  .calendar-entry-note {
    input {
      width: 200px;
      font-weight: 600;
      border: 0;
      border-bottom: 1px solid #CCC;
      font-size: 15px;
      height: 30px;
      margin-bottom: 10px;
      &:focus {
        outline: none;
      }
    }
    .calendar-entry-day {
      color: #42b883;
      font-size: 12px;
      margin-bottom: 10px;
      padding-bottom: 5px;
      .bold {
        font-weight: 600;
      }
    }
    .submit {
      display: block;
      margin: 0 auto;
    }
    .btn-primary {
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
        border: 1px solid #42b883;
        &:hover {
            background: #42b883;
            color: #fff;
        }
    }
  }
  .error {
    color: red; 
    font-size: 13px;
  }
}
</style>