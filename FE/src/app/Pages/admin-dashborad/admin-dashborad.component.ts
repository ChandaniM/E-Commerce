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

@Component({
  selector: 'admin-dashborad',
  imports: [
    AddProductComponent,
    CategoryComponent,
    CommonTableComponent,
    CommonModule,
    AnalyticsComponent,
    UserProfileComponent,
    DynamicFormComponent,
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
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'first_name', label: 'First Name', type: 'text', required: true },
    { name: 'last_name', label: 'Last Name', type: 'text', required: true },
    {
      name: 'phone_number',
      label: 'Phone Number',
      type: 'text',
      required: true,
    },
    {
      name: 'country',
      label: 'Country',
      type: 'select',
      options: ['India', 'USA', 'Canada'],
      required: true,
    },
    { name: 'place', label: 'Place', type: 'text', required: true },
    { name: 'address', label: 'Address', type: 'textarea', required: true },
    {
      name: 'postal_code',
      label: 'Postal Code',
      type: 'text',
      required: false,
    },
    {
      name: 'date_of_birth',
      label: 'Date of Birth',
      type: 'date',
      required: true,
    },
    {
      name: 'profile_picture',
      label: 'Profile Picture',
      type: 'file',
      required: false,
    },
    {
      name: 'wallet_balance',
      label: 'Wallet Balance',
      type: 'number',
      required: false,
      readonly: true,
      defaultValue: 0.0,
    },
    {
      name: 'is_active',
      label: 'Is Active',
      type: 'checkbox',
      required: false,
      defaultValue: true,
    },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      options: ['Customer', 'Admin'],
      required: true,
    },
  ];

  constructor(
    public themeService: ThemeService,
    private mapperService: ResponseMapperServiceService
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
    this.loadUserData();
    console.log(this.themeService.getTheme());
  }
  loadUserData() {
    this.mapperService.getModifyUserList().subscribe((modifiedData) => {
      this.userManagementTable.header = modifiedData.header;
      this.userManagementTable.tableData = modifiedData.tableData;
    });
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
    console.log(user, 'from the parent');
    // this.users.push(user);
  }
  userDropdownToggle() {
    this.userDropdownBol = !this.userDropdownBol;
  }
}
