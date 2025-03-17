import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'product-table',
  imports: [CommonModule],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss'
})
export class ProductTableComponent {
  @Input() products: any[] = [];
  selectedRowIndex: number | null = null;

  @Output() editUserDetails = new EventEmitter<any>();

  constructor() {}

  onAction(index: number) {
    this.selectedRowIndex = this.selectedRowIndex === index ? null : index;
  }

  editProduct(data: object) {
    console.log(data , "PRODUCT USED TO EDDIT")
    this.editUserDetails.emit({ type: "edit", data: data });
  }

  deleteProduct(id: number) {
    this.editUserDetails.emit({ type: "delete", data: id });
}
}
