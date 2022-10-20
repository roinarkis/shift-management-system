<template>
  <month-picker @change="showDate"></month-picker>
</template>

<script>
import { MonthPicker } from 'vue-month-picker'

export default {
    emits:['date-changed'],
	data() {
		return {
			date: {
				from: null,
				to: null,
				month: null,
				year: null
			}
		}
	},
	components: {
		MonthPicker
	},
	methods: {
		showDate (date) {
			this.date = date
            this.setFilter()
		},
         setFilter(){
            this.$emit('date-changed',this.date.month,this.date.year);
        }
	}
  
}
</script>