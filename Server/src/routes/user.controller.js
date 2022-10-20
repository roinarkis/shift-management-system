const {usersDB,addEnterShiftModel,addExitShiftModel,addNewUserModel} = require('../models/users.model');
async function getUserShifts(req,res) {
    const id = req.params.id;
    const user = await usersDB.findOne({
      id:id
    },{
      '_id':0,'__v':0
    })
    if(user){
      return res.status(200).json(user);
    }
    else{
      return res.status(404).json({
        error: 'Not Found'
       });
    }
   }

async function addExitShift(req,res){
  const endShift = req.body;
  const userId = req.params.id;
  endShift.endTime = new Date(endShift.endTime);
   const selectedUser = await usersDB.findOne({
    id:userId
   });
   if(selectedUser.shifts.length ===0){
    return res.status(404).json({
      error: "you need to enter shift before exit"
    })
   }
  if(!selectedUser.shifts[selectedUser.shifts.length-1].endTime){
    if(Number(selectedUser.shifts[selectedUser.shifts.length-1].startTime.getDate())+1< Number(endShift.endTime.getDate())){ // if the diffrence between start and end time of shift is more than a day
       return res.status(404).json({error:'You entred the shift more than 2 days ago. Please notify your superiors'})
    }
    addExitShiftModel(endShift.endTime,userId,String(selectedUser.shifts.length));
    return res.status(200).json(endShift.endTime);
  }
  else{
    return res.status(404).json({
      error: "you need to enter shift before exit"
    })
  }



}
async function addNewUser(req,res){
   const newUserId = req.body.id;
   if(await usersDB.findOne({
     id:newUserId
   }))
   {
    return res.status(404).json({
    message:"This id is already registred. Please try again"
    })
 }
   else{
    addNewUserModel(newUserId);
    return res.status(200).json({
      message: "Id Registred Successfully"
    })

   }
}
async function addEnterTimeShift(req,res){
  const shift ={
      id : req.body.id,
      startTime: req.body.startTime,
      endTime: null,
  }
  const userId = req.params.id;
  const selectedUser = await usersDB.findOne({
    id:userId
  });
  let newShiftId = 1;
  if(selectedUser.shifts.length > 0){
    newShiftId = selectedUser.shifts.length +1;
  }
   shift.id = String(newShiftId);
   shift.startTime = new Date(shift.startTime);
  if(selectedUser.shifts.length ===0){
    addEnterShiftModel(shift,userId)
    return res.status(200).json(shift);
  }
  if(!selectedUser.shifts[selectedUser.shifts.length-1].endTime)
  {
    return res.status(404).json({
      error: `ID ${userId} already in a shift. You can try exit the shift.`
    })
  }
  else{
    addEnterShiftModel(shift,userId)
    return res.status(200).json(shift);
   
}
}
module.exports = {getUserShifts,
addEnterTimeShift,
addExitShift,
addNewUser};