import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-balance-page',
  templateUrl: './balance-page.component.html'
})
export class BalancePageComponent implements OnInit {
  balanceItems: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>('/api/users/current/balance')
      .subscribe(balanceItems => this.balanceItems = balanceItems);
  }
}
