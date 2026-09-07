import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TaskService } from './core/services/task';
import { TaskListComponent } from './features/tasks/task-list/task-list';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle';
import { StatsComponent } from './features/stats/stats/stats';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, ThemeToggleComponent],
  template: `
    <div class="app">
      <header class="app-header">
        <div class="header-content">
          <div class="brand">
            <h1>DevBoard</h1>
            <p>Your developer task manager</p>
          </div>
          <nav class="nav">
            <a routerLink="/tasks" routerLinkActive="active" class="nav-link"> Tasks </a>
            <a routerLink="/stats" routerLinkActive="active" class="nav-link"> Stats </a>
          </nav>
          <app-theme-toggle />
        </div>
      </header>
      <main>
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      .app {
        min-height: 100vh;
        background: var(--bg-app);
      }
      .app-header {
        background: var(--bg-header);
        color: white;
        padding: 16px 24px;
        position: sticky;
        top: 0;
        z-index: 100;
      }
      .header-content {
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
      }
      .brand h1 {
        font-size: 20px;
        font-weight: 700;
      }
      .brand p {
        font-size: 12px;
        opacity: 0.6;
        margin-top: 2px;
      }

      .nav {
        display: flex;
        gap: 4px;
      }
      .nav-link {
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.15s;
      }
      .nav-link:hover {
        color: white;
        background: rgba(255, 255, 255, 0.1);
      }
      .nav-link.active {
        color: white;
        background: rgba(255, 255, 255, 0.2);
      }
      main {
        padding: 24px;
        max-width: 800px;
        margin: 0 auto;
      }
    `,
  ],
})
export class AppComponent {
  taskService = inject(TaskService);
}
