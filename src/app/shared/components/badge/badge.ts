import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TaskStatus, TaskPriority } from '../../../core/models/task.model';

type BadgeType = TaskStatus | TaskPriority;

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="badge" [ngClass]="badgeClass">
      {{ label }}
    </span>
  `,
  styles: [
    `
      .badge {
        display: inline-block;
        padding: 3px 10px;
        border-radius: 20px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .todo {
        background: #e8f0fe;
        color: #1a56db;
      }
      .in-progress {
        background: #fef3c7;
        color: #92400e;
      }
      .done {
        background: #d1fae5;
        color: #065f46;
      }
      .high {
        background: #fee2e2;
        color: #991b1b;
      }
      .medium {
        background: #fef3c7;
        color: #92400e;
      }
      .low {
        background: #f3f4f6;
        color: #374151;
      }
    `,
  ],
})
export class BadgeComponent {
  @Input({ required: true }) type!: BadgeType;

  get label(): string {
    return this.type.replace('-', ' ');
  }

  get badgeClass(): string {
    return this.type;
  }
}
