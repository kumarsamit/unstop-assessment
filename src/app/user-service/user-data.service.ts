import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private userDataSubject = new BehaviorSubject<User[]>([
    { name: 'Olivia Thomas', email: 'olivia@gmail.com', role: 'Viewer' },
    { name: 'Daniel White', email: 'daniel@gmail.com', role: 'Editor' },
    { name: 'Emma Harris', email: 'emma@gmail.com', role: 'Admin' },
    { name: 'William Clark', email: 'william@gmail.com', role: 'Editor' },
    { name: 'Ava Lewis', email: 'ava@gmail.com', role: 'Viewer' },
    { name: 'Michael Hall', email: 'michael@gmail.com', role: 'Editor' },
  ]);

  userData$ = this.userDataSubject.asObservable();

  constructor() {}

  updateList(userObj: User) {
    const updatedList = [userObj, ...this.userDataSubject.getValue()];
    this.userDataSubject.next(updatedList);
  }
}
