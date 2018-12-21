import { Component, OnInit, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../services/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks;
  form: FormGroup;

  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private ref: ChangeDetectorRef
  ) { 
    this.form = formBuilder.group({
      'name': [null, Validators.required],
      'description': [null],
      'priority' :[null, Validators.required]
    })
  }


  ngOnInit() {
    this.getTasks();
  }

  markComplete(id){
    this.taskService.markComplete(id).subscribe(response=>{
      console.log(response);
    })
  }
  
  deleteTask(id){
    this.taskService.deleteTask(id).subscribe(response=>{
      console.log(response);
    })    
  }

  // @Output() tasksChange = new EventEmitter();
  getTasks(){
    this.taskService.getTasks().subscribe(response=>{
      this.tasks = response;
      this.tasks.forEach(task => {
        let timestamp = new Date(task.date);
        let month = timestamp.getMonth()+1;
        let date = timestamp.getDate();
        let year = timestamp.getFullYear();
        task.date = month+" . "+date+" . "+year
      });

      console.log(this.tasks)
      // this.tasksChange.emit(this.tasks);
    });
    return
  }

  sort(){
    let sorted = [];
    let unsorted = [{a:1},{a:4},{a:7},{a:2}];

   while(unsorted.length > 0){
     
    for(let index = 0; index < unsorted.length; index++ ){

      if (unsorted[index].a > unsorted[index+1].a){
        unsorted[index+1].a = unsorted[index].a
        unsorted[index].a = unsorted[index+1].a
      }

    }
   } 

  }

  // @Input()
  addTask(form){
    let task = {
      name : form.name,
      description : form.description,
      priority : form.priority,
      completed: false
    };
    this.taskService.addTask(task)
    .subscribe(response=>{
      return
    });
    this.getTasks();
    this.form.reset();
  }

}
