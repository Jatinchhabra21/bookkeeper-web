export type Transaction = {
	id: string;
	date: Date;
	name: string;
	category: string;
	amount: number;
	type: TransactionType;
};

export type CreateTransactionRequest = {
	date: Date;
	name: string;
	category: TransactionCategory;
	amount: number;
	type: TransactionType.DEBIT;
};

export enum TransactionCategory {
	SHOPPING = 'shopping',
	FOOD = 'food',
	HOUSING = 'housing',
	TRANSPORTATION = 'transportation',
	VEHICLE = 'vehicle',
	ENTERTAINMENT = 'entertainment',
	COMMUNICATION = 'communication',
	FINANCIAL_EXPENSES = 'financial expenses',
	INVESTMENT = 'investment',
	NONE = 'none',
}

export enum TransactionType {
	CREDIT = 'credit',
	DEBIT = 'debit',
}

export const MONTH = [
	'jan',
	'feb',
	'mar',
	'apr',
	'may',
	'jun',
	'jul',
	'aug',
	'sep',
	'oct',
	'nov',
	'dec',
];
