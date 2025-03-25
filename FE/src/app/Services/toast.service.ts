import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<{ message: string, type: string } | null>(null);
  toast$ = this.toastSubject.asObservable();

  showToast(message: string, type: string = 'success') {
    this.toastSubject.next({ message, type });

    setTimeout(() => {
      this.toastSubject.next(null); // Hide after a few seconds
    }, 3000);
  }
}
