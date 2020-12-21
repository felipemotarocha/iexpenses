import { Category } from "./category.types";

export type NonRecurringExpense = {
	_id: string;
	price: number;
	name: string;
	creationDate: Date;
	category: Category;
};
