import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit{
  constructor(private _AuthService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this._AuthService.userData.subscribe({
      next:() => {
        if(this._AuthService.userData.getValue() != null){
          this._router.navigate(['/home'])
        }
      }
    })
  }
  error: string = '';
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.minLength(3),
      Validators.maxLength(10),
      Validators.required,
    ]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.required,
     Validators.minLength(6)
    ]),
  });


  submitRegisterForm(registerForm:FormGroup) {
    this.isLoading = true;
    this._AuthService.signup(registerForm.value).subscribe({
      next:(response)=> {
        this.isLoading = false;
        if(response.token) {
          localStorage.setItem('userToken', response.token)
          this._AuthService.saveUserData()
          this._router.navigate(['/home'])
          this.registerForm.reset()
        }
      },
      error:(err)=> {
        this.isLoading = false; 
        if (err.error.errors && Array.isArray(err.error.errors)) {
          this.error = err.error.errors[0].msg; 
        } 
        else if (err.error.msg) {
          this.error = err.error.msg;
        } 
        else {
          this.error = 'Registration failed. Please try again.';
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
