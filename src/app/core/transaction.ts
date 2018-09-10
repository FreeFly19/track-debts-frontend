import {Bill} from './bill/bill';

export interface Transaction {
  sender: User;
  receiver: User;
  amount: string;
  createdAt: number;
  bill: Bill;
}
