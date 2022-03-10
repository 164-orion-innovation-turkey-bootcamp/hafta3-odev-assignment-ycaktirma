import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  logOut(){
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }

}
