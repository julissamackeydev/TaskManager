const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/tasks', (request, response, next)=>{
    Task.find({}, (error, tasks)=>{
        if(error){
            response.json(error);
        }
        else{
            response.json(tasks)
        }
    })

});

router.post('/tasks', (request, response, next)=>{
    let task = new Task({
        name: request.body.name,
        description: request.body.description,
        priority: request.body.priority,
        completed: request.body.completed,
        date: new Date()
    });
    task.save((error, task)=>{
        if(error){
            response.json(error);
        }
        else{
            response.json({message:"Task added successfully."});
        }
    })
});

router.put('/tasks/:id', (request, response, next)=>{
    Task.findOne({_id:request.params.id}, (error, task)=>{
        task.completed = true;
        task.save((error, task)=>{
        if(error){
            response.json(error);
        }
        else{
            response.json({message:"Task marked complete."})
        }
    })
    });
});

router.delete('/tasks/:id', (request, response, next)=>{
    Task.deleteOne({_id:request.params.id}, (error, result)=>{
        if(error){
            response.json(error);
        }
        else{
            response.json(result);
        }
    })
});

module.exports = router;