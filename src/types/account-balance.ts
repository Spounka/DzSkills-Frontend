import { Dayjs } from 'dayjs';
import { User } from './user';

export type AccountBalance = {
    id: number;
    user: User;
    balance: number;
};

export type MoneyRequest = {
    id: number;
    account: AccountBalance;
    amount: number;
    status: 'approved' | 'rejected';
    date?: Dayjs;
};
