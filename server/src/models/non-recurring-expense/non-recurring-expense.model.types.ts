import { Model, Document } from "mongoose";

export interface INonRecurringExpenseDocument extends Document {
	price: number;
	name: string;
}

export interface INonRecurringExpenseModel
	extends Model<INonRecurringExpenseDocument> {}
