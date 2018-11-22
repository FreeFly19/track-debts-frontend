import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-balance-page',
  templateUrl: './balance-page.component.html'
})
export class BalancePageComponent implements OnInit {
  balanceItems: Balance[] = [];

  constructor(private http: HttpClient,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.http.get<Balance[]>('/api/users/current/balance')
      .subscribe(balanceItems => this.balanceItems = balanceItems);
  }

  pay(b: Balance) {
    const amount = Math.abs(b.balance);
    this.http.get<any>(`/api/liqpay/generate?amount=${amount}&receiver=${b.user.id}`)
      .subscribe(res => {
        // @ts-ignore
        LiqPayCheckout.init({
          data: res.data,
          signature: res.signature,
          language: 'ru',
          mode: 'popup'
        }).on('liqpay.callback', (data) => {
            this.toastr.info('Your transaction is processing. Current status: "' + data.status + '"');
        });
      });
  }
}
