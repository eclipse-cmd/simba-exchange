import { type } from "os";
import { User, Wallet } from "./pages/api/app/model";


export type APIResponse = {
    status: boolean,
    message: string,
    data?: [];
};

export type UserInput = {
    name?: string;
    email: string;
    password: string;
    password_confirmation?: string;
};

export type TransactionInput = {
    receiver_id: string;
    amount: string;
    type: string;
    source_currency: string;
    target_currency: string;
    exchange_rate: string;
    description?: string;
    user: {
        _id: string;
        email: string;
    };
};

export type WalletSwapInput = {
    amount: string;
    source_wallet: string;
    target_wallet: string;
    user: {
        _id: string;
        email: string;
    };
};

export type User = {
    _id: string;
    name: string;
    email: string,
    created_at: Date,
    upgraded_at: Date,
};

export type Wallet = {
    _id: string;
    owner_id: string;
    type: string,
    amount: string,
    created_at: Date,
    upgraded_at: Date,
};

export type InitialState = {
    users: [User] | null,
    auth: User | null,
    token: string | null,
    wallet: [Wallet] | null;
};

export type TransactionResponse = {
    transaction: [],
    page: number,
    pages: number;
};