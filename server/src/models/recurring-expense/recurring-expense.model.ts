import { Schema, model } from "mongoose";

import {
	IRecurringExpenseDocument,
	IRecurringExpenseModel,
} from "./recurring-expense.model.types";

const recurringExpenseSchema = new Schema(
	{
		price: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		creationDate: {
			type: Date,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
			autopopulate: true,
			required: true,
		},
	},
	{
		versionKey: process.env.NODE_ENV === "test" && false,
	}
);

recurringExpenseSchema.plugin(require("mongoose-autopopulate"));

const RecurringExpense = model<
	IRecurringExpenseDocument,
	IRecurringExpenseModel
>("RecurringExpense", recurringExpenseSchema);

export default RecurringExpense;
