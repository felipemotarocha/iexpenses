import { Schema, model, Types } from "mongoose";

import { IIncomeDocument, IIncomeModel } from "./income.model.types";

const incomeSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		amount: {
			type: Number,
			required: true,
		},
		userId: {
			type: Types.ObjectId,
			required: true,
		},
	},
	{
		versionKey: process.env.NODE_ENV === "test" && false,
	}
);

const Income = model<IIncomeDocument, IIncomeModel>("Income", incomeSchema);

export default Income;
