import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin:FormGroup =new FormGroup({
    userName:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })

  get userName(){
    return this.formLogin.get("userName");
  }
  get password(){
    return this.formLogin.get("password");
  }


  constructor(private authService:AuthService , private router:Router ,private toastrService:ToastrService ) { }

  ngOnInit(): void {
  }

  OnLoginSubmit(){
    const {userName, password} = this.formLogin.value;
    this.authService.Login(userName,password).subscribe(a=>{
      this.router.navigate(["/"]);
    } , error=>{
    
      this.toastrService.error(error.error.error_description, "Error", {
        timeOut: 3000,
      });
    
    });
  }

}
