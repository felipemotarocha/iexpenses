import { Model, Document } from "mongoose";
import { ICategoryDocument } from "../category/category.model.types";

export interface IRecurringExpenseDocument extends Document {
	price: number;
	name: string;
	creationDate: string;
	category: ICategoryDocument;
}

export interface IRecurringExpenseModel
	extends Model<IRecurringExpenseDocument> {}
