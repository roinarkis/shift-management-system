<template>
    <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
    <p>{{error}}</p>
</base-dialog>
<base-card>
<p class="header3">
 Please enter an ID than hit the "Check Shift" button.<br>
 After you have done that, you can page through the months/years and watch all your shifts.
 </p>
</base-card>
<section>
<shift-filter @form-submited="fetchUserShifts" @date-changed="setFilters"></shift-filter>
</section>
<section>
    
    <base-card>
    <base-spinner v-if="isLoading"></base-spinner>
     <p v-if="!isIDEmpty">looking for shifts for id: {{id}}</p>
    <p v-if="!hasShifts">No shifts available on this month, you can try to change months.</p>
    <ul v-if="hasShifts">
        <shift-item 
        v-for="shift in filterdShifts" 
        :key="shift.id"
        :id ="shift.id"
        :start-time ="shift.startTime"
        :end-time ="shift.endTime"
        ></shift-item>
    </ul>
    </base-card>
</section>
</div>
</template>


<script>
import ShiftItem from '../../components/shifts/ShiftItem.vue';
import ShiftFilter from '../../components/shifts/ShiftFilter.vue'
import BaseDialog from '../../components/UI/BaseDialog.vue'
export default {
    components:{ ShiftItem, ShiftFilter, BaseDialog },
    data(){
        return{
            Month:Date.now.Month,
            Year:Date.now.Year,
            id: null,
            error: null,
            isLoading :false
        }
    },
    created(){
        this.$store.dispatch('shifts/resetState');
    },
    computed:{
    filterdShifts(){
        if(this.id == null){
            return true;
        }
        const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
        const shifts = this.$store.getters['shifts/shifts'];
        return shifts.filter(shift=>{
            if(
            monthNames[shift.startTime.getMonth()] == this.Month&&
            shift.startTime.getFullYear() == this.Year&&
            Number(shift.endTime.getFullYear())> 1980 // end date start with the value of 1970
            ){
                return true;
            }
            else{
                return false;
            }
        });
    },
    hasShifts(){
        if(this.id == null){
            return true;
        }
         const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
          const shifts = this.$store.getters['shifts/shifts'];
       return shifts.find(shift=>  monthNames[shift.startTime.getMonth()] == this.Month&&
            shift.startTime.getFullYear() == this.Year && Number(shift.endTime.getFullYear())> 1980);
    },
    isIDEmpty(){
        if(!this.id){
            return true;
        }
        return false;
    },
 },
 methods:{
    setFilters(Year,Month){
        this.Month = Month;
        this.Year = Year;
    },
    handleError(){
        this.error =null;
        this.id = null;
    },
    async fetchUserShifts(Year,Month,id){
        this.$store.dispatch('shifts/resetState');
        try{
          this.isLoading =true;   
        await this.$store.dispatch('shifts/loadShifts',id,this.id);
        this.id =id;
        this.Year =Year;
        this.Month = Month;
        }
        catch(error){
            this.isLoading =false;
            this.error = error.message;
            this.$store.dispatch('shifts/resetState');
            this.id = null;
        }
        this.isLoading = false;
    },
   
 }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
