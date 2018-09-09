import {BillItem} from './bill-item';

export interface Bill {
  id: number;
  title: string;
  date: number;
  createdAt: number;
  createdBy: User;
  items: BillItem[];
}
