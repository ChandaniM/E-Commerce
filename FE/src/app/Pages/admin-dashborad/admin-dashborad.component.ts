import { Component, Inject, OnInit } from '@angular/core';
import { AddProductComponent } from '../../Components/add-product/add-product.component';
import { CategoryComponent } from '../../Components/category/category.component';
import { CommonTableComponent } from '../../Components/common-table/common-table.component';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from '../../Components/analytics/analytics.component';
import { ThemeService } from '../../Services/theme.service';
import { UserProfileComponent } from '../../Components/user-profile/user-profile.component';

@Component({
  selector: 'admin-dashborad',
  imports: [
    AddProductComponent,
    CategoryComponent,
    CommonTableComponent,
    CommonModule,
    AnalyticsComponent,
    UserProfileComponent
  ],
  templateUrl: './admin-dashborad.component.html',
  styleUrl: './admin-dashborad.component.scss',
})
export class AdminDashboradComponent implements OnInit {
  dropDownBol: boolean = false;
  themeModeBol: boolean = false;
  dropdownProfileVisible: boolean = false;

  constructor(public themeService: ThemeService) {}

  selectedComponent: string = 'dashboard';
  tableData = [
    {
      firstName: 'Destinee',
      lastName: 'Fisher',
      age: 23,
      city: 'San Francisco',
      balance: 1229,
      creditCardNumber: '6759-0319-9274-6344-128',
      phone: '621-788-2863',
    },
    {
      firstName: 'Elwyn',
      lastName: 'Bauch',
      age: 62,
      city: 'Port Madonna',
      balance: 3607,
      creditCardNumber: '3008-609932-1652',
      phone: '470-203-5911',
    },
  ];

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
}
