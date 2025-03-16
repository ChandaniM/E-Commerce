import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AdminDashboradComponent } from './Pages/admin-dashborad/admin-dashborad.component';
import { environment } from '../environments/environment';
import { ToastComponent } from './Components/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , NavbarComponent , FooterComponent , AdminDashboradComponent , ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'FE';
  themeMode : string = ""
  isAdmin : boolean = true;

  ngOnInit(): void {
    this.themeMode  = environment.themeMode 
  }
}
