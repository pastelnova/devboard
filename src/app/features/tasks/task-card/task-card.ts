import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { BadgeComponent } from '../../../shared/components/badge/badge';
import { Task, TaskStatus } from '../../../core/models/task.model';
import { NgClass } from '@angular/common';
import { DueDatePipe } from '../../../shared/pipes/due-date-pipe';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [BadgeComponent, NgClass, DueDatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" [ngClass]="'priority-' + task.priority">
      <div class="card-header">
        <h3 class="title">{{ task.title }}</h3>
        <app-badge [type]="task.status"></app-badge>
      </div>
      <p class="description">{{ task.description }}</p>
      @if (task.dueDate) {
        <span class="due-date-badge" [ngClass]="dueDatePipe.getUrgency(task.dueDate)">
          {{ task.dueDate | dueDate }}
        </span>
      }
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
        background: var(--bg-card);
        border-radius: 10px;
        padding: 16px;
        margin-bottom: 12px;
        border-left: 4px solid transparent;
        box-shadow: var(--shadow);
        transition:
          transform 0.15s,
          box-shadow 0.15s;
      }
      .card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-hover);
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
        color: var(--text-primary);
        margin: 0;
        flex: 1;
        margin-right: 8px;
      }
      .description {
        font-size: 13px;
        color: var(--text-secondary);
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
        background: var(--stat-bg);
        color: var(--stat-color);
      }
      .btn-danger {
        background: #fee2e2;
        color: #991b1b;
      }
      .due-date-badge {
        display: inline-block;
        font-size: 11px;
        font-weight: 500;
        padding: 2px 8px;
        border-radius: 20px;
        margin-bottom: 8px;
      }
      .overdue {
        background: #fee2e2;
        color: #991b1b;
      }
      .today {
        background: #fee2e2;
        color: #991b1b;
      }
      .soon {
        background: #fef3c7;
        color: #92400e;
      }
      .upcoming {
        background: #f3f4f6;
        color: #374151;
      }

      :host {
        display: block;
        animation: fadeInUp 300ms ease-out forwards;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(12px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class TaskCardComponent {
  @Input({ required: true }) task!: Task;
  @Output() statusChanged = new EventEmitter<TaskStatus>();
  @Output() deleted = new EventEmitter<number>();

  dueDatePipe = new DueDatePipe();

  onStatusChange(status: TaskStatus) {
    this.statusChanged.emit(status);
  }

  onDelete() {
    this.deleted.emit(this.task.id);
  }
}
