import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../core/services/task';
import { TaskPriority } from '../../../core/models/task.model';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input formControlName="title" type="text" placeholder="Task title" />

      <textarea formControlName="description" placeholder="Description"> </textarea>

      <select formControlName="priority">
        <option value="">Select priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <button type="submit" [disabled]="form.invalid">Add Task</button>

      <button type="button" (click)="onCancel()">Cancel</button>
    </form>
  `,
  styleUrl: './task-form.scss',
})
export class TaskFormComponent {
  private taskService = inject(TaskService);
  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
    priority: new FormControl('', Validators.required),
  });

  @Output() submitted = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onSubmit() {
    if (this.form.invalid) return;

    const { title, description, priority } = this.form.getRawValue();

    this.taskService.addTask({
      title: title!,
      description: description ?? '',
      priority: priority as TaskPriority,
      status: 'todo',
    });

    this.form.reset();
    this.submitted.emit();
  }

  onCancel() {
    this.cancelled.emit();
  }
}
