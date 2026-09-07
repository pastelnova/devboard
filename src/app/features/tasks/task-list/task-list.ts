import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskFilterComponent } from '../task-filter/task-filter';
import { TaskService } from '../../../core/services/task';
import { TaskStatus } from '../../../core/models/task.model';
import { TaskCardComponent } from '../task-card/task-card';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskFilterComponent, TaskCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <div class="container">
    <div class="header">
      <h2>Tasks ({{ taskService.filteredTasks().length }})</h2>
      <div class="stats-row">
        <span class="stat todo"> 📋 {{ taskService.todoCount() }} todo </span>
        <span class="stat in-progress"> ⚡ {{ taskService.inProgressCount() }} in progress </span>
        <span class="stat done"> ✅ {{ taskService.doneCount() }} done </span>
        <span class="stat completion"> {{ taskService.completionRate() }}% complete </span>
      </div>
    </div>

    <app-task-filter />

    @if (taskService.filteredTasks().length === 0) {
      <div class="empty">
        <p>No tasks match your filters.</p>
        <button (click)="taskService.resetFilter()">Clear filters</button>
      </div>
    } @else {
      @for (task of taskService.filteredTasks(); track task.id) {
        <app-task-card
          [task]="task"
          (statusChanged)="onStatusChange(task.id, $event)"
          (deleted)="taskService.deleteTask(task.id)"
        >
        </app-task-card>
      }
    }
  </div>`,
  styles: [
    `
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 24px;
      }
      .header {
        margin-bottom: 20px;
      }
      h2 {
        font-size: 22px;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0 0 8px;
      }
      .stats-row {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 4px;
      }
      .stat {
        font-size: 13px;
        font-weight: 500;
        padding: 4px 10px;
        border-radius: 20px;
        background: var(--stat-bg);
        color: var(--stat-color);
      }
      .empty {
        text-align: center;
        padding: 48px 24px;
        color: var(--text-secondary);
        font-size: 15px;
      }
      .empty button {
        margin-top: 12px;
        padding: 8px 20px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        background: var(--btn-bg);
        color: var(--btn-color);
        cursor: pointer;
        font-size: 14px;
      }
    `,
  ],
})
export class TaskListComponent {
  taskService = inject(TaskService);

  onStatusChange(id: number, status: TaskStatus) {
    this.taskService.updateStatus(id, status);
  }
}
