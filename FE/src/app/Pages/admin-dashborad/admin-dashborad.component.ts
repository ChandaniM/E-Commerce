import { Component, OnInit } from '@angular/core';
import { AddProductComponent } from '../../Components/add-product/add-product.component';
import { CategoryComponent } from '../../Components/category/category.component';
import { CommonModule } from '@angular/common';
import { AnalyticsComponent } from '../../Components/analytics/analytics.component';
import { ThemeService } from '../../Services/theme.service';
import { UserProfileComponent } from '../../Components/user-profile/user-profile.component';
import { UserFormComponent } from '../../Components/user-form/user-form.component';
import { UserTableComponent } from '../../Components/user-table/user-table.component';
import { UsersService } from '../../Services/users.service';
import { Helper } from '../../helpers/helper';
import { ProductTableComponent } from '../../Components/product-table/product-table.component';
import { ProductService } from '../../Services/product.service';
import { every, Subscription } from 'rxjs';

export interface Product {
  product_id: string;
  product_name: string;
  short_title: string;
  category: string;
  discounted_price: string;
  actual_price: string;
  discount_percentage: string;
  rating: number;
  rating_count: number;
  about_product: string;
  detail_description: string;
  grams: string;
  on_sale: number;
  user_id: number;
  user_name: string;
  review_id: string;
  review_title: string;
  review_content: string;
  img_link: string;
  product_link: string;
}

@Component({
  selector: 'admin-dashborad',
  imports: [
    AddProductComponent,
    CategoryComponent,
    CommonModule,
    AnalyticsComponent,
    UserProfileComponent,
    UserFormComponent,
    UserTableComponent,
    ProductTableComponent,
  ],
  templateUrl: './admin-dashborad.component.html',
  styleUrl: './admin-dashborad.component.scss',
})
export class AdminDashboradComponent implements OnInit {
  private productSubscription!: Subscription;
  private userSubscription!: Subscription;
  dropDownBol: boolean = true;
  userDropdownBol: boolean = true;
  themeModeBol: boolean = false;
  dropdownProfileVisible: boolean = false;
  userManagementTable: { header: any[]; tableData: any[] } = {
    header: [],
    tableData: [],
  };

  productInventoryTable: Product[] = [];

  constructor(
    public themeService: ThemeService,
    public userService: UsersService,
    public productService: ProductService,
    private helper: Helper
  ) {}

  selectedComponent: string = 'add-product';
  toggleDropdown = true;
  ngOnInit(): void {
    this.themeService.setTheme(this.themeModeBol);
    this.productSubscription = this.productService.getAllProduct().subscribe({
      next: (productList: Product[]) => {
        this.productInventoryTable = productList;
      },
      error : (err)=>{
        console.log(err)
      }
    });
  }

  showComponent(component: string) {
    console.log('Clicked:', component);
    this.selectedComponent = component;
  }

  drawerSlider() {
    this.toggleDropdown = !this.toggleDropdown;
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

  userDropdownToggle() {
    this.userDropdownBol = !this.userDropdownBol;
  }

  userDetails($event: any) {
    if ($event.type == 'edit') {
      console.log($event);
      this.userDetailsServiceupdate($event);
      this.selectedComponent = 'user-form';
    } else {
      console.log($event.id);
      this.userService.deleteUser($event.data).subscribe({
        next: (user) => {
          console.log(user, 'from admin content');
          if (user.success) {
            this.helper.showMessage(user.message, 'success');
          } else {
            this.helper.showMessage(user.message, 'error');
          }
        },
        error: (err) => {
          console.error('API Error:', err);
          const errorMessage = err.error?.message || 'Something went wrong!';
          this.helper.showMessage(errorMessage, 'error');
        },
      });
    }
  }
  refreshUserList() {
    this.userService.getAllUserList().subscribe();
  }

  onFormUpdated(event: { updated: boolean; data: any; fromWhere: boolean }) {
    let userDetails = event.data;

    if (!event.fromWhere) {
      this.userDetailsServiceupdate(userDetails);

      this.userService.addNewUser(userDetails).subscribe({
        next: (result) => {
          this.refreshUserList(); // Ensure the user list refreshes after adding
          if (result.success) {
            this.helper.showMessage(result.message, 'success');
            this.selectedComponent = 'user-list';
          } else {
            this.helper.showMessage(result.message, 'error');
          }
        },
        error: (error) => {
          console.error('Error in adding user:', error);
          this.helper.showMessage(
            'Something went wrong! Please try again.',
            'error'
          );
        },
      });
    } else {
      // Update User Data
      console.log('Value is coming from table to edit the data :::', event);

      this.userService.updateUserData(userDetails, userDetails.id).subscribe({
        next: (updatedApiResponse) => {
          console.log(updatedApiResponse, 'this is from updated API response');
          this.helper.showMessage(
            "Currently It's Under Maintenance, Please Wait Until We Complete This. Thank You!",
            'success'
          );
        },
        error: (error) => {
          console.error('Error in updating user:', error);
          this.helper.showMessage(
            'Failed to update user. Please try again.',
            'error'
          );
        },
      });
    }
  }

  userDetailsServiceupdate($event: Object) {
    this.userService.setUserDetails($event);
  }

  callByChildren(event: any) {
    this.selectedComponent = event.type;
  }

  ngOnDestroy(): void {
    if (this.productSubscription) this.productSubscription.unsubscribe();
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }
}
