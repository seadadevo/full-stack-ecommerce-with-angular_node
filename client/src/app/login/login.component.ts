import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private _AuthService: AuthService, private _router: Router) {}

  error: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next:() => {
        if(this._AuthService.userData.getValue() != null){
          this._router.navigate(['/home'])
        }
      }
    })
  }

  loginrForm: FormGroup = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z]/),
      ]),
    });

    submitLoginForm(loginrForm:FormGroup) {
    this.isLoading = true;
    this._AuthService.signin(loginrForm.value).subscribe({
      next:(response)=> {
        this.isLoading = false;
        if(response.token) {
          localStorage.setItem('userToken', response.token)
          this._AuthService.saveUserData()
          this._router.navigate(['/home'])
          this.loginrForm.reset()
        }
      },
      error:(err)=> {
        if(err.error && err.error.message) {
          this.error = err.error.message
        } else {
          this.error = 'Login failed. Please try again.';
        }
      },
      complete: () => {
        this.isLoading = false
      }
    })
    .add(() => {
      this.isLoading = false
    })
  }
  
}