import { Model, Document } from "mongoose";

export interface IIncomeDocument extends Document {
	name: string;
	amount: number;
	userId: string;
}

export interface IIncomeModel extends Model<IIncomeDocument> {}
