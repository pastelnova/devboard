import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './core/services/task';
import { TaskListComponent } from './features/tasks/task-list/task-list';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent, ThemeToggleComponent],
  template: `
    <div class="app">
      <header class="app-header">
        <div class="header-content">
          <div>
            <h1>🧑‍💻 DevBoard</h1>
            <p>Your developer task manager</p>
          </div>
          <app-theme-toggle />
        </div>
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
      }
      .app-header {
        background: #1e293b;
        color: white;
        padding: 16px 24px;
      }
      .header-content {
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      h1 {
        font-size: 22px;
        font-weight: 700;
      }
      p {
        font-size: 13px;
        opacity: 0.6;
        margin-top: 2px;
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
