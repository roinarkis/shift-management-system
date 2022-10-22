<template>
  <div>
    <base-dialog :show="!!exitSucceded" title="Succesfuly exit shift" @close="handleSuccsesExit">
    <p>{{exitSucceded}}</p>
</base-dialog>
<base-dialog :show="!!enterSucceded" title="Succesfuly entered shift" @close="handleSuccsesEnter">
    <p>{{enterSucceded}}</p>
</base-dialog>
  <base-dialog :show="!!cantExitError" title="Can not exit shift" @close="handleCantExitError">
    <p>{{cantExitError}}</p>
</base-dialog>
  <base-dialog :show="!!cantEnterError" title="Can not enter shift" @close="handleCantEnterError">
    <p>{{cantEnterError}}</p>
</base-dialog>
    <base-card>
     <p class="header3"> Please verify your id before you try to enter/exit shift. <br>
     </p>
    </base-card>
    <base-card>
    <p>Enter/Exit shift</p>
    <label>Please enter ID: </label>
      <input v-model="id"  type="numbers">
      <div >
      <label  v-if="!isIdSubmited" class="alert">{{errors[0]}}</label>
      <label  v-else class="submited">Registerd Succsesfuly to ID: {{submitedId}}</label>
      <p>
      <router-link to="/new/employee" v-if="toNewEmployee">Go to new employee</router-link>
       </p>

      </div>
      <div class ="buttons">

    <base-button class="enter" @click="setEnterDate">Enter Shift</base-button>
    <base-button class="exit" @click="setExitDate">Exit Shift</base-button>
    <base-button @click ="submitId">Verify Id</base-button>
  </div>
    </base-card>
    <base-spinner v-if="isLoading"></base-spinner>
  </div>
</template>
<script>
import moment from 'moment';
import BaseButton from '../components/UI/BaseButton.vue';
import BaseDialog from '../components/UI/BaseDialog.vue';
export default{
    data() {
        return {
            exitSucceded:null,
            enterSucceded: null,
            cantExitError:null,
            cantEnterError: null,
            errors: [],
            id: '',
            isIdSubmited: false,
            submitedId: '',
            isLoading: false,
            toNewEmployee: false
        };
    },
    methods: {
        async submitId(){
          this.toNewEmployee =false;
          this.errors =[];
          if(this.id.length != 9){
            this.isIdSubmited = false;
             this.errors.push('You must have exactly 9 number in your ID.');
            }
          else if(!/^[0-9]+$/.test(this.id)){
            this.isIdSubmited= false;
            this.errors.push('you must type only numbers');
          }
          else{
            this.isLoading = true;
            const response = await fetch(`http://localhost:3000/users/${this.id}`);
            if(response.ok){
              this.submitedId = this.id;
              this.isIdSubmited = true;
            }
            else{
              this.errors.push('This id is not registred, you can try our New employee tab :)');
              this.toNewEmployee = true;
              this.isIdSubmited = false;
            }
            this.isLoading =false;
          }
        },
        handleCantEnterError(){
          this.cantEnterError = null;
        },
        handleSuccsesEnter(){
          this.enterSucceded = null;
        },
        handleSuccsesExit(){
          this.exitSucceded = null;
        },
        handleCantExitError(){
          this.cantExitError = null;
        },
       async setEnterDate() {
          if(!this.isIdSubmited){
            this.errors =[];
            this.errors.push('You must verify Id before enter/exit a shift.');
          }
          else{
            var td=new Date().toISOString().split('T')[0];
            var t=new Date().toTimeString().split(' ')[0];
          const shift ={
            id:'',
            startTime: moment(new Date(td+' '+t)),
            endTime: null
          }
          this.isLoading = true;
          const response = await fetch(`http://localhost:3000/users/${this.submitedId}`,{
            method:"PUT",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(shift)
          });
          this.isLoading = false;
          const responseData = await response.json();
           if(response.ok){
              this.enterSucceded ="You have succesfuly entred the shift :)"
           }
           else{
            this.cantEnterError = responseData.error;
           }
          }
        },
       async setExitDate() {
          if(!this.isIdSubmited){
            this.errors =[];
            this.errors.push('You must submit Id before enter/exit a shift.');
          }
          else{
            var td= new Date().toISOString().split('T')[0];
            var t= new Date().toTimeString().split(' ')[0];
           const endTime = moment(new Date(td+' '+t));
           const endShift ={
             endTime: endTime
           }
           this.isLoading =true;
           const response = await fetch(`http://localhost:3000/users/${this.submitedId}`,{
            method:"POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify(endShift)
          });
          const responseData = await response.json();
          if(response.ok){
            this.exitSucceded ="You have succesfuly exit the shift :)"
          }
          else{
            this.cantExitError =responseData.error;
          }
          this.isLoading = false;
        }
        }
    },
    components: { BaseButton,BaseDialog }
}
</script>

<style scoped>
.enter{
    background-color: green;
}
.exit{
    background-color: red;
}
.buttons{
  margin-top: 10px;
}
.alert{
  color:red;
}
.submited{
  color:green
}
</style>