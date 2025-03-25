import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../Services/users.service';
import { Helper } from '../../helpers/helper';

@Component({
  selector: 'user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  userForm!: FormGroup;
  data = {}
  isFormComeFromEditValue :boolean = false;
  @Output() formUpdated = new EventEmitter<{ updated: boolean, data: any , fromWhere:boolean }>();
  constructor(private fb: FormBuilder, private userService: UsersService , private helper: Helper) { }

  ngOnInit() {
    this.buildForm();
    this.patchValueForm();
  }

  patchValueForm() {
    this.userService.userDetails.subscribe((response) => {
      console.log(response)
      let fromFeilds = response.data;
      this.isFormComeFromEditValue = response.type == "edit" ? true :false 
       if(this.isFormComeFromEditValue){
        this.data = fromFeilds
       }
      if (fromFeilds && response.type == "edit") {
        this.patchValue(fromFeilds)
      }
    });
  }

  patchValue(value: any) {
    this.userForm.patchValue({
      username: value.username || '',
      email: value.email || '',
      password: value.password,
      first_name: value.first_name || '',
      last_name: value.last_name || '',
      phone_number: value.phone_number || '',
      country: value.country || '',
      place: value.place || '',
      address: value.address || '',
      postal_code: value.postal_code || '',
      date_of_birth: this.formatDateToYYYYMMDD(value.date_of_birth) || '',
      profile_picture: value.profile_picture || '/images/admin.jpg',
      wallet_balance: value.wallet_balance || 0.0,
      is_active: value.is_active == 1 ? true : false,
      role: value.role ? value.role : 'Customer',
    });
  }

  buildForm() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      country: ['', Validators.required],
      place: ['', Validators.required],
      address: ['', Validators.required],
      postal_code: [''],
      date_of_birth: ['', Validators.required],
      profile_picture: [''],
      wallet_balance: [{ value: 0.0}],
      is_active: [true],
      role: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Data:', this.userForm.value);
        this.formUpdated.emit({
          updated: true,
          data: !this.isFormComeFromEditValue ?  this.userForm.value : this.data ,
          fromWhere : this.isFormComeFromEditValue
        });
      
    }
  }

  showSuccess() {
    this.helper.showMessage('User updated successfully!', 'success');
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.userForm.get('profile_picture')?.setValue(input.files[0]);
    }
  }

  formatDateToYYYYMMDD(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }



}
