import { Component, OnInit } from '@angular/core';
import {Transaction} from '../../../core/transaction';
import {HttpClient} from '@angular/common/http';
import {Page} from '../../../core/page';

@Component({
  selector: 'app-transaction-list-page',
  templateUrl: './transaction-list-page.component.html'
})
export class TransactionListPageComponent implements OnInit {
  transactions?: Page<Transaction>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Page<Transaction>>('/api/transactions')
      .subscribe(transactions => this.transactions = transactions);
  }

}
