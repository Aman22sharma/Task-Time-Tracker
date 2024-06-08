import { Component, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-time-tracker-history',
  templateUrl: './time-tracker-history.component.html',
  styleUrls: ['./time-tracker-history.component.scss']
})
export class TimeTrackerHistoryComponent {
  //Getting the data form parent component
  @Input() logHistory!: string;

  constructor(public taskService: TaskService) {
  }

}
