
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
    reference?: Nullable<string>;
    amount: number;
    currency: string;
    date: string;
}

export abstract class IQuery {
    abstract transactions(): Transaction[] | Promise<Transaction[]>;

    abstract transaction(id: string): Nullable<Transaction> | Promise<Nullable<Transaction>>;
}

type Nullable<T> = T | null;
