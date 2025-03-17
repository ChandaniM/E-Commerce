  import { Component, Inject, OnInit } from '@angular/core';
  import { AddProductComponent } from '../../Components/add-product/add-product.component';
  import { CategoryComponent } from '../../Components/category/category.component';
  import { CommonTableComponent } from '../../Components/common-table/common-table.component';
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
      ProductTableComponent
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
    productInventoryTable :Product[]= [];

    constructor(
      public themeService: ThemeService,
      public userService : UsersService,
      public productService:ProductService,
      private helper: Helper
    ) {
      this.productService.getAllProduct().subscribe((productList:Product[])=> {
        this.productInventoryTable = productList
      })
    }

    selectedComponent: string = 'user-list';

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
      console.log("$$$$$$$$$$$$$$$$$$ userDetails $$$$$$$$$$$$$$");
      
      if ($event.type == "edit") {
        console.log($event);
        this.userDetailsServiceupdate($event);
        this.selectedComponent = 'user-form';
      } else {
        this.userService.deleteUser($event.data).subscribe({
          next: (user) => {
            console.log(user, "from admin content");
            if (user.success) {
              this.helper.showMessage(user.message, "success");
            } else {
              this.helper.showMessage(user.message, "error");
            }
          },
          error: (err) => {
            console.error("API Error:", err);
            const errorMessage = err.error?.message || "Something went wrong!";
            this.helper.showMessage(errorMessage, "error");
          }
        });
      }
    }
    
    onFormUpdated(event: { updated: boolean, data: any  , fromWhere : boolean}) {
      console.log("#################### onFormUpdated ##############");
      
      let userDetails = event.data 
      //  jab koi user table se nhi aaygea tab hi 
      if (!event.fromWhere) {
        this.userDetailsServiceupdate(userDetails);
        this.userService.addNewUser(userDetails).subscribe((result)=>{
          this.userService.getAllUserList().subscribe(api=>{
            if(result.success){
              this.helper.showMessage(result.message , "success")
              this.selectedComponent = "user-list";
            }else{
              this.helper.showMessage(result.message, "error");
            }
          })
        })
      }else{
        // updateUserData
        console.log("value is comming from table to edit the data :::" , event)
        this.userService.updateUserData(userDetails , userDetails.id).subscribe((updatedApiResponse)=>{
          console.log(updatedApiResponse , "this is from updated api resposnse")
          this.helper.showMessage("Currently Its Under Maintaince So Please Wait untill we complete this thank you " , "success")
        })
      }
    }
    userDetailsServiceupdate($event:Object){
      this.userService.setUserDetails($event);
    }
  }
