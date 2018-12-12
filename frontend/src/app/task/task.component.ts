import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(
    private taskService: TaskService
  ) { }
  tasks = [];

  ngOnInit() {
    this.taskService.getTasks().subscribe(response=>{
      this.tasks.push(response)
    })
    // this.taskService.addTask({
    //   name: 'post request',
    //   description: 'setting up the frontend',
    //   priority: '5',
    //   completed: false
    // }).subscribe(response=>{
    //   console.log(response);
    // })
    // this.taskService.markComplete('5c0f402fa4af123eeaa29c61').subscribe(response=>{
    //   console.log(response);
    // })
    // this.taskService.deleteTask('5c0f402fa4af123eeaa29c61').subscribe(response=>{
    //   console.log(response);
    // })
  }

}
