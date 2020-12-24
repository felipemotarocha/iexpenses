import { Income } from "./income.types";
import { NonRecurringExpense } from "./non-recurring-expense.types";
import { RecurringExpense } from "./recurring-expense.types";

export type User = {
	_id: string;
	name: string;
	email: string;
	password: string;
	recurringExpenses?: RecurringExpense[];
	nonRecurringExpenses?: NonRecurringExpense[];
	incomes?: Income[];
};
