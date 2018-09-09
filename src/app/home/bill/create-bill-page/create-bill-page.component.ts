import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AddBillCommand} from '../../../core/bill/create-bill-command';
import {Router} from '@angular/router';
import {Bill} from '../../../core/bill/bill';

@Component({
  selector: 'app-create-bill-page',
  template: '<app-bill-form (created)="onCreate($event)"></app-bill-form>'
})
export class CreateBillPageComponent implements OnInit {

  constructor(private http: HttpClient,
              private router: Router) {}

  ngOnInit(): void {
  }

  onCreate(cmd: AddBillCommand) {
    this.http.post<Bill>('/api/bills', cmd)
      .subscribe(bill => this.router.navigate(['/', 'bill', bill.id]));
  }
}
