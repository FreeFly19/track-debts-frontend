import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {BillFormComponent} from './bill/bill-form/bill-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateBillPageComponent} from './bill/create-bill-page/create-bill-page.component';
import {BillListPageComponent} from './bill/bill-list-page/bill-list-page.component';
import {BillPageComponent} from './bill/bill-page/bill-page.component';
import { TransactionListPageComponent } from './transaction/transaction-list-page/transaction-list-page.component';
import {BalancePageComponent} from './balance/balance-page.component';
import {UserPageComponent} from './user/user-page.component';
import {UserFormComponent} from './user/user-form/user-form.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: [
          {path: '', redirectTo: 'balance'},
          {path: 'user', component: UserPageComponent},
          {path: 'bills', component: BillListPageComponent},
          {path: 'create-bill', component: CreateBillPageComponent},
          {path: 'bill/:id', component: BillPageComponent},
          {path: 'transactions', component: TransactionListPageComponent},
          {path: 'balance', component: BalancePageComponent},
        ]
      }
    ])
  ],
  declarations: [
    HomeComponent,
    UserFormComponent,
    UserPageComponent,
    BillFormComponent,
    BillPageComponent,
    BalancePageComponent,
    BillListPageComponent,
    CreateBillPageComponent,
    TransactionListPageComponent
  ]
})
export class HomeModule {
}
