import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Admin, AdminService } from '../admin.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit
{

  user:User=new User('','',0,'');
  message:string='';
  subject:string='';
  
  admin:Admin=new Admin('','');
  subjects:string[]=[]

  constructor(private userservice:UserService,private router:Router,private adminService:AdminService)
  {

  }
  ngOnInit(): void 
  {
    this.userservice.getAllSubjects().subscribe(array=>this.subjects=array)
  }

  validate()
  {
      this.userservice.validate(this.user).subscribe(response=>{

        if(response)
        {
            
            sessionStorage.setItem('subject',this.subject);
            sessionStorage.setItem('username',this.user.username);

            this.router.navigateByUrl("question");
        }
        else
        {
            this.message="invalid credentials";
            this.router.navigateByUrl("login");
        }

      });
  }
  
  validate2()
  {
    this.admin.username=this.user.username;
    this.admin.password=this.user.password;

      this.adminService.validate2(this.admin).subscribe(answer=>{if(answer)
      {
        this.router.navigate(['admindashboard']);
      }
    
      else
      {
        this.router.navigate(['login']);
        this.message="invalid credentials";
      }
    });
  }

  
}




