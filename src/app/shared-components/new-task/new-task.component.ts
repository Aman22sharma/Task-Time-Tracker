import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent implements OnInit {
  taskForm!: FormGroup;
  isTaskNameErr: boolean = false
  constructor(
    private _fb: FormBuilder,
    public taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) data: { message: string },
    public dialogRef: MatDialogRef<NewTaskComponent>,) { }

  ngOnInit(): void {
    this.taskForm = this._fb.group({
      taskName: ['']
    })
  }

  validateTaskName(e: any) {
    this.isTaskNameErr = true;
    let value = e.target.value;
    if (value !== "") {
      this.isTaskNameErr = false;
    }
  }

  submit(formData: any) {
    this.isTaskNameErr = false;
    if (this.taskForm.invalid) {
      this.isTaskNameErr = true;
      return;
    }
    this.dialogRef.close({
      clicked: "submit",
      data: formData,
    });
  }
}
