import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'user-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  profileForm!: FormGroup;
  profileImage: string | ArrayBuffer | null = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      state: [''],
      address: [''],
      postal_code: [''],
      city: [''],
      role: [{ value: 'admin', disabled: true }, Validators.required]
    });

    const userData = localStorage.getItem('userdetail');
    const profileImg = localStorage.getItem('profileImage');

    if (userData) {
      this.profileForm.patchValue(JSON.parse(userData));
    }

    if (profileImg) {
      this.profileImage = profileImg;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
        localStorage.setItem('profileImage', this.profileImage as string);
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    if (this.profileForm.valid) {
      const formData = this.profileForm.getRawValue();
      localStorage.setItem('userdetail', JSON.stringify(formData));
      alert('Profile updated successfully!');
    } else {
      alert('Please fill all required fields!');
    }
  }

  clearProfile() {
    if (confirm('Are you sure you want to clear your profile?')) {
      localStorage.removeItem('userdetail');
      localStorage.removeItem('profileImage');
      this.profileForm.reset();
      this.profileImage = '';
      alert('Profile cleared successfully!');
    }
  }

  logout() {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('userdetail');
      localStorage.removeItem('profileImage');
      alert('Logged out successfully!');
    }
  }
}