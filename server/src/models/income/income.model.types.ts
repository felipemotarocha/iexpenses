import { Model, Document } from "mongoose";

export interface IIncomeDocument extends Document {
	name: string;
	amount: number;
}

export interface IIncomeModel extends Model<IIncomeDocument> {}
