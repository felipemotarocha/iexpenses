import { Model, Document } from "mongoose";
import { ICategoryDocument } from "../category/category.model.types";

export interface INonRecurringExpenseDocument extends Document {
	price: number;
	name: string;
	creationDate: Date;
	category: ICategoryDocument;
}

export interface INonRecurringExpenseModel
	extends Model<INonRecurringExpenseDocument> {}
