interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  displayName?: string;
  cardNumber?: string;
  canAcceptPayment?: boolean;
}
