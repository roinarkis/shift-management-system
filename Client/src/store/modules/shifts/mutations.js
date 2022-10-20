export default {
 setShifts(state,payload){
  state.shifts =[];
  state.shifts = payload.shifts;
  state.id = payload.id;
 },
 resetId(state){
    state.id ='';
 }
}