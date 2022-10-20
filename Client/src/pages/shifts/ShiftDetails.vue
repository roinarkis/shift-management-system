<template>
   <div>
    <section>
        <base-card>
        <h4>Year:{{Year}}</h4>
        <h4>month:{{Month}}</h4>
        <h4>Day:{{Day}}</h4>
        <h4>Start Time: {{startTime.getHours()}}:{{startMintues}}</h4>
        <h4>End Time: {{endTime.getHours()}}:{{endMintues}}</h4>
        <h4>Duration (in hours): {{duriation}}</h4>
        </base-card>
    </section>
   </div>
</template>

<script>
import calcDurMixin from '../../components/services/mixins/duriationCalculator';
export default {
     mixins:[calcDurMixin],
     props:['id'],
     data(){
        return {selectedShift: null}
     },
     computed:{
       startMintues(){
         if(Number(this.selectedShift.startTime.getMinutes())<10){
            var newStartTimeMintues = '0' +(this.selectedShift.startTime.getMinutes());
            return newStartTimeMintues;
         }
         else{
            return (this.selectedShift.startTime.getMinutes());
         }
         
       },
       endMintues(){
         if(Number(this.selectedShift.endTime.getMinutes())<10){
            var newEndTimeMintues = '0' +(this.selectedShift.endTime.getMinutes());
            return newEndTimeMintues;
         }
         else{
            return (this.selectedShift.endTime.getMinutes());
         }

       },
        Year(){ return this.selectedShift.startTime.getFullYear()},
        Month(){ 
         const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
         return monthNames[this.selectedShift.startTime.getMonth()+1]
      },
        Day() {return this.selectedShift.startTime.getDate()},
        startTime(){return this.selectedShift.startTime},
        endTime() {return this.selectedShift.endTime}
   },
     created(){
        this.selectedShift=this.$store.getters['shifts/shifts'].find(shift=>shift.id == this.id);
        this.calcDuriation(this.selectedShift.startTime,this.selectedShift.endTime);

     }
}
</script>

