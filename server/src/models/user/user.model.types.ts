import { Document, Model } from "mongoose";

import { IIncomeDocument } from "../income/income.model.types";
import { INonRecurringExpenseDocument } from "../non-recurring-expense/non-recurring-expense.model.types";
import { IRecurringExpenseDocument } from "../recurring-expense/recurring-expense.model.types";

export interface IUserDocument extends Document {
	name: string;
	email: string;
	password: string;
	recurringExpenses?: IRecurringExpenseDocument[];
	nonRecurringExpenses?: INonRecurringExpenseDocument[];
	incomes?: IIncomeDocument[];
}

export interface IUserModel extends Model<IUserDocument> {
	findByIdAndPopulateExpensesAndIncomes: (id: string) => Promise<any>;
	findAllAndPopulateExpensesAndIncomes: () => Promise<any>;
	loginWithEmailAndPassword: (email: string, password: string) => Promise<any>;
}
