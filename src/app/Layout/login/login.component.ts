import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  email: string = '';
  password: string = '';

  dummyUser = {
    email: 'sachuBawa@gmail.com',
    password: '123456'
  };

  constructor(private router: Router) { }


  onSubmit(form: any) {
    if (form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill in all fields correctly.'
      });
      return;
    }

    if (
      this.email === this.dummyUser.email &&
      this.password === this.dummyUser.password
    ) {
      this.router.navigate(['/dashboard']);

      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Welcome, ${this.email}`
      });


    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid email or password'
      });
    }
  }
}
