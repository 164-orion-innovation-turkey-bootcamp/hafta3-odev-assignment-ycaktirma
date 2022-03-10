import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountCredentials } from '../models/account-credentials';
import { Observable, Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL_BASE = "http://localhost:3000/";
  private userTable = 'users';

  constructor(private http:HttpClient) { }

  createNewAccount(account:AccountCredentials){
    return this.http.post(this.API_URL_BASE+this.userTable, account);
  }

  /**
   * Takes AccountCredentials, returns an Observable<boolean> due to success of the login process
   * @param credentials {AccountCredentials}
   * @returns Observable<boolean>
   */
  login(credentials:AccountCredentials): Observable<boolean>{
    //Login logic flag
    let successful:boolean = false;
    //Return new observable based 
    return new Observable(subscriber =>{
      this.http.get<any[]>(this.API_URL_BASE+this.userTable).subscribe(data=>{
        data.forEach(user=>{
          //If the db has the username password combination;
          if( user.username === credentials.username && user.password === credentials.password ){
            //login is successful
            successful = true;

            //Save the authentication info to localStorage. Demo only!!
            let localStorageItem = {
              user_id: user.id,
              isLoggedIn: true
            }

            localStorage.setItem('user', JSON.stringify(localStorageItem) );
          }
        })
        //Pass the successful boolean
        subscriber.next(successful);
        subscriber.complete();
      });
      
    });
  }

  isLoggedIn():boolean{
    let user = localStorage.getItem('user');
    return user != null;
  }
}
