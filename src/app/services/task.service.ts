import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  public isUpdateStorage: BehaviorSubject<boolean> = new BehaviorSubject(false);

  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  timer: any;
  taskList: any = [];

  constructor() { }

  isUpdateLocalStorage(params: boolean) {
    this.isUpdateStorage.next(params)
  }

  getIsUpdateLocalStorage(): Observable<boolean> {
    return this.isUpdateStorage.asObservable();
  }

  //Generating unique id for each created task
  generateRandomId(size: any) {
    const nums = Array.from({ length: 4 }, (_, i) =>
      String.fromCharCode('0'.charCodeAt(0) + i)
    );
    const alphabets = Array.from({ length: 8 }, (_, i) =>
      String.fromCharCode('a'.charCodeAt(0) + i).toUpperCase()
    );
    const chars = [...nums, ...alphabets];
    const random = (length: any) => Math.floor(Math.random() * length);
    return Array.from({ length: size }, () => chars[random(chars.length)]).join(
      ''
    );
  }

  //Fetching task list
  getTasks() {
    return this.taskList;
  }

  //Creating new task
  addTask(name: string) {
    let timeObj = {
      id: this.generateRandomId(8),
      taskName: name,
      hour: 0,
      minute: 0,
      secand: 0,
      timer: null,
      startedTime: null,
      stoppedTime: null,
      isStartedTimer: true,
      currentTimestamp: new Date(),
      totalHourSpent: 0,
      loggedHistory: []
    };
    this.taskList.unshift(timeObj)
    this.isUpdateLocalStorage(true)
  }

  deleteTask(id: number): void {
    const indexToDelete = this.taskList.findIndex((item: any) => item.id === id);
    if (indexToDelete !== -1) {
      // Use splice to remove the object at the found index
      this.taskList.splice(indexToDelete, 1);
    }
    this.isUpdateLocalStorage(true)
  }

  startTask(id: number): void {
    const task = this.taskList.find((task: any) => task.id === id);
    task.startedTime = new Date();
    let currentMsg = `Started the timer at ${this.formateTimestamp(task.startedTime)} (Active)`
    task.loggedHistory.unshift(currentMsg)
    task.isStartedTimer = false;
    task.timer = setInterval(() => {
      task.secand++;
      if (task.secand === 60) {
        task.secand = 0;
        task.minute++;
        if (task.minute === 60) {
          task.minute = 0;
          task.hour++;
        }
      }
    }, 1000);
    this.isUpdateLocalStorage(true)
  }

  getTotalTimeSpent(): number {
    return this.taskList.reduce((total: any, task: any) => total + task.hour, 0);
  }

  stopTimer(id: number): void {
    const task = this.taskList.find((task: any) => task.id === id);
    task.stoppedTime = new Date()
    task.isStartedTimer = true;
    console.log(task.startedTime)
    let preMsg = `Started the timer at ${this.formateTimestamp(task.startedTime)} & Stopped at ${this.formateTimestamp(task.stoppedTime)}`
    task.loggedHistory.shift()
    task.loggedHistory.unshift(preMsg)
    clearInterval(task.timer);
    this.isUpdateLocalStorage(true)
  }

  formateTimestamp(inputUTC: any) {
    const day = inputUTC.getDate();
    const month = inputUTC.getMonth() + 1; // Months are zero-indexed, so add 1
    const year = inputUTC.getFullYear();
    const hours = inputUTC.getHours();
    const minutes = inputUTC.getMinutes();
    const seconds = inputUTC.getSeconds();
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  reStartTimer(id: number): void {
    const task = this.taskList.find((task: any) => task.id === id);
    task.timer = setInterval(() => {
      task.secand++;
      if (task.secand === 60) {
        task.secand = 0;
        task.minute++;
        if (task.minute === 60) {
          task.minute = 0;
          task.hour++;
        }
      }
    }, 1000);
  }

  startStopTimmer() {
    return new Promise((resolve) => {
      for (let task of this.taskList) {
        if (task.isStartedTimer == false) {
          task.startedTime = new Date(task.startedTime)
          this.reStartTimer(task.id);
        }
      }
      resolve(true)
    })
  }
}
