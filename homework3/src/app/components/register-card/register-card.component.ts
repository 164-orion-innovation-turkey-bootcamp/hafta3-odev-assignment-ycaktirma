import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountCredentials } from 'src/app/models/account-credentials';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-card',
  templateUrl: './register-card.component.html',
  styleUrls: ['./register-card.component.scss']
})
export class RegisterCardComponent implements OnInit {

  registerForm:any;
  constructor(private authService:AuthService, private router:Router) { }

  //Create reactive form when all props are initialized.
  ngOnInit(): void {
    this.createForm();
  }

  //Form creator method
  createForm(){
    //Send object to server as a json.
    this.registerForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',[Validators.required, Validators.minLength(6) ])
    });
  }

  onSubmit(){
    let postData:AccountCredentials = {
      username:this.registerForm.get('username').value,
      password:this.registerForm.get('password').value
    };

    //If login is successful
    this.authService.createNewAccount(postData).subscribe(success=>{
      this.authService.login(postData).subscribe(login=>{
        if(login){
          //navigate to dashboard
          this.redirectToDashboard();
        }
      });
    });
  }


  private redirectToDashboard(){
    this.router.navigateByUrl('/dashboard');
  }

}
