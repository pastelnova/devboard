import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TaskService } from '../../../core/services/task';

@Component({
  selector: 'app-task-filter',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="filters">
      <input
        class="search"
        type="text"
        placeholder="Search tasks..."
        [value]="taskService.filter().search"
        (input)="onSearch($event)"
      />
    </div>
  `,
  styles: [
    `
      .filters {
        display: flex;
        gap: 10px;
        align-items: center;
        margin-bottom: 20px;
        flex-wrap: wrap;
      }
      .search {
        flex: 1;
        min-width: 200px;
        padding: 8px 12px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        font-size: 14px;
        background: var(--bg-input);
        color: var(--text-primary);
      }
      .search::placeholder {
        color: var(--text-muted);
      }
      select {
        padding: 8px 12px;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        font-size: 14px;
        background: var(--bg-input);
        color: var(--text-primary);
        cursor: pointer;
      }
      .reset-btn {
        padding: 8px 16px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        background: var(--btn-bg);
        font-size: 14px;
        cursor: pointer;
        color: var(--btn-color);
      }
      .reset-btn:hover {
        background: var(--stat-bg);
      }
    `,
  ],
})
export class TaskFilterComponent {
  taskService = inject(TaskService);

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.taskService.setFilter({ search: value });
  }

  onStatusChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as any;
    this.taskService.setFilter({ status: value });
  }

  onPriorityChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as any;
    this.taskService.setFilter({ priority: value });
  }
}
