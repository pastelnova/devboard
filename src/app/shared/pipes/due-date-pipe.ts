import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dueDate',
  standalone: true,
})
export class DueDatePipe implements PipeTransform {
  private readonly MS_PER_DAY = 1000 * 60 * 60 * 24;

  transform(value: Date | null | undefined): string {
    if (!value) return '';

    const days = this.getDaysDiff(value);

    if (days < 0) return `${Math.abs(days)} ${Math.abs(days) === 1 ? 'day' : 'days'} overdue`;
    if (days === 0) return 'due today';
    if (days === 1) return 'tomorrow';
    return `in ${days} ${days === 1 ? 'day' : 'days'}`;
  }

  getUrgency(value: Date | null | undefined): 'overdue' | 'today' | 'soon' | 'upcoming' | 'none' {
    if (!value) return 'none';

    const days = this.getDaysDiff(value);

    if (days < 0) return 'overdue';
    if (days === 0) return 'today';
    if (days <= 3) return 'soon';
    return 'upcoming';
  }

  private getDaysDiff(value: Date): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const due = new Date(value);
    due.setHours(0, 0, 0, 0);

    const diffMs = due.getTime() - today.getTime();
    return Math.round(diffMs / this.MS_PER_DAY);
  }
}
