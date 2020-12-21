import { Category } from "./category.types";

export type RecurringExpense = {
	_id: string;
	price: number;
	name: string;
	category: Category;
};
