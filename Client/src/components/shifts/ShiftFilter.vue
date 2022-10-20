<template>
    <base-card>
    <h4>Choose month</h4>
    <span class="filter-option">
        <my-month-picker @date-changed="setFilter"></my-month-picker>
    </span>
    <div :class="{invalid:idValidity ==='invalid'}">
    <form @submit.prevent="submitForm">
      <label>Please enter ID: </label>
      <input v-model="InputId" @blur="validateIdForInputChangeColor" type="numbers">
      <p v-if="errors.length > 0" class='invalid'>{{errors[0]}}</p>
      <div class="btn"><base-button @click="validateIdForInputChangeColor">Check Shifts</base-button>
      </div>
    </form>
    </div>
    </base-card>
</template>
<script>
import MyMonthPicker from '../services/MyMonthPicker.vue'

export default {
    emits:['form-submited','date-changed'],
  components: { MyMonthPicker},
    data(){
        return{
           error: null,
            InputId:'',
            Month:Date.now.Month,
            Year:Date.now.Year,
            idValidity:'pending',
            errors: [],
        };
    },
    methods:{
        setFilter(month,year){
            this.Month = month;
            this.Year = year;
            this.$emit('date-changed',this.Year,this.Month);
        },
        submitForm(){
          this.errors =[];
          if(this.InputId.length != 9){
             this.errors.push('You must have exactly 9 number in your id.');
             this.idValidty ='invalid'
          }
          else if(!/^[0-9]+$/.test(this.InputId)){
            this.errors.push('you must type only numbers');
            this.idValidity = 'invalid';
          }
          else{
            this.idValidity='valid';
         this.$emit('form-submited',this.Year,this.Month,this.InputId);
          }
          
        },
        validateIdForInputChangeColor(){
          if(this.InputId===''){
            this.idValidity="invalid";
          }else{
            this.idValidity="valid";
          }
          }
        }
    }
</script>
<style scoped>
h4 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}
.invalid input{
  border-color: red;
}
.invalid{
  color: red;
}
.invalid label{
  color: red;
}
.btn{
  padding-top: 10px;
}
</style>