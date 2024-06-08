import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Task-Time-Tracker';

  constructor(private localStorage: StorageService) { }

  ngOnInit(): void {
    this.localStorage.getTaskListFromStorage()
    window.addEventListener('beforeunload', this.localStorage.saveDataToLocalStorage.bind(this));
  }
}
