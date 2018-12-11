const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
   name: {
       type: String,
       required: true
   },
   priority: {
       type : Number,
       require:true
   },
   description: {
       type: String,
       required: true
   },
   completed: {
       type: Boolean,
       required: true
   }
});

const Task = module.exports = mongoose.model('task', TaskSchema);