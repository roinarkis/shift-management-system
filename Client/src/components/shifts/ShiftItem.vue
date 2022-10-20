<template>
    <li>
        <h4>Start Time:  {{startTime.getHours()}}:{{startMinutes}}</h4>
        <h4>End Time: {{endTime.getHours()}}:{{endMinutes}}</h4>
        <h4>Duration (in hours): {{duriation}}</h4>
        <div class ="actions">
            <base-button link v-bind:to="shiftDetailsLink">View Full shift details</base-button>
        </div>

    </li>
</template>

<script>
import calcDurMixin from '../services/mixins/duriationCalculator'
export default ({
     created(){
       this.calcDuriation(this.startTime,this.endTime);
     },
     mixins:[calcDurMixin],
     props:['id','startTime','endTime'],
     computed:{
        startMinutes(){
           if(Number(this.startTime.getMinutes())<10){
            const newMin = '0'+(this.startTime.getMinutes());
            return newMin;
           }
           else{
            return String(this.startTime.getMinutes());
           }
        },
        endMinutes(){
          if(Number(this.endTime.getMinutes())<10){
            const newMin = '0'+(this.endTime.getMinutes());
            return newMin;
           }
           else{
            return String(this.endTime.getMinutes());
           }

        },
        shiftDetailsLink(){
            return this.$route.path + '/'+ this.id;
        }
     },
    })
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>