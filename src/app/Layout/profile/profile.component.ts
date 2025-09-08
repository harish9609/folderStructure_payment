import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  myForm: FormGroup;
  submitted = false;
  currentStep = 0;
  formSubmitted = false;
  formData: any;

  steps = ['Personal Details', 'Other Details', 'Address'];

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      fullName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      custom1: ['', Validators.required],
      custom2: ['', Validators.required],
      custom3: ['', Validators.required],
      custom4: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', [Validators.required, Validators.maxLength(150)]]
    });
  }

  // Move to next step
  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  // Move to specific step
  goToStep(index: number) {
    this.currentStep = index;
  }

  // Submit form
  onSubmit() {
    this.submitted = true;

    Object.values(this.myForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });

    if (this.myForm.valid) {
      this.formData = this.myForm.value;
      this.formSubmitted = true;

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Form Submitted Successfully 🎉',
        confirmButtonColor: '#198754'
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all required fields ❌',
        confirmButtonColor: '#dc3545'
      });
    }
  }

}
