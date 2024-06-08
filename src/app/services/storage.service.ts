import { Injectable } from '@angular/core';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private taskService: TaskService) { }

  saveDataToLocalStorage(event: Event): void {
    console.log("storeTaskListInStorage", this.taskService.taskList)
    let taskListTmp = JSON.stringify(this.taskService.taskList);
    localStorage.setItem('data', taskListTmp)
  }

  async getTaskListFromStorage() {
    if (localStorage.getItem("data")) {
      let dataTmp: any = await localStorage.getItem("data");
      let parsedArray = JSON.parse(dataTmp);
      this.taskService.taskList = parsedArray;
      this.taskService.startStopTimmer().then((data) => {
        if (data) {
          console.log('Restoring timmer')
        }
      })
    }
  }
}
