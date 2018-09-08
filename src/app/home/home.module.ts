import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule} from '@angular/router';
import {BillListComponent} from './bill-list/bill-list.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
        children: [
          {path: '', redirectTo: 'bills'},
          {path: 'bills', component: BillListComponent}
        ]
      }
    ])
  ],
  declarations: [HomeComponent, BillListComponent]
})
export class HomeModule { }
