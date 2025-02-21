import * as mongodb from "mongodb";

export interface Expense {
    _id?: mongodb.ObjectId;
    category: string;
    description: string;
    amount: number;
    date: string;
}