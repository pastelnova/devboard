import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BadgeComponent } from '../../../shared/components/badge/badge';
import { Task, TaskStatus } from '../../../core/models/task.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [BadgeComponent, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" [ngClass]="'priority-' + task.priority">
      <div class="card-header">
        <h3 class="title">{{ task.title }}</h3>
        <app-badge [type]="task.status"></app-badge>
      </div>
      <p class="description">{{ task.description }}</p>

      <div class="card-footer">
        <app-badge [type]="task.status" />

        <div class="actions">
          @if (task.status !== 'in-progress') {
            <button class="btn btn-secondary" (click)="onStatusChange('in-progress')">Start</button>
          }

          @if (task.status !== 'done') {
            <button class="btn btn-primary" (click)="onStatusChange('done')">Done</button>
          }

          <button class="btn btn-danger" (click)="onDelete()">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        background: white;
        border-radius: 10px;
        padding: 16px;
        margin-bottom: 12px;
        border-left: 4px solid transparent;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        transition:
          transform 0.15s,
          box-shadow 0.15s;
      }
      .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
      .priority-high {
        border-left-color: #ef4444;
      }
      .priority-medium {
        border-left-color: #f59e0b;
      }
      .priority-low {
        border-left-color: #6b7280;
      }

      .card-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 8px;
      }
      .title {
        font-size: 15px;
        font-weight: 600;
        color: #111827;
        margin: 0;
        flex: 1;
        margin-right: 8px;
      }
      .description {
        font-size: 13px;
        color: #6b7280;
        margin: 0 0 12px;
        line-height: 1.5;
      }
      .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .actions {
        display: flex;
        gap: 6px;
      }
      .btn {
        padding: 5px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        border: none;
        transition: opacity 0.15s;
      }
      .btn:hover {
        opacity: 0.85;
      }
      .btn-primary {
        background: #3b82f6;
        color: white;
      }
      .btn-secondary {
        background: #e5e7eb;
        color: #374151;
      }
      .btn-danger {
        background: #fee2e2;
        color: #991b1b;
      }
    `,
  ],
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() statusChanged = new EventEmitter<TaskStatus>();
  @Output() deleted = new EventEmitter<number>();

  onStatusChange(status: TaskStatus) {
    this.statusChanged.emit(status);
  }

  onDelete() {
    this.deleted.emit(this.task.id);
  }
}
