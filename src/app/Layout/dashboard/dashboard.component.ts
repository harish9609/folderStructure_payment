import { Component } from '@angular/core';

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
qrData: string = 'https://www.facebook.com/share/16mxGFjN6T/';

  page: number = 1;
  pageSize: number = 5;
  searchTerm: string = '';

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
}
