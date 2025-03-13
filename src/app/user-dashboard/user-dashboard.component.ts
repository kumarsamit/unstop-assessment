import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent {
  displayedColumns: string[] = ['name', 'email', 'role'];
  usersList = [
    { name: 'Olivia Thomas', email: 'olivia@gmail.com', role: 'Manager' },
    { name: 'Daniel White', email: 'daniel@gmail.com', role: 'User' },
    { name: 'Emma Harris', email: 'emma@gmail.com', role: 'Admin' },
    { name: 'William Clark', email: 'william@gmail.com', role: 'User' },
    { name: 'Ava Lewis', email: 'ava@gmail.com', role: 'Manager' },
    { name: 'Michael Hall', email: 'michael@gmail.com', role: 'User' }
  ];
  
  filteredUsersList = [...this.usersList];
  

  constructor() {


  }

  searchUsers(event: string) {
    if (!event.trim()) {
      this.filteredUsersList = [...this.usersList]; // Reset if input is empty
      return;
    }
  
    this.filteredUsersList = this.usersList.filter(user =>
      user.name.toLowerCase().includes(event.trim().toLowerCase())
    );
  }
  


}
