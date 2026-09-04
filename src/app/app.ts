import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './core/services/task';

@Component({
  selector: 'app-root',
  template: `
    <h1>DevBoard</h1>
    <p>Total tasks: {{ taskService.totalTasks() }}</p>
    <p>Done: {{ taskService.doneCount() }}</p>
    <p>In progress: {{ taskService.inProgressCount() }}</p>
    <p>Completion: {{ taskService.completionRate() }}%</p>
  `,
  styleUrl: './app.scss',
})
export class App {
  taskService = inject(TaskService);
}
