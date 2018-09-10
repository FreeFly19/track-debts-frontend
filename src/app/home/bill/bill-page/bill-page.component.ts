import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Bill} from '../../../core/bill/bill';
import {AddBillItemCommand} from '../../../core/bill/add-bill-item-command';
import {BillItem} from '../../../core/bill/bill-item';

@Component({
  selector: 'app-create-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit {
  bill?: Bill;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.http.get<Bill>('/api/bills/' + this.route.snapshot.params['id'])
      .subscribe(bill => this.bill = bill);
  }

  addItem(cmd: AddBillItemCommand) {
    this.http.post('/api/bills/' + this.bill.id + '/items', cmd)
      .subscribe(() => this.ngOnInit());

  }

  setCoefficient(item: BillItem, coefficient: string) {
    this.http.put(`/api/bills/${this.bill.id}/items/${item.id}/participate`, {coefficient})
      .subscribe(() => this.ngOnInit());
  }

  lock() {
    this.http.put(`/api/bills/${this.bill.id}/lock`, {})
      .subscribe(() => this.ngOnInit());
  }
}
