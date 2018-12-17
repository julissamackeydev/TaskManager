import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks:{};
  form: FormGroup;
  // name: string = "";
  // priority:string = "";
  // description:string = "";

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder
  ) { 
    this.form = formBuilder.group({
      'name': [null, Validators.required],
      'description': [null],
      'priority' :[null, Validators.required]
    })
  }


  ngOnInit() {
    this.taskService.getTasks().subscribe(response=>{
      console.log(typeof(response))
      console.log(response)
      this.tasks = response;
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
  addTask(form){
    
    let task = {
      name : form.name,
      description : form.description,
      priority : form.priority
    };
    this.taskService.addTask(task)

  }

}
