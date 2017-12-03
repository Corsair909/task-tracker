import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
      firstname: new FormControl('', [
        Validators.required,
      ]),
      lastname: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  onRegisterSubmit(value) {
    let user = {
      firstname: value.firstname,
      lastname: value.lastname,
      email: value.email,
      password: value.password
    }

    this.authService.registerUser(user).subscribe(data => {
      this.router.navigate(['/dashboard']);
    });
  }

  get firstname() { return this.registerForm.get('firstname'); }

  get lastname() { return this.registerForm.get('lastname'); }

  get email() { return this.registerForm.get('email'); }

  get password() { return this.registerForm.get('password'); }

}
