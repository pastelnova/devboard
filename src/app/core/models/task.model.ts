export type TaskStatus   = 'todo' | 'in-progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id:          number;
  title:       string;
  description: string;
  status:      TaskStatus;
  priority:    TaskPriority;
  createdAt:   Date;
  dueDate?:    Date;
}

export interface TaskFilter {
  status:   TaskStatus | 'all';
  priority: TaskPriority | 'all';
  search:   string;
}