import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TaskService } from './core/services/task';
import { TaskListComponent } from './features/tasks/task-list/task-list';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle';
import { StatsComponent } from './features/stats/stats/stats';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskListComponent, ThemeToggleComponent, StatsComponent],
  template: `
    <div class="app">
      <header class="app-header">
        <div class="header-content">
          <div>
            <h1>DevBoard</h1>
            <p>Your developer task manager</p>
          </div>
          <app-theme-toggle />
        </div>
      </header>
      <main>
        <app-task-list />

        <div
          style="height: 100vh; display:flex; align-items:center; 
              justify-content:center; color: gray; font-size: 14px"
        ></div>

        @defer (on viewport) {
          <app-stats />
        } @loading (minimum 400ms) {
          <div class="stats-loading">
            <div class="skeleton-title"></div>
            <div class="skeleton-grid">
              @for (i of [1, 2, 3, 4, 5, 6]; track i) {
                <div class="skeleton-card"></div>
              }
            </div>
          </div>
        } @error {
          <div class="stats-error">
            <p>Failed to load statistics.</p>
          </div>
        } @placeholder {
          <div class="stats-placeholder">Statistics load when you scroll here...</div>
        }
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

      /* Placeholder — before scroll */
      .stats-placeholder {
        max-width: 800px;
        margin: 0 auto;
        padding: 32px 24px;
        text-align: center;
        color: var(--text-muted);
        font-size: 14px;
        border: 2px dashed var(--border-color);
        border-radius: 10px;
        margin-bottom: 24px;
      }

      /* Loading skeleton */
      .stats-loading {
        max-width: 800px;
        margin: 0 auto;
        padding: 0 24px 24px;
      }
      .skeleton-title {
        height: 28px;
        width: 200px;
        background: var(--border-color);
        border-radius: 6px;
        margin-bottom: 16px;
        animation: pulse 1.5s infinite;
      }
      .skeleton-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 14px;
      }
      .skeleton-card {
        height: 100px;
        background: var(--border-color);
        border-radius: 10px;
        animation: pulse 1.5s infinite;
      }
      @keyframes pulse {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      .stats-error {
        max-width: 800px;
        margin: 0 auto;
        padding: 24px;
        text-align: center;
        color: #ef4444;
      }
    `,
  ],
})
export class AppComponent {
  taskService = inject(TaskService);
}
