import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    public _dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closePopup(){
    this._dialogRef.close();
  }

  createUser(){
    if(this.userFormGroup.status === 'INVALID'){
      return
    }
    console.log("!111111111", this.userFormGroup.value)
  }
}

export default UserFormComponent;
