
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Transaction {
    id: string;
    accountId: string;
    categoryId?: Nullable<string>;
    category?: Nullable<Category>;
    account?: Nullable<Account>;
    reference?: Nullable<string>;
    amount: number;
    currency: string;
    date: Date;
}

export class Category {
    id: string;
    name: string;
    color?: Nullable<string>;
}

export class Account {
    id: string;
    name: string;
    bank: string;
}

export abstract class IQuery {
    abstract transactions(skip: number, take: number, search?: Nullable<string>, account?: Nullable<string>, bank?: Nullable<string>, initDate?: Nullable<Date>, endDate?: Nullable<Date>): Transaction[] | Promise<Transaction[]>;

    abstract transaction(id: string): Nullable<Transaction> | Promise<Nullable<Transaction>>;
}

type Nullable<T> = T | null;
