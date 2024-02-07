export default interface PaymentDetails {
    date: string | number | Date;
    
    _id?: string | undefined;
    courseAmount: number;
    courseTitle:string,
    createdBy:string,
    usedEmail: string;
    type: string;
    transactionId: number;
    cardType: string;
    courseId:string;
   
  }