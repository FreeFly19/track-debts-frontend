import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bill} from '../../../core/bill/bill';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddBillCommand} from '../../../core/bill/add-bill-command';

@Component({
  selector: 'app-bill-form',
  templateUrl: './bill-form.component.html'
})
export class BillFormComponent implements OnInit {
  @Input()
  bill?: Bill;

  @Output()
  created: EventEmitter<AddBillCommand> = new EventEmitter();

  billForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const d = new Date();
    this.billForm = this.fb.group({
      title: ['', Validators.required],
      date: [d.getUTCFullYear() + '-' + d.getUTCMonth() + '-' + d.getUTCDate(), Validators.required]
    });

    if (this.bill) {
      this.billForm.setValue(this.bill);
    }
  }

  submit() {
    this.created.emit({
      title: this.billForm.value.title,
      date: new Date(this.billForm.value.date).getTime()
    });
  }
}
