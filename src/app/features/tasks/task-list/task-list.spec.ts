import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list';
import { TaskService } from '../../../core/services/task';
import { Task, TaskFilter } from '../../../core/models/task.model';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from '../../../app.routes';
import { vi } from 'vitest';

describe('TaskList', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskServiceMock: any;

  const mockTasks: Task[] = [
    {
      id: 1,
      title: 'First task',
      description: 'Description 1',
      status: 'todo',
      priority: 'high',
      createdAt: new Date(),
    },
    {
      id: 2,
      title: 'Second task',
      description: 'Description 2',
      status: 'in-progress',
      priority: 'medium',
      createdAt: new Date(),
    },
    {
      id: 3,
      title: 'Third task',
      description: 'Description 3',
      status: 'done',
      priority: 'low',
      createdAt: new Date(),
    },
  ];

  const mockFilter: TaskFilter = {
    status: 'all',
    priority: 'all',
    search: '',
  };

  beforeEach(async () => {
    taskServiceMock = {
      updateStatus: vi.fn(),
      deleteTask: vi.fn(),
      setFilter: vi.fn(),
      resetFilter: vi.fn(),

      filteredTasks: signal<Task[]>(mockTasks),
      filter: signal<TaskFilter>(mockFilter),
      totalTasks: signal(mockTasks.length),
      todoCount: signal(mockTasks.filter((t) => t.status === 'todo').length),
      inProgressCount: signal(mockTasks.filter((t) => t.status === 'in-progress').length),
      doneCount: signal(mockTasks.filter((t) => t.status === 'done').length),
      completionRate: signal(
        Math.round((mockTasks.filter((t) => t.status === 'done').length / mockTasks.length) * 100),
      ),
    };

    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
      providers: [provideRouter(routes), { provide: TaskService, useValue: taskServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('rendering', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display corect task count in header', () => {
      const h2 = fixture.nativeElement.querySelector('h2');
      expect(h2.textContent).toContain('3');
    });

    it('should render a card for each task', () => {
      const cards = fixture.nativeElement.querySelectorAll('app-task-card');
      expect(cards.length).toBe(3);
    });

    it('should display todo count in stats row', () => {
      const stats = fixture.nativeElement.querySelector('.stats-row');
      expect(stats.textContent).toContain('1 todo');
    });

    it('should display in-progress count stats row', () => {
      const stats = fixture.nativeElement.querySelector('.stats-row');
      expect(stats.textContent).toContain('1 in progress');
    });

    it('should display completion rate', () => {
      const stats = fixture.nativeElement.querySelector('.stats-row');
      expect(stats.textContent).toContain('33%');
    });
  });

  describe('empty state', () => {
    beforeEach(async () => {
      taskServiceMock.filteredTasks.set([]);
      taskServiceMock.totalTasks.set(0);
      taskServiceMock.todoCount.set(0);
      taskServiceMock.inProgressCount.set(0);
      taskServiceMock.doneCount.set(0);
      taskServiceMock.completionRate.set(0);

      fixture.detectChanges();
    });

    it('should show empty state when no task', () => {
      const empty = fixture.nativeElement.querySelector('.empty');
      expect(empty).toBeTruthy();
    });

    it('should not render any task cards when  empty', () => {
      const cards = fixture.nativeElement.querySelectorAll('app-task-card');
      expect(cards.length).toBe(0);
    });

    it('should show clear filters button in empty state', () => {
      const empty = fixture.nativeElement.querySelector('.empty');
      const button = empty.querySelector('button');
      expect(button).toBeTruthy();
    });

    it('should call resetFilter when clear button clicked', () => {
      const button = fixture.nativeElement.querySelector('.empty button');
      button.click();
      expect(taskServiceMock.resetFilter).toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call updateStatus when onStatusChange is called', () => {
      component.onStatusChange(1, 'done');
      expect(taskServiceMock.updateStatus).toHaveBeenCalledWith(1, 'done');
    });

    it('should call updateStatus with correct id and status', () => {
      component.onStatusChange(2, 'in-progress');
      expect(taskServiceMock.updateStatus).toHaveBeenCalledWith(2, 'in-progress');
    });

    it('should call deleteTask with correct id', () => {
      taskServiceMock.deleteTask(1);
      expect(taskServiceMock.deleteTask).toHaveBeenCalledWith(1);
    });
  });

  describe('filter component', () => {
    it('should render task-filter component', () => {
      const filter = fixture.nativeElement.querySelector('app-task-filter');
      expect(filter).toBeTruthy;
    });
  });
});
