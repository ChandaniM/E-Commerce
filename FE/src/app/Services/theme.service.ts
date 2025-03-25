import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeKey = 'themeMode';

  setTheme(isDarkMode: boolean) {
    localStorage.setItem(this.themeKey, isDarkMode ? 'dark' : 'light');
  }

  getTheme(): boolean {
    return localStorage.getItem(this.themeKey) === 'dark';
  }
}
