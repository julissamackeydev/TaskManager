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
    // this.arrangeByPriority();
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
      this.arrangeByPriority(this.tasks)
    });
    return;
  }

  arrangeByPriority(array){
    console.log(array)
    //partitioning array so that all elements equal to or less that the pivot value are to its left and others to its right.
    this.quicksort(array);
    return 
  }

  quicksort(array){

    let leftIndex = 0;
    let rightIndex = array.length - 1;

    // base case, the array has 0 or 1 elements
    if (rightIndex - leftIndex <= 0){
      return
    }

    this.partition(array)
    return
    // this.quicksort()
  }

  partition(array){

    // pointers
    let leftPointer = 0;
    let rightPointer = array.length-1;
    let pivotPosition = rightPointer;

    // last element is pivot
    let pivot = array[rightPointer].priority;
    
    rightPointer -= 1;

    // begin while loop
    while (true) {
      // if the left pointer's value is less than or equal to the pivot, move the pointer one index to the right 
      while (array[leftPointer].priority <= pivot){
        leftPointer += 1;
        break;
      }
      // if the right pointer's value is greater than the pivot, move the pointer one index to the left
      while (array[rightPointer].priority > pivot){
        rightPointer -= 1;
        break;
      }
      // if the left and right points should cross or be equal stop
      if (leftPointer >= rightPointer){
        break
      }
      // if both pointers have stopped, meaning the left pointer value is greater than the pivot and the right is less than
      // we swap these values
      else{
        this.swap(leftPointer, rightPointer, array)
      }

    }

    this.swap(leftPointer, pivotPosition, array);
    return leftPointer;
  }

  swap(indexA, indexB, array){
    let temporaryValue = array[indexA];
    array[indexA] = array[indexB];
    array[indexB] = temporaryValue;
    return
  }

}
