  import { Component, Inject, OnInit } from '@angular/core';
  import { AddProductComponent } from '../../Components/add-product/add-product.component';
  import { CategoryComponent } from '../../Components/category/category.component';
  import { CommonTableComponent } from '../../Components/common-table/common-table.component';
  import { CommonModule } from '@angular/common';
  import { AnalyticsComponent } from '../../Components/analytics/analytics.component';
  import { ThemeService } from '../../Services/theme.service';
  import { UserProfileComponent } from '../../Components/user-profile/user-profile.component';
  import { DynamicFormComponent } from '../../Components/dynamic-form/dynamic-form.component';
  import { ResponseMapperServiceService } from '../../Services/response-mapper-service.service';
import { UserFormComponent } from '../../Components/user-form/user-form.component';
import { UserTableComponent } from '../../Components/user-table/user-table.component';
import { UsersService } from '../../Services/users.service';

  @Component({
    selector: 'admin-dashborad',
    imports: [
      AddProductComponent,
      CategoryComponent,
      CommonTableComponent,
      CommonModule,
      AnalyticsComponent,
      UserProfileComponent,
      UserFormComponent,
      UserTableComponent
    ],
    templateUrl: './admin-dashborad.component.html',
    styleUrl: './admin-dashborad.component.scss',
  })
  export class AdminDashboradComponent implements OnInit {
    dropDownBol: boolean = false;
    userDropdownBol: boolean = false;
    themeModeBol: boolean = false;
    dropdownProfileVisible: boolean = false;
    userManagementTable: { header: any[]; tableData: any[] } = {
      header: [],
      tableData: [],
    };

    dynamicFields = [
      { name: 'username', 
        value : "",
        label: 'Username', 
        type: 'text', 
        required: true 
      },
      { name: 'email', 
        value : "",
        label: 'Email', 
        type: 'email', 
        required: true 
      },
      { name: 'password', 
        value : "",
        label: 'Password', 
        type: 'password', 
        required: true 
      },
      { name: 'first_name', 
        value : "",
        label: 'First Name', 
        type: 'text', 
        required: true 
      },
      { name: 'last_name', 
        value : "",
        label: 'Last Name', 
        type: 'text', 
        required: true 
      },
      {
        name: 'phone_number',
        value : "",
        label: 'Phone Number',
        type: 'text',
        required: true,
      },
      {
        name: 'country',
        value : "",
        label: 'Country',
        type: 'select',
        options: ['India', 'USA', 'Canada'],
        required: true,
      },
      { name: 'place', 
        value : "",
        label: 'Place', 
        type: 'text', 
        required: true 
      },
      { name: 'address', 
        value : "",
        label: 'Address', 
        type: 'textarea', 
        required: true 
      },
      {
        name: 'postal_code',
        value : "",
        label: 'Postal Code',
        type: 'text',
        required: false,
      },
      {
        name: 'date_of_birth',
        value : "",
        label: 'Date of Birth',
        type: 'date',
        required: true,
      },
      {
        name: 'profile_picture',
        value : "",
        label: 'Profile Picture',
        type: 'file',
        required: false,
      },
      {
        name: 'wallet_balance',
        value : "",
        label: 'Wallet Balance',
        type: 'number',
        required: false,
        readonly: true,
        defaultValue: 0.0,
      },
      {
        name: 'is_active',
        value : "",
        label: 'Is Active',
        type: 'checkbox',
        required: false,
        defaultValue: true,
      },
      {
        name: 'role',
        value : "",
        label: 'Role',
        type: 'select',
        options: ['Customer', 'Admin'],
        required: true,
      },
    ];

    constructor(
      public themeService: ThemeService,
      public userService : UsersService
    ) {}

    selectedComponent: string = 'user-list';
    productInventoryTable = {
      header: [
        { name: 'Product Name' },
        { name: 'Product Category' },
        { name: 'Product Price' },
        { name: 'Product Quantity' },
        { name: 'Stock Status' },
        { name: 'Added Date' },
        { name: 'Supplier' },
        { name: 'Settings' },
      ],
      tableData: [
        {
          'Product Name': { value: 'Laptop' },
          'Product Category': 'Electronics',
          'Product Price': { value: 999.99 },
          'Product Quantity': { value: 10 },
          'Stock Status': 'In Stock',
          'Added Date': { value: '2024-03-01' },
          Supplier: 'TechCorp',
          Settings: { icon: 'bi bi-gear' },
        },
        {
          'Product Name': { value: 'Smartphone' },
          'Product Category': 'Electronics',
          'Product Price': { value: 799.5 },
          'Product Quantity': { value: 25 },
          'Stock Status': 'In Stock',
          'Added Date': { value: '2024-02-20' },
          Supplier: 'MobileWorld',
          Settings: { icon: 'bi bi-gear' },
        },
        {
          'Product Name': { value: 'Headphones' },
          'Product Category': 'Accessories',
          'Product Price': { value: 199.99 },
          'Product Quantity': { value: 15 },
          'Stock Status': 'Out of Stock',
          'Added Date': { value: '2024-02-28' },
          Supplier: 'AudioTech',
          Settings: { icon: 'bi bi-gear', onAction: true },
        },
        {
          'Product Name': { value: 'Smartwatch' },
          'Product Category': 'Wearables',
          'Product Price': { value: 299.99 },
          'Product Quantity': { value: 30 },
          'Stock Status': 'In Stock',
          'Added Date': { value: '2024-01-15' },
          Supplier: 'WearableTech',
          Settings: { icon: 'bi bi-gear' },
        },
      ],
    };

    ngOnInit(): void {
      this.themeService.setTheme(this.themeModeBol);
      console.log(this.themeService.getTheme());
    }
   
    showComponent(component: string) {
      console.log('Clicked:', component);
      this.selectedComponent = component;
    }

    ToggleDropDown() {
      this.dropDownBol = !this.dropDownBol;
    }

    onDropdownClick(row: any) {
      console.log('Dropdown Clicked:', row);
    }

    themeMode() {
      this.themeModeBol = !this.themeModeBol;
      this.themeService.setTheme(this.themeModeBol);
      this.themeService.getTheme();
    }
    toggleProfileDropdown() {
      this.dropdownProfileVisible = !this.dropdownProfileVisible;
    }
    onFormSubmitted(user: any) {
      console.log("Form Submitted Data:", user);
    
      this.dynamicFields = this.dynamicFields.map(field => {

        let fieldValue = user[field.label]; // user object me label ke hisaab se value dhoondo
    
        if (fieldValue) {
         if (typeof fieldValue === "object" && fieldValue.hasOwnProperty("value")) {
            fieldValue = fieldValue.value;
          }
    
          return { ...field, value: fieldValue }; // Updated field object
        }
        return field; // No change if value doesn't exist
      });
    
      console.log("Updated Dynamic Fields:", this.dynamicFields);
    }
    
    userDropdownToggle() {
      this.userDropdownBol = !this.userDropdownBol;
    }

    userDetails($event: any) {
      if($event.type == "edit"){
        console.log($event)
        this.userDetailsServiceupdate($event)
        this.selectedComponent = 'user-form';
      }else{
        this.userService.deleteUser($event.data)
      }
    }

    onFormUpdated(event: { updated: boolean, data: any }) {
      if (event.updated) {
        this.userDetailsServiceupdate(event.data);
        this.selectedComponent = "user-list";
        console.log('User form updated successfully:', event.data);
      }
    }
    userDetailsServiceupdate($event:Object){
      this.userService.setUserDetails($event);
    }
  }
