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
});
