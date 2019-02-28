import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Bill} from '../../../core/bill/bill';
import {AddBillItemCommand} from '../../../core/bill/add-bill-item-command';
import {BillItem, BillItemParticipant} from '../../../core/bill/bill-item';
import {UserService} from '../../../core/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BillUser} from '../../../core/bill/bill-user';

@Component({
  selector: 'app-create-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit {
  bill?: Bill;
  users: User[] = [];
  billUsers: BillUser[] = [];
  addBillUserForm: FormGroup;

  constructor(private http: HttpClient,
              private fb: FormBuilder,
              private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    const billId = this.route.snapshot.params['id'];
    this.http.get<Bill>('/api/bills/' + billId)
      .subscribe(bill => this.bill = bill);

    this.http.get<User[]>('/api/bills/' + billId + '/users')
      .subscribe(users => this.users = users);

    this.http.get<BillUser[]>('/api/bills/' + billId + '/members')
      .subscribe(billUsers => this.billUsers = billUsers);

    this.addBillUserForm = this.fb.group({
      'userId': ['', Validators.compose([Validators.required, Validators.min(1)])]
    });
  }

  addItem(cmd: AddBillItemCommand) {
    this.http.post('/api/bills/' + this.bill.id + '/items', cmd)
      .subscribe(() => this.ngOnInit());
  }

  dropItem(item: BillItem) {
    this.http.delete('/api/bills/' + this.bill.id + '/items/' + item.id)
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

  isBillCreator() {
    return this.userService.currentUser.id === this.bill.createdBy.id;
  }

  checkBillCreatorByUserId(id: number) {
    return id === this.bill.createdBy.id;
  }

  alreadySetCoefficient(item: BillItem) {
    return !!item.participants.find(p => p.user.id === this.userService.currentUser.id);
  }

  isCurrentUser(p: BillItemParticipant) {
    return p.user.id === this.userService.currentUser.id;
  }

  addBillUser() {
    this.addBillUserForm.get('userId').markAsDirty();
    if (!this.addBillUserForm.valid) {
      return;
    }

    this.http.put('/api/bills/' + this.bill.id + '/members', this.addBillUserForm.value)
      .subscribe(() => this.ngOnInit());
  }

  deleteBillUser(billUserId: number) {
    this.http.delete('/api/bills/' + this.bill.id + '/members/' + billUserId)
      .subscribe(() => this.ngOnInit());
  }
}
