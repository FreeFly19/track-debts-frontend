import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Bill} from '../../../core/bill/bill';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AddBillCommand} from '../../../core/bill/add-bill-command';
import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

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
  titleRestaurant: any;
  searchFailed = false;

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.autocomplete(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      )
    )

  autocomplete(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http.get<Bill[]>('/api/bill-names', { params: {'search': term} })
      .pipe(map(result => result.map(object => object.title)));
  }

  constructor(private http: HttpClient,
              private fb: FormBuilder) {}

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
