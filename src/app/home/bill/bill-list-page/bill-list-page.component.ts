import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Page} from '../../../core/page';
import {Bill} from '../../../core/bill/bill';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list-page.component.html',
  styleUrls: ['./bill-list-page.component.scss']
})
export class BillListPageComponent implements OnInit {
  bills: Page<Bill>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Page<Bill>>('/api/bills')
      .subscribe(bills => {
        this.bills = bills;
      });
  }

  loadPage(page) {
    console.log(page);
  }

}
