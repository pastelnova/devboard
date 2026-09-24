import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormComponent } from './task-form';
import { vi } from 'vitest';
import { TaskService } from '../../../core/services/task';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let taskServiceMock: any;

  beforeEach(async () => {
    taskServiceMock = {
      addTask: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [TaskFormComponent],
      providers: [{ provide: TaskService, useValue: taskServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render title input', () => {
      const input = fixture.nativeElement.querySelector('input[formControlName = "title"]');
      expect(input).toBeTruthy();
    });

    it('should render description textarea', () => {
      const textarea = fixture.nativeElement.querySelector(
        'textarea[formControlName = "description"]',
      );
      expect(textarea).toBeTruthy();
    });

    it('should render priority select', () => {
      const select = fixture.nativeElement.querySelector('select[formControlName = "priority"]');
      expect(select).toBeTruthy();
    });

    it('should render submit button', () => {
      const btn = fixture.nativeElement.querySelector('button[type = "submit"]');
      expect(btn).toBeTruthy();
    });

    it('should render cancel button', () => {
      const btn = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(btn).toBeTruthy();
    });
  });

  describe('validation', () => {
    it('should be invalid when title is empty', () => {
      component.form.get('title')?.setValue('');
      expect(component.form.invalid).toBeTruthy();
    });

    it('hould be valid when title and priority are set', () => {
      component.form.get('title')?.setValue('New task');
      component.form.get('priority')?.setValue('high');
      expect(component.form.valid).toBeTruthy();
    });

    it('should disable submit button when form is invalid', () => {
      component.form.get('title')?.setValue('');
      fixture.detectChanges();
      const btn = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(btn.disabled).toBeTruthy();
    });

    it('should enable submit button when form is valid', () => {
      component.form.get('title')?.setValue('New task');
      component.form.get('priority')?.setValue('high');
      fixture.detectChanges();
      const btn = fixture.nativeElement.querySelector('button[type="submit"]');
      expect(btn.disable).toBeFalsy();
    });
  });

  describe('submission', () => {
    it('should call taskService.addTask with form values on submit', () => {
      component.form.get('title')?.setValue('New task');
      component.form.get('description')?.setValue('Description');
      component.form.get('priority')?.setValue('high');

      component.onSubmit();

      expect(taskServiceMock.addTask).toHaveBeenCalledWith({
        title: 'New task',
        description: 'Description',
        priority: 'high',
        status: 'todo',
      });
    });

    it('should not call addTask when form is invalid', () => {
      component.form.get('title')?.setValue('');
      component.onSubmit();
      expect(taskServiceMock.addTask).not.toHaveBeenCalled();
    });

    it('should reset form after successful submit', () => {
      component.form.get('title')?.setValue('New task');
      component.form.get('priority')?.setValue('high');
      component.onSubmit();
      expect(component.form.get('title')?.value).toBeFalsy();
    });

    it('should emit cancelled event when cancel is clicked', () => {
      let emitted = false;
      component.cancelled.subscribe(() => (emitted = true));

      const btn = fixture.nativeElement.querySelector('button[type="button"]');
      btn.click();

      expect(emitted).toBeTruthy();
    });

    it('should emit submitted event after successful submit', () => {
      let emitted = false;
      component.submitted.subscribe(() => (emitted = true));

      component.form.get('title')?.setValue('New task');
      component.form.get('priority')?.setValue('high');
      component.onSubmit();

      expect(emitted).toBeTruthy();
    });
  });
});
