import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountCredentials } from 'src/app/models/account-credentials';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.scss']
})
export class LoginCardComponent implements OnInit,OnDestroy {


  //Login form
  loginForm:any;

  //Message box toggle for wrong username/password
  showWrongCredentialsMessageBox:boolean = false;

  //Login form subscription, we'll use it to unsubscribe the observable
  loginFormSubscription!:Subscription;

  constructor(private authService: AuthService, private router:Router) { }

  //Create reactive form when all props are initialized.
  ngOnInit(): void {
    this.createForm();
  }
  ngOnDestroy():void{
    this.loginFormSubscription.unsubscribe();
  }


  //Form creator method
  createForm(){
    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(){

    //Defensive check
    if(!this.loginForm.valid){
      return;
    }

    //Send object to server as a json.
    let postData:AccountCredentials = {
      username:this.loginForm.get('username').value,
      password:this.loginForm.get('password').value
    };

    //If login is successful
    this.loginFormSubscription = this.authService.login(postData).subscribe(login=>{
      if(login){
        //navigate to dashboard
        this.redirectToDashboard();
      }
      else{
        //show error message
        this.showWrongCredentialsMessageBox = true;
      }
    });
  }

  private redirectToDashboard(){
    this.router.navigateByUrl('/dashboard');
  }


}
