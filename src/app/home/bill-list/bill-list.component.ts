import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Page} from '../../core/page';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {
  bills: Page<any>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Page<any>>('/api/bills')
      .subscribe(bills => {
        this.bills = bills;
      });
  }

  loadPage(page) {
    console.log(page);
  }

}
