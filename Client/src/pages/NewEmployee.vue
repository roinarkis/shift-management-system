<template>
    <div>
 <base-dialog :show="!!dialog" title="Message" @close="handleAlreadyExistError">
    <p>{{dialog}}</p>
</base-dialog> 
  <base-card>
   <p class="header1 padding">Sign up</p>
   <p class="header3">Please insert youre ID to register the system.</p>
    <label class ="input">ID:</label>
    <input type="text" v-model="id">
    <p v-if="!isValidId" class="error">{{errors[0]}}</p>
    <div>
      <base-button class="button" @click="validateId">Register</base-button>
    </div>
   </base-card>
   <base-spinner v-if="isLoading"></base-spinner>
</div>
</template>
<script>
export default {
    data(){
        return{
       errors :[],
       id: '',
       isValidId:true,
       dialog :null,
       isLoading: false

        }
    },
    methods:{
        async validateId(){
            this.errors =[];
          if(this.id.length != 9){
             this.isValidId = false;
             this.errors.push('You must have exactly 9 number in your id.');
          }
          else if(!/^[0-9]+$/.test(this.id)){
            this.isValidId = false;
            this.errors.push('you must type only numbers');
          }
          else{
            const jsonId = {
                id:this.id
            }
            this.isLoading = true;
            const response = await fetch('http://localhost:3000/users',{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(jsonId)
          });
          this.isLoading = false;
          const responseData = await response.json();
          this.dialog = responseData.message;
          }
        },
        handleAlreadyExistError(){
            this.dialog = null;
        }
    }
}
</script>

<style scoped>
.padding{
  padding-left:230px;
}
.input{
    margin-right: 10px;
}
.button{
    background-color: green;
    margin-top: 20px;
    margin-left: 0px;
}
.error{
    color:red;
}
</style>
