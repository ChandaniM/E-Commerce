import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { distinctUntilChanged, Observable } from 'rxjs';
import { ToastService } from '../../Services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {
  toast$: Observable<{ message: string, type: string } | null>;

  constructor(public toastService: ToastService) {
    this.toast$ = this.toastService.toast$.pipe(distinctUntilChanged());
  }
}
