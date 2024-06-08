import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';
import { NewTaskComponent } from '../shared-components/new-task/new-task.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent implements OnInit, OnDestroy {
  taskListForm!: FormGroup;
  tasks: any[] = [];

  constructor(private _fb: FormBuilder,
    public taskService: TaskService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private localStorage: StorageService) { }

  //snackbar compenet to show messages
  openSnackBar(message: string) {
    this._snackBar.open(message, 'Ok', {
      duration: 3000
    });
  }

  ngOnInit(): void {
    this.taskService.getIsUpdateLocalStorage().subscribe(
      (isUpdate) => {
        if (isUpdate) {
          console.log('Update tasklist')
          let taskListTmp = JSON.stringify(this.taskService.taskList);
          localStorage.setItem('data', taskListTmp)
        }
      }
    )
    window.addEventListener('beforeunload', this.localStorage.saveDataToLocalStorage.bind(this));
  }

  addTask(): void {
    const dialogRef = this.dialog.open(NewTaskComponent, {
      width: '646px',
      height: '260px',
      panelClass: 'custom-dialog-container'
    },);

    dialogRef.afterClosed().subscribe((data) => {
      if (data?.clicked === 'submit') {
        this.taskService.addTask(data.data.taskName.trim())
        this.openSnackBar('Task created successfully!')
      }
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.openSnackBar('Task deleted successfully!')
  }

  startTask(id: number): void {
    this.taskService.startTask(id);
  }

  stopTask(id: number): void {
    this.taskService.stopTimer(id);
  }

  formatTime(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }

  ngOnDestroy(): void {
    if (this.dialog) {
      this.dialog.closeAll()
    }
  }
}
