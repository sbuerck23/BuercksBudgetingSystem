import * as mongodb from "mongodb";

export interface Expense {
    _id?: mongodb.ObjectId;
    userId: string;
    category: string;
    description: string;
    amount: number;
    date: string;
}