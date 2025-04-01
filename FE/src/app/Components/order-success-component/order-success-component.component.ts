import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-order-success-component',
  imports: [],
  templateUrl: './order-success-component.component.html',
  styleUrl: './order-success-component.component.scss'
})
export class OrderSuccessComponentComponent {
  constructor(
    private route: Router,
    private dialogRef: MatDialogRef<OrderSuccessComponentComponent>
  ) {}
  continueShopping(){
    this.route.navigate(['']);
    this.dialogRef.close();

  }
  close(){
    this.dialogRef.close();
  }
}

