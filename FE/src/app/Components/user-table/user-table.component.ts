import { Component, EventEmitter, Output } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'user-table',
  imports: [CommonModule],
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  data: any[] = [];
  openDropdown: boolean = false;
  selectedRowIndex: number | null = null;

  @Output() editUserDetails = new EventEmitter<any>();
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.usersService.getAllUserList().subscribe({
      next: (data) =>  this.data = data,
      error: (err) => console.error('Error:', err)
    });
  }

  onAction(index: number, value: any) {
    if (this.selectedRowIndex === index) {
      this.openDropdown = false;
      this.selectedRowIndex = null;
    } else {
      this.openDropdown = true;
      this.selectedRowIndex = index;
    }
  }

  editUser(i: number, data: object) {
    this.editUserDetails.emit({type:"edit" ,  data: data})
  }
  deleteUser(id: number) {
    this.editUserDetails.emit({type:'delete',data : id})
  }
}
