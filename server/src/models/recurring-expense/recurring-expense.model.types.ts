import { Model, Document } from "mongoose";
import { Category } from "../../types/category.types";

export interface IRecurringExpenseDocument extends Document {
	_id: string;
	price: number;
	name: string;
	category: Category;
}

export interface IRecurringExpenseModel
	extends Model<IRecurringExpenseDocument> {}
