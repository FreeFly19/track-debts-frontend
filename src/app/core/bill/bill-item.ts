export interface BillItem {
  id: number;
  title: string;
  cost: string;
  amount: string;
  createdAt: number;
  participants: BillItemParticipant[];
}

export interface BillItemParticipant {
  user: User;
  coefficient: string;
}
