const express = require('express');
const userRouter = express.Router();
const {getUserShifts,addEnterTimeShift, addExitShift,addNewUser} = require('./user.controller');
userRouter.get('/:id',getUserShifts);
userRouter.put('/:id',addEnterTimeShift);
userRouter.post('/:id',addExitShift);
userRouter.post('/',addNewUser);
module.exports = userRouter;