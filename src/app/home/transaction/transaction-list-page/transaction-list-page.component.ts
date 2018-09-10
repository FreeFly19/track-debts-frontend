import { Component, OnInit } from '@angular/core';
import {Transaction} from '../../../core/transaction';
import {HttpClient} from '@angular/common/http';
import {Page} from '../../../core/page';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-transaction-list-page',
  templateUrl: './transaction-list-page.component.html'
})
export class TransactionListPageComponent implements OnInit {
  transactions?: Page<Transaction>;
  users: User[] = [];
  acceptMoneyForm: FormGroup;

  constructor(private http: HttpClient,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.http.get<Page<Transaction>>('/api/transactions')
      .subscribe(transactions => this.transactions = transactions);

    this.http.get<User[]>('/api/users')
      .subscribe(users => this.users = users);

    this.acceptMoneyForm = this.fb.group({
      'senderId': ['', Validators.compose([Validators.required, Validators.min(1)])],
      'amount': ['', Validators.compose([Validators.required, Validators.min(1)])]
    });
  }

  loadPage(page) {
    console.log(page);
  }

  acceptMoney() {
    // TODO: not strong typed
    this.http.post('/api/transactions', this.acceptMoneyForm.value)
      .subscribe(() => this.ngOnInit());
  }
}
