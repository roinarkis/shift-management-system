export default {
    async loadShifts(context,id,oldId){
        if(oldId === id){ // "cache" id up to date
            return;
        }
        const response = await fetch(`http://localhost:3000/users/${id}`);
        const responseData = await response.json();
        if(!response.ok){
            const error = new Error('Id does not exists. Please try a diffrent id or register to this site using this id.');
            throw error;
        }
        else{
       const user ={
        id: id,
        shifts : []
       };
        for(let i=0;i<responseData.shifts.length;i++){
            const shift ={
                id: responseData.shifts[i].id,
                startTime:new Date(responseData.shifts[i].startTime),
                endTime:new Date(responseData.shifts[i].endTime)

            }
            user.shifts.push(shift);
        }
       context.commit('setShifts',user);
    }
        
    },
    resetState(context){ 
        const shifts =[];
      context.commit('setShifts',shifts);
      context.commit('resetId');
    }

};