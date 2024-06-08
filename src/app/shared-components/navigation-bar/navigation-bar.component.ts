import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent {

  constructor(public taskService: TaskService) { }

  ngOnInit(): void {
  }

  get totalDuration(): string {
    let hour = 0;
    for (let task of this.taskService.taskList) {
      hour += task.hour;
    }
    return `${hour} hr`;
  }
}
