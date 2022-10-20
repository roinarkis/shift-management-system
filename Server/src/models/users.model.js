const usersDB = require('./users.mongo');
async function addEnterShiftModel(shift,userId){
  
    await usersDB.updateOne({
        id:userId
    },
    {$push:{"shifts":shift}});
}
async function addExitShiftModel(endTime,userId,shiftId){
    await usersDB.updateOne({
        id:userId
    },
    {
        $set:{
        "shifts.$[elemX].endTime": endTime
         }
    },
    {
        strict: false,
        arrayFilters:[
            {
             "elemX.id" : shiftId
            }
        ]
    });
     

}
function addNewUserModel(id){
    const userForDB ={
     id:id,
    shifts:[]
    };
    usersDB.create(userForDB);

}
module.exports = {
    usersDB,
    addEnterShiftModel,
    addExitShiftModel,
    addNewUserModel
};