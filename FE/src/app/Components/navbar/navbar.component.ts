import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent  implements OnInit , OnChanges  , OnDestroy{


  constructor(private router: Router){}

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnDestroy(): void {
    
  }

  login(){
    this.router.navigate(['login']);
  }
}
