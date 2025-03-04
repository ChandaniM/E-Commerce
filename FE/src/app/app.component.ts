import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { AdminDashboradComponent } from './Pages/admin-dashborad/admin-dashborad.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , NavbarComponent , FooterComponent , AdminDashboradComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'FE';
  themeMode : string = ""
  isAdmin : boolean = false;

  ngOnInit(): void {
    this.themeMode  = environment.themeMode 
  }
}
