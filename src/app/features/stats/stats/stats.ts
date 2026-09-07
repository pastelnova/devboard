import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskService } from '../../../core/services/task';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="stats-container">
    <h2>Detailed Statistics</h2>

    <div class="stats-grid">
      <div class="stat-card total">
        <div class="stat-value">{{ taskService.totalTasks() }}</div>
        <div class="stat-label">Total Tasks</div>
        <div class="stat-bar">
          <div class="bar-fill total-fill" [style.width.%]="100"></div>
        </div>
      </div>

      <div class="stat-card todo">
        <div class="stat-value">{{ taskService.todoCount() }}</div>
        <div class="stat-label">To Do</div>
        <div class="stat-bar">
          <div
            class="bar-fill todo-fill"
            [style.width.%]="getPercent(taskService.todoCount())"
          ></div>
        </div>
      </div>

      <div class="stat-card in-progress">
        <div class="stat-value">{{ taskService.inProgressCount() }}</div>
        <div class="stat-label">In Progress</div>
        <div class="stat-bar">
          <div
            class="bar-fill progress-fill"
            [style.width.%]="getPercent(taskService.inProgressCount())"
          ></div>
        </div>
      </div>

      <div class="stat-card done">
        <div class="stat-value">{{ taskService.doneCount() }}</div>
        <div class="stat-label">Done</div>
        <div class="stat-bar">
          <div
            class="bar-fill done-fill"
            [style.width.%]="getPercent(taskService.doneCount())"
          ></div>
        </div>
      </div>

      <div class="stat-card high-prio">
        <div class="stat-value">{{ taskService.highPriorityCount() }}</div>
        <div class="stat-label">High Priority</div>
        <div class="stat-bar">
          <div
            class="bar-fill high-fill"
            [style.width.%]="getPercent(taskService.highPriorityCount())"
          ></div>
        </div>
      </div>

      <div class="stat-card completion">
        <div class="stat-value">{{ taskService.completionRate() }}%</div>
        <div class="stat-label">Completion Rate</div>
        <div class="stat-bar">
          <div
            class="bar-fill completion-fill"
            [style.width.%]="taskService.completionRate()"
          ></div>
        </div>
      </div>
    </div>
  </div>`,
  styles: [
    `
      .stats-container {
        padding-bottom: 24px;
      }
      h2 {
        font-size: 20px;
        font-weight: 700;
        color: var(--text-primary);
        margin-bottom: 16px;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
        gap: 14px;
      }
      .stat-card {
        background: var(--bg-card);
        border-radius: 10px;
        padding: 16px;
        box-shadow: var(--shadow);
        border-top: 3px solid transparent;
      }
      .stat-value {
        font-size: 32px;
        font-weight: 700;
        color: var(--text-primary);
        line-height: 1;
        margin-bottom: 4px;
      }
      .stat-label {
        font-size: 13px;
        color: var(--text-secondary);
        margin-bottom: 12px;
      }
      .stat-bar {
        height: 6px;
        background: var(--border-color);
        border-radius: 3px;
        overflow: hidden;
      }
      .bar-fill {
        height: 100%;
        border-radius: 3px;
        transition: width 0.6s ease;
      }

      .total {
        border-top-color: #6366f1;
      }
      .todo {
        border-top-color: #3b82f6;
      }
      .in-progress {
        border-top-color: #f59e0b;
      }
      .done {
        border-top-color: #10b981;
      }
      .high-prio {
        border-top-color: #ef4444;
      }
      .completion {
        border-top-color: #8b5cf6;
      }

      .total-fill {
        background: #6366f1;
        width: 100%;
      }
      .todo-fill {
        background: #3b82f6;
      }
      .progress-fill {
        background: #f59e0b;
      }
      .done-fill {
        background: #10b981;
      }
      .high-fill {
        background: #ef4444;
      }
      .completion-fill {
        background: #8b5cf6;
      }
    `,
  ],
})
export class StatsComponent {
  taskService = inject(TaskService);

  getPercent(count: number): number {
    const total = this.taskService.totalTasks();
    if (total === 0) return 0;
    return Math.round((count / total) * 100);
  }
}
