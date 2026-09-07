import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="toggle"
      [class.dark]="themeService.isDarkMode()"
      (click)="themeService.toggle()"
      [attr.aria-label]="themeService.isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      @if (themeService.isDarkMode()) {
        ☀️ Light mode
      } @else {
        🌙 Dark mode
      }
    </button>
  `,
  styles: [
    `
      .toggle {
        padding: 8px 16px;
        border-radius: 20px;
        border: 1.5px solid rgba(255, 255, 255, 0.3);
        background: rgba(255, 255, 255, 0.1);
        color: white;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }
      .toggle:hover {
        background: rgba(255, 255, 255, 0.2);
      }
      .toggle.dark {
        border-color: rgba(255, 255, 255, 0.5);
        background: rgba(255, 255, 255, 0.15);
      }
    `,
  ],
})
export class ThemeToggleComponent {
  themeService = inject(ThemeService);
}
