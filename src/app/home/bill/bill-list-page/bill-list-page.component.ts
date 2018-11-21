import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Page} from '../../../core/page';
import {Bill} from '../../../core/bill/bill';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list-page.component.html',
  styleUrls: ['./bill-list-page.component.scss']
})
export class BillListPageComponent implements OnInit {
  bills: Page<Bill>;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .pipe(
        map(params => Object.assign({}, {page: 1}, params)),
        tap(params => params.page = params.page - 1),
        switchMap(params => this.http.get<Page<Bill>>('/api/bills?page=' + params.page + '&size=10'))
      )
      .subscribe(bills => this.bills = bills);
  }

  loadPage(page) {
    const path = this.route.snapshot.pathFromRoot
      .map(p => p.routeConfig ? p.routeConfig.path : '/')
      .filter(s => s);

    this.router.navigate(path, {queryParams: {page: page}});
  }

}
