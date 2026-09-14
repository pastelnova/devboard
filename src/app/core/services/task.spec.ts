import { TestBed } from '@angular/core/testing';

import { TaskService } from './task';
import { Task } from '../models/task.model';

describe('TaskService', () => {
  let service: TaskService;

  const mockTask: Omit<Task, 'id' | 'createdAt'> = {
    title: 'Test task',
    description: 'This is a test task',
    status: 'todo',
    priority: 'medium',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  describe('inital state', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should load mock tasks on init', () => {
      expect(service.totalTasks()).toBe(7);
    });

    it('should have correct initial filter', () => {
      const filter = service.filter();
      expect(filter.status).toBe('all');
      expect(filter.priority).toBe('all');
      expect(filter.search).toBe('');
    });

    it('should show all tasks when filter is default', () => {
      expect(service.filteredTasks().length).toBe(7);
    });
  });

  describe('computed statistics', () => {
    it('should count todo tasks correctly', () => {
      const todoTasks = service.filteredTasks().filter((task) => task.status === 'todo').length;
      expect(service.todoCount()).toBe(todoTasks);
    });

    it('should count in-progress tasks correctly', () => {
      const inProgressTasks = service
        .filteredTasks()
        .filter((task) => task.status === 'in-progress').length;
      expect(service.inProgressCount()).toBe(inProgressTasks);
    });

    it('should count done tasks correctly', () => {
      const doneTasks = service.filteredTasks().filter((task) => task.status === 'done').length;
      expect(service.doneCount()).toBe(doneTasks);
    });

    it('should count high priority tasks correctly', () => {
      const highPriorityTasks = service
        .filteredTasks()
        .filter((task) => task.priority === 'high').length;
      expect(service.highPriorityCount()).toBe(highPriorityTasks);
    });

    it('should calculate completion rate correctly', () => {
      const expected = Math.round((service.doneCount() / service.totalTasks()) * 100);
      expect(service.completionRate()).toBe(expected);
    });

    it('should update stats automatically when tasks are added', () => {
      const initialTotal = service.totalTasks();
      service.addTask(mockTask);
      expect(service.totalTasks()).toBe(initialTotal + 1);
      expect(service.todoCount()).toBeGreaterThan(0);
    });

    it('should calculate completion rate correctly after adding a done task', () => {
      const initialRate = service.completionRate();
      const firstToDoTaskId = service.filteredTasks().find((task) => task.status === 'todo')?.id;

      service.updateStatus(firstToDoTaskId!, 'done');
      expect(service.completionRate()).toBeGreaterThan(initialRate);
    });
  });

  describe('add task()', () => {
    it('should add a task to the list', () => {
      const initialTotal = service.totalTasks();
      service.addTask(mockTask);
      expect(service.totalTasks()).toBe(initialTotal + 1);
    });

    // it('should generate a unique id for the new task', () => {
    //   service.addTask(mockTask);
    //   service.addTask(mockTask);

    //   const tasks = service.filteredTasks();
    //   const ids = tasks.map((task) => task.id);
    //   const uniqueIds = new Set(ids);

    //   expect(uniqueIds.size).toBe(ids.length);
    // });

    it('should set createdAt automatically', () => {
      service.addTask(mockTask);

      const tasks = service.filteredTasks();
      const newTask = tasks[tasks.length - 1];
      expect(newTask.createdAt instanceof Date).toBe(true);
    });

    it('should add task with correct properties', () => {
      service.addTask(mockTask);

      const tasks = service.filteredTasks();
      const addedTask = tasks.find((task) => task.title === 'Test task');

      expect(addedTask).toBeTruthy();
      expect(addedTask?.status).toBe('todo');
      expect(addedTask?.priority).toBe('medium');
      expect(addedTask?.description).toBe('This is a test task');
    });
  });

  describe('updateStatus()', () => {
    it('should update task status', () => {
      service.addTask(mockTask);
      const task = service.filteredTasks().find((t) => t.title === 'Test task')!;
      service.updateStatus(task.id, 'done');
      const updatedTask = service.filteredTasks().find((t) => t.id === task.id);
      expect(updatedTask?.status).toBe('done');
    });

    it('should not affect other tasks when updating one', () => {
      const initialTotal = service.totalTasks();
      const firstTask = service.filteredTasks()[0];

      service.updateStatus(firstTask.id, 'done');
      expect(service.totalTasks()).toBe(initialTotal);
    });

    it('should update doneCount when status changes to done', () => {
      const initialDone = service.doneCount();
      const toDoTask = service.filteredTasks().find((t) => t.status === 'todo')!;
      service.updateStatus(toDoTask!.id, 'done');
      expect(service.doneCount()).toBe(initialDone + 1);
    });
  });

  describe('deleteTask()', () => {
    it('should remove task from list', () => {
      const initialTotal = service.totalTasks();
      const taskId = service.filteredTasks()[0].id;

      service.deleteTask(taskId);
      expect(service.totalTasks()).toBe(initialTotal - 1);
    });

    it('should remove the correct task', () => {
      const taskToDelete = service.filteredTasks()[0];
      service.deleteTask(taskToDelete.id);
      const stillExists = service.filteredTasks().find((t) => t.id === taskToDelete.id);
      expect(stillExists).toBeUndefined;
    });

    it('should not remove other tasks', () => {
      const initialTasks = service.totalTasks();
      const taskToDelete = service.filteredTasks()[0];
      const otherTask = service.filteredTasks()[1];

      service.deleteTask(taskToDelete.id);

      const otherStillExists = service.filteredTasks().find((t) => t.id === otherTask.id);
      expect(otherStillExists).toBeTruthy;
      expect(service.totalTasks()).toBe(initialTasks - 1);
    });
  });

  describe('setFilter() and filteredTasks()', () => {
    it('should filter by status', () => {
      service.setFilter({ status: 'todo' });

      const filtered = service.filteredTasks();
      expect(filtered.every((t) => t.status === 'todo')).toBeTruthy;
    });

    it('should filter by priority', () => {
      service.setFilter({ priority: 'high' });

      const filtered = service.filteredTasks();
      expect(filtered.every((t) => t.priority === 'high')).toBeTruthy;
    });

    it('should filter by search term - title', () => {
      service.setFilter({ search: 'angular' });

      const filtered = service.filteredTasks();
      filtered.forEach((t) => {
        const matchesTitle = t.title.toLocaleLowerCase().includes('angular');
        const matchesDescription = t.description.toLocaleLowerCase().includes('angular');
        expect(matchesTitle || matchesDescription).toBeTruthy;
      });
    });

    it('should filter by search term - case insensitive', () => {
      service.setFilter({ search: 'ANGULAR' });
      const upper = service.filteredTasks().length;

      service.setFilter({ search: 'angular' });
      const lower = service.filteredTasks().length;
      expect(upper).toBe(lower);
    });

    it('should combine multiple filters', () => {
      service.setFilter({ status: 'todo', priority: 'high' });

      const filtered = service.filteredTasks();
      filtered.forEach((t) => {
        expect(t.status).toBe('todo');
        expect(t.priority).toBe('high');
      });
    });

    it('should return all tasks after resetFilter()', () => {
      service.setFilter({ status: 'done', priority: 'high' });

      service.resetFilter();
      expect(service.filteredTasks().length).toBe(service.totalTasks());
    });

    it('should return empty array when no tasks match filter', () => {
      service.setFilter({ search: 'xxxxxxxxxxxxx' });

      expect(service.filteredTasks().length).toBe(0);
    });
  });

  describe('sorting', () => {
    it('should sort task by priority, high first', () => {
      service.resetFilter();

      const tasks = service.filteredTasks();
      const priorityOrder = { high: 0, medium: 1, low: 2 };

      for (let i = 0; i < tasks.length - 1; i++) {
        const current = priorityOrder[tasks[i].priority];
        const next = priorityOrder[tasks[i + 1].priority];
        expect(current).toBeLessThanOrEqual(next);
      }
    });
  });
});
