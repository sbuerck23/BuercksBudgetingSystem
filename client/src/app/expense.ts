export interface Expense {
    _id?: string;
    userId: string;
    category: string;
    description: string;
    amount: number;
    date: string;
}
