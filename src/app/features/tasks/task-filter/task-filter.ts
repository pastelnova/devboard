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
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 14px;
      }
      select {
        padding: 8px 12px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-size: 14px;
        background: white;
        cursor: pointer;
      }
      .reset-btn {
        padding: 8px 16px;
        border-radius: 8px;
        border: 1px solid #e5e7eb;
        background: white;
        font-size: 14px;
        cursor: pointer;
        color: #6b7280;
      }
      .reset-btn:hover {
        background: #f3f4f6;
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
