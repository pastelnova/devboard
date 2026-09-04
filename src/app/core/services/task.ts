import { computed, Injectable, signal } from '@angular/core';
import { Task, TaskFilter, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private _tasks = signal<Task[]>(this.getMockTasks());
  private _filter = signal<TaskFilter>({
    status: 'all',
    priority: 'all',
    search: '',
  });

  readonly filter = this._filter.asReadonly();
  readonly filteredTasks = computed(() => {
    const tasks = this._tasks();
    const filter = this._filter();

    return tasks
      .filter((task) => {
        const matchStatus = filter.status === 'all' || task.status === filter.status;
        const filterPriority = filter.priority === 'all' || task.priority === filter.priority;
        const matchSearch =
          task.title.toLowerCase().includes(filter.search.toLowerCase()) ||
          task.description.toLowerCase().includes(filter.search.toLowerCase());

        return matchStatus && filterPriority && matchSearch;
      })
      .sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
  });

  readonly totalTasks = computed(() => this._tasks().length);
  readonly todoCount = computed(
    () => this._tasks().filter((task) => task.status === 'todo').length,
  );
  readonly inProgressCount = computed(
    () => this._tasks().filter((task) => task.status === 'in-progress').length,
  );
  readonly doneCount = computed(
    () => this._tasks().filter((task) => task.status === 'done').length,
  );
  readonly highPriorityCount = computed(
    () => this._tasks().filter((task) => task.priority === 'high').length,
  );
  readonly completionRate = computed(() => {
    const total = this._tasks().length;
    if (total === 0) return 0;
    return Math.round((this.doneCount() / total) * 100);
  });

  addTask(task: Omit<Task, 'id' | 'createdAt'>) {
    const newTask: Task = {
      ...task,
      id: Date.now(),
      createdAt: new Date(),
    };
    this._tasks.update((tasks) => [...tasks, newTask]);
  }

  updateStatus(id: number, status: TaskStatus) {
    this._tasks.update((tasks) =>
      tasks.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  }

  deleteTask(id: number) {
    this._tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  setFilter(partial: Partial<TaskFilter>) {
    this._filter.update((filter) => {
      return { ...filter, ...partial };
    });
  }

  resetFilter() {
    this._filter.set({
      status: 'all',
      priority: 'all',
      search: '',
    });
  }

  // ── MOCK DATA ────────────────────────────────────────────────
  private getMockTasks(): Task[] {
    return [
      {
        id: 1,
        title: 'Setup Angular project',
        description: 'Initialize repo, install dependencies, configure routing',
        status: 'done',
        priority: 'high',
        createdAt: new Date('2024-01-01'),
      },
      {
        id: 2,
        title: 'Build TaskService with Signals',
        description: 'Implement state management using Angular Signals',
        status: 'in-progress',
        priority: 'high',
        createdAt: new Date('2024-01-02'),
      },
      {
        id: 3,
        title: 'Implement OnPush change detection',
        description: 'Add OnPush to all components for performance',
        status: 'todo',
        priority: 'high',
        createdAt: new Date('2024-01-03'),
      },
      {
        id: 4,
        title: 'Write unit tests for TaskService',
        description: 'Cover all methods and computed signals',
        status: 'todo',
        priority: 'medium',
        createdAt: new Date('2024-01-04'),
      },
      {
        id: 5,
        title: 'Add @defer for stats component',
        description: 'Lazy load stats block until visible in viewport',
        status: 'todo',
        priority: 'medium',
        createdAt: new Date('2024-01-05'),
      },
      {
        id: 6,
        title: 'Configure lazy loading routes',
        description: 'Split app into lazy chunks per feature',
        status: 'todo',
        priority: 'low',
        createdAt: new Date('2024-01-06'),
      },
      {
        id: 7,
        title: 'Dark mode implementation',
        description: 'Theme toggle with effect() persisted to localStorage',
        status: 'in-progress',
        priority: 'medium',
        createdAt: new Date('2024-01-07'),
      },
    ];
  }
}
