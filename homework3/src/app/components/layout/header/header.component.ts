import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showLogOutButton:boolean = false;
  constructor(private authService:AuthService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
  }
  //Auth service implementations
  logout(){
    this.authService.logout();  
  }
  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}
