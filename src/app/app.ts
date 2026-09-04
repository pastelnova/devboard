import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './core/services/task';
import { TaskListComponent } from './features/tasks/task-list/task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent],
  template: `
    <div class="app">
      <header class="app-header">
        <h1>🧑‍💻 DevBoard</h1>
        <p>Your developer task manager</p>
      </header>
      <main>
        <app-task-list />
      </main>
    </div>
  `,
  styles: [
    `
      .app {
        min-height: 100vh;
        background: #f9fafb;
      }
      .app-header {
        background: #1e293b;
        color: white;
        padding: 20px 24px;
        margin-bottom: 0;
      }
      .app-header h1 {
        margin: 0;
        font-size: 24px;
      }
      .app-header p {
        margin: 4px 0 0;
        opacity: 0.7;
        font-size: 14px;
      }
      main {
        padding: 24px;
      }
    `,
  ],
})
export class AppComponent {
  taskService = inject(TaskService);
}
