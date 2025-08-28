import { UsersService } from './../Layout/users.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
  userForm: FormGroup;
  submitted = false;
  fileInvalid = false;
  uploadedFile: File | null = null;
  users: any[] = [];
  savedData: any = null;

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private elRef: ElementRef
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: [''],
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      selectGender: [''],
      uploadAddhar: [''],
      Password: [''],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  ngOnInit() {
    this.fetchUsers();
  }

  onFileChange(event: any) {
    debugger
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        this.fileInvalid = true;
        this.uploadedFile = null;
        this.showToast('Only PDF files are allowed!');
      } else if (file.size > 10 * 1024 * 1024) {
        this.fileInvalid = true;
        this.uploadedFile = null;
        this.showToast('File size must be 10 MB or less!');
      } else {
        this.fileInvalid = false;
        this.uploadedFile = file?.name;
  this.userForm.patchValue({uploadAddhar:file?.name})

      }
    }
  }

  showToast(message: string) {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 3000
    });
  }

 onSubmit() {
  debugger
  this.submitted = true;
  if (this.userForm.invalid || this.fileInvalid || !this.uploadedFile) {
    return;
  }

// const formData = new FormData();
// formData.append('firstName', this.f['firstName'].value);
// formData.append('middleName', this.f['middleName'].value);
// formData.append('lastName', this.f['lastName'].value);
// formData.append('contactNo', this.f['contactNo'].value);
// formData.append('selectGender', this.f['selectGndr'].value);
// formData.append('uploadAddhar', this.uploadedFile!);

  this.userService.saveUser(this.userForm.value).subscribe({
    next: (res: any) => {
      this.showToast('User saved successfully!');
      this.userForm.reset();
      this.uploadedFile = null;
      this.submitted = false;
      this.fetchUsers()
    },

    error: (err: any) => {
      console.error('Error saving user', err);
    }
  });

}
  onDelete() {
    this.savedData = null;
    this.uploadedFile = null;
    this.submitted = false;
  }

  fetchUsers() {
    this.userService.getUsers().subscribe({
      next: (res: any) => {
        this.users = res;
      },
      error: (err: any) => {
        console.error('Error fetching users', err);
      }
    });
  }

 data = [
    { label: "Jan", value: 65, color: "steelblue" },
    { label: "Feb", value: 55, color: "indianred" },
    { label: "Mar", value: 70, color: "yellowgreen" },
    { label: "Apr", value: 90, color: "mediumturquoise" },
    { label: "May", value: 45, color: "mediumpurple" },
    { label: "Jun", value: 80, color: "orange" },
    { label: "Jul", value: 35, color: "chocolate" },
    { label: "Aug", value: 50, color: "firebrick" },
    { label: "Sep", value: 60, color: "cornflowerblue" },
    { label: "Oct", value: 75, color: "seagreen" },
    { label: "Nov", value: 40, color: "goldenrod" },
    { label: "Dec", value: 10, color: "darkorchid" }
  ];



  months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

  // Y-axis max value
  maxY = 400;

  // Series data (can come from API)
  seriesA = [60, 120, 90, 200, 160, 240, 180, 140, 190, 230, 210, 150];
  seriesB = [100, 160, 70, 90, 140, 280, 230, 170, 200, 140, 120, 100];

  // Chart size
  chartWidth = 850;
  chartHeight = 350;
  paddingLeft = 60;
  paddingTop = 50;

  // Convert data → SVG coordinates
  getPoints(data: number[]): string {
    const stepX = (this.chartWidth - this.paddingLeft) / (this.months.length - 1);
    return data.map((val, i) => {
      const x = this.paddingLeft + i * stepX;
      const y = this.chartHeight - (val / this.maxY) * (this.chartHeight - this.paddingTop) + this.paddingTop;
      return `${x},${y}`;
    }).join(' ');
  }

  getCircles(data: number[]): {cx:number, cy:number}[] {
    const stepX = (this.chartWidth - this.paddingLeft) / (this.months.length - 1);
    return data.map((val, i) => {
      const cx = this.paddingLeft + i * stepX;
      const cy = this.chartHeight - (val / this.maxY) * (this.chartHeight - this.paddingTop) + this.paddingTop;
      return { cx, cy };
    });
  }

}
