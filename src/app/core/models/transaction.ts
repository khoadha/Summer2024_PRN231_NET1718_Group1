export interface PaymentTransaction {
    vnPayTransactionId?: string;
    userId?: string;
    amount?: number;
    description?: string;
    transactionStatus?: number;
    createdDate?: any;
    fees?: any[];
    id?: number;
}