import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { PasswordValidation } from './password-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  registerForm: FormGroup;
  
  ngOnInit(): void {
    this.registerForm = new FormGroup({
      job: new FormControl('Developer'),
      firstname: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]*$/)
      ]),
      lastname: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z]*$/)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      confirmPassword: new FormControl('', [
      ])
    });
  
    // Match is Confirming password equal original
    function passwordMatchValidator(g: FormControl) {
      return g.get('password').value === g.get('retype_password').value ? null : {'mismatch': true};
    }
  }
  
  onRegisterSubmit(value) {
    const user = {
      job: value.job,
      firstname: value.firstname,
      lastname: value.lastname,
      email: value.email,
      password: value.password
    };
  
    console.log(user);
  
    this.authService.registerUser(user).subscribe(data => {
       this.router.navigate(['/login']);
    });
  }
  
  get job() { return this.registerForm.get('job'); }
  get firstname() { return this.registerForm.get('firstname'); }
  get lastname() { return this.registerForm.get('lastname'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }
}