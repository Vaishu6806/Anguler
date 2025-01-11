import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{

  constructor(private httpclint:HttpClient) { }

  
  saveUser(user:User){
    return this.httpclint.post<User>("http://localhost:8000/examapi/saveUser/",User);
  
  }
  validate(user:User){
    return this.httpclint.post<boolean>("http://localhost:8000/examapi/validate/",user);
  
  }

  getAllSubjects()
  {
    //return this.httpclient.get<string[]>("http://localhost:8000/examapi/getAllSubjects/");
    
    return this.httpclint.get<string[]>("http://localhost:8000/examapi/getAllSubjects/");
  
  }
 
}

export class User{
  username:string;
  password:string;
  mobno:number;
  emailid:string;

  constructor(username:string,password:string,mobno:number,emailid:string)
  {
    this.username=username;
    this.password=password;
    this.emailid=emailid;
    this.mobno=mobno;
  }
} 



