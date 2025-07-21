import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  users = [
    { name: 'Alice', email: 'alice@gmail.com', role: 'Admin', active: true },
    { name: 'Bob', email: 'bob@gmail.com', role: 'User', active: false },
    { name: 'Charlie', email: 'charlie@gmail.com', role: 'Editor', active: true },
    { name: 'Diana', email: 'diana@example.com', role: 'User', active: true },
    { name: 'Eva', email: 'eva@example.com', role: 'User', active: false },
    { name: 'Farhan', email: 'farhan@example.com', role: 'Moderator', active: true },
    { name: 'Gaurav', email: 'gaurav@example.com', role: 'User', active: true },
    { name: 'Heena', email: 'heena@example.com', role: 'Admin', active: true },
    { name: 'Irfan', email: 'irfan@example.com', role: 'User', active: true },
    { name: 'Jiya', email: 'jiya@example.com', role: 'User', active: false },
    // Add more dummy users if needed
  ];
   from = '';
  to = '';
  departDate = '';
  returnDate = '';
  qrData: string = 'https://www.facebook.com/share/16mxGFjN6T/';

  page: number = 1;
  pageSize: number = 5;
  searchTerm: string = '';

  constructor(private router: Router) { }

  filteredUsers() {
    if (!this.searchTerm) return this.users;
    const term = this.searchTerm.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.role.toLowerCase().includes(term)
    );
  }

  totalPages(): number[] {
    const total = Math.ceil(this.filteredUsers().length / this.pageSize);
    return Array(total).fill(0).map((x, i) => i + 1);
  }
  busList = [
    {
      via: 'FOUR LANE BHAGER GHUMARWIN BHOTA',
      name: 'HRTC - 1529',
      type: 'A/C Executive (2+3)',
      rating: 4.5,
      ratingCount: 7,
      startTime: '15:00',
      endTime: '19:00',
      duration: '4h',
      seats: '9 Seats',
      price: 365
    },
    {
      via: 'Mandi Joginder Nagar Route',
      name: 'HRTC - 1602',
      type: 'Non-AC Seater (2+2)',
      rating: 4.2,
      ratingCount: 5,
      startTime: '16:30',
      endTime: '21:00',
      duration: '4.5h',
      seats: '6 Seats',
      price: 315
    },
    {
      via: 'Mandi Joginder Nagar Route',
      name: 'HRTC - 1602',
      type: 'Non-AC Seater (2+2)',
      rating: 4.2,
      ratingCount: 5,
      startTime: '16:30',
      endTime: '21:00',
      duration: '4.5h',
      seats: '6 Seats',
      price: 315
    },
    {
      via: 'Mandi Joginder Nagar Route',
      name: 'HRTC - 1602',
      type: 'Non-AC Seater (2+2)',
      rating: 4.2,
      ratingCount: 5,
      startTime: '16:30',
      endTime: '21:00',
      duration: '4.5h',
      seats: '6 Seats',
      price: 315
    },
    // aur bhi bus items yahan add kar sakte ho
  ];


  showSeat() {
    this.router.navigateByUrl('/busLyt')
  }


   onSearchClick() {
    if (!this.from || !this.to || !this.departDate || !this.returnDate) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: 'Please fill out all fields before searching!',
      });
      return;
    }

    // proceed with search logic
    console.log('Searching...');
  }
}
