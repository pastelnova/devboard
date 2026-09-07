import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);

  private _theme = signal<Theme>(this.getSavedTheme());

  readonly theme = this._theme.asReadonly();
  readonly isDarkMode = computed(() => this._theme() === 'dark');

  constructor() {
    effect(() => {
      const theme = this._theme();

      this.document.body.classList.toggle('dark-theme', theme === 'dark');

      localStorage.setItem('devboard-theme', theme);
      console.log('Theme changed to:', theme);
    });
  }

  toggle() {
    this._theme.update((t) => (t === 'light' ? 'dark' : 'light'));
  }

  private getSavedTheme(): Theme {
    const savedTheme = localStorage.getItem('devboard-theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
  }
}
