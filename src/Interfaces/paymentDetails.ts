export default interface PaymentDetails {
    courseAmount: number;
    courseTitle:string,
    createdBy:string,
    usedEmail: string;
    type: string;
    transactionId: number;
    cardType: string;
  }