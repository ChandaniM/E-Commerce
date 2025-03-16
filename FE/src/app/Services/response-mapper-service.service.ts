import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponseMapperServiceService {

  // userDetailsSub  = new BehaviorSubject ({});
  constructor(private userService  :UsersService) { }


  // getModifyUserList() {
  //   return this.userService.getAllUserList().pipe(map(userData => this.transformUserData(userData)));
  // }
  
  // transformUserData(apiData: any[]): any {
  //   return {
  //     header: [
  //       { name: "Username" },
  //       { name: "Email" },
  //       { name: "Password" },
  //       { name: "First Name" },
  //       { name: "Last Name" },
  //       { name: "Phone Number" },
  //       { name: "Country" },
  //       { name: "Place" },
  //       { name: "Address" },
  //       { name: "Postal Code" },
  //       { name: "Date of Birth" },
  //       { name: "Wallet Balance" },
  //       { name: "Is Active" },
  //       { name: "Created At" },
  //       { name: "Updated At" },
  //       { name: "Role" },
  //       { name: "Settings" }
  //     ],
  //     tableData: apiData.map(user => ({
  //       "Id" :  user.id,
  //       "Username": { value: user.username },
  //       "Email": { value: user.email },
  //       "Password": "********",  // Masked Password
  //       "First Name": user.first_name,
  //       "Last Name": user.last_name,
  //       "Phone Number": { value: user.phone_number },
  //       "Country": user.country,
  //       "Place": user.place,
  //       "Address": user.address,
  //       "Postal Code": user.postal_code,
  //       "Date of Birth": { value: new Date(user.date_of_birth).toISOString().split('T')[0] }, // Format Date
  //       "Wallet Balance": { value: parseFloat(user.wallet_balance) },
  //       "Is Active": user.is_active ? "yes" : "no",
  //       "Created At": new Date(user.created_at).toLocaleString(),
  //       "Updated At": new Date(user.updated_at).toLocaleString(),
  //       "Role": user.role,
  //       "Settings": { icon: "bi bi-gear", onAction: true }
  //     }))
  //   };
  // }
}
