import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  };

  healthCheck(){
    return true
  }

  getTasks(){
    return this.http.get('http://localhost:3000/api/tasks');
  }

  addTask(task){
    return this.http.post('http://localhost:3000/api/tasks', task, this.httpOptions)
  }

  markComplete(task){
    return this.http.put('http://localhost:3000/api/tasks/'+task, this.httpOptions);
  }
  
  deleteTask(task){
    return this.http.delete('http://localhost:3000/api/tasks/'+task, this.httpOptions);
  }
}
