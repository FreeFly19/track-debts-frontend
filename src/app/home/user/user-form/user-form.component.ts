import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bill} from '../../../core/bill/bill';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddBillCommand} from '../../../core/bill/add-bill-command';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {
  @Input()
  user: User;

  @Output()
  updated: EventEmitter<User> = new EventEmitter();

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      cardNumber: [null, Validators.required]
    });

    if (this.user) {
      const data: any = Object.keys(this.userForm.controls).reduce((acc, ctrlName) => {
        acc[ctrlName] = this.user[ctrlName];
        return acc;
      }, {});

      if (data.cardNumber) {
        data.cardNumber = data.cardNumber.split('')
          .reduce((p, c, i) => p + c + ((i + 1) % 4 === 0 && i !== 15 ? '-' : ''));
      }

      this.userForm.setValue(data);
    }
  }

  submit() {
    const data = {
      firstName: this.userForm.value.firstName || null,
      lastName: this.userForm.value.lastName || null,
      cardNumber: this.userForm.value.cardNumber || null
    };

    data.cardNumber = data.cardNumber && data.cardNumber.replace(/[\s\\-]/ig, '');

    this.updated.emit(Object.assign({}, this.user, data));
  }
}
