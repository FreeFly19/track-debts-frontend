interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  cardNumber?: string;
  canAcceptPayment: boolean;
}
