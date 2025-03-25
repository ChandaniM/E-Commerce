import { Component, EventEmitter, Input,  OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'common-table',
  imports: [],
  templateUrl: './common-table.component.html',
  styleUrl: './common-table.component.scss',
})
export class CommonTableComponent implements OnInit, OnChanges {
  @Input() tableData: any[] = [];
  @Input() header: any[] = [];
  @Output() editUserDetails = new EventEmitter<object>();
  openDropdown : boolean = false;
  selectedRowIndex: number | null = null;
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {}
  onAction(index: number, value: any) {
     if (this.selectedRowIndex === index) {
      this.openDropdown = false;
      this.selectedRowIndex = null;
    } else {
      this.openDropdown = true;
      this.selectedRowIndex = index;
    }
  }
  editUser(i :number, data : object){
    this.editUserDetails.emit({index : i , userDetails : data})
  }
  deleteUser(){}
}
