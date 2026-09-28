import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardComponent } from './task-card';
import { Task } from '../../../core/models/task.model';

describe('TaskCard', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  const mockTask: Task = {
    id: 1,
    title: 'Test task',
    description: 'Test description',
    status: 'todo',
    priority: 'high',
    createdAt: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;

    component.task = mockTask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('due date badge', () => {
    it('should not show due date badge when dueDate is not set', () => {
      const badge = fixture.nativeElement.querySelector('.due-date-badge');
      expect(badge).toBeFalsy();
    });

    it('should show due date badge when dueDate is set', () => {
      fixture.componentRef.setInput('task', { ...mockTask, dueDate: new Date() });
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.due-date-badge');
      expect(badge).toBeTruthy();
    });

    it('should display correct text for due date', () => {
      fixture.componentRef.setInput('task', { ...mockTask, dueDate: new Date() });
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.due-date-badge');
      expect(badge.textContent.trim()).toBe('due today');
    });

    it('should apply overdue class when task is overdue', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      fixture.componentRef.setInput('task', { ...mockTask, dueDate: yesterday });
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.due-date-badge');
      expect(badge.classList).toContain('overdue');
    });

    it('should apply upcoming class when due date is far away', () => {
      const future = new Date();
      future.setDate(future.getDate() + 10);
      fixture.componentRef.setInput('task', { ...mockTask, dueDate: future });
      fixture.detectChanges();
      const badge = fixture.nativeElement.querySelector('.due-date-badge');
      expect(badge.classList).toContain('upcoming');
    });
  });
});
