import { Model, Document } from "mongoose";

export interface IRecurringExpenseDocument extends Document {
	price: number;
	name: string;
	creationDate: string;
	type: "recurring";
}

export interface IRecurringExpenseModel
	extends Model<IRecurringExpenseDocument> {}
