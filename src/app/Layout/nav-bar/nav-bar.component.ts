import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

constructor(private router: Router) {}


  @Output() toggleSidebar = new EventEmitter<void>();

  toggle() {
    this.toggleSidebar.emit();
  }

logout() {
  // Clear user data if stored (optional)
  localStorage.clear(); // or AuthService.logout()

  // Redirect to login (which uses AuthLayout)
  this.router.navigate(['/']);
}
}
