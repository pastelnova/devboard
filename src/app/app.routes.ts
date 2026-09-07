import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./features/tasks/task-list/task-list').then((m) => m.TaskListComponent),
  },
  {
    path: 'stats',
    loadComponent: () => import('./features/stats/stats/stats').then((m) => m.StatsComponent),
  },
  { path: '**', redirectTo: '/tasks', pathMatch: 'full' },
];
