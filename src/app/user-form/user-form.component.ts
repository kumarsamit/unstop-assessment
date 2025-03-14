import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserDataService } from '../user-service/user-data.service';

interface User {
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  userFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^(?!\s*$).+/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
  })

  constructor(
    public _userDataService: UserDataService,
    public _dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  closePopup() {
    this._dialogRef.close();
  }

  createUser() {
    if (this.userFormGroup.status === 'INVALID') {
      return
    }
    const newUser = {
      name: this.userFormGroup.value.name,
      email: this.userFormGroup.value.email,
      role: this.userFormGroup.value.role,
    } as User;

    this._userDataService.updateList(newUser);
    this._dialogRef.close();
  }
}

export default UserFormComponent;
