export type AccountBalance = {
    id: number
    user: number,
    balance: number,
}

export type MoneyRequest = {
    id: number,
    account: AccountBalance,
    amount: number
    status: 'approved' | 'rejected',
}
