import { Schema, model } from "mongoose";
import {
	INonRecurringExpenseDocument,
	INonRecurringExpenseModel,
} from "./non-recurring-expense.model.types";

const nonRecurringExpenseSchema = new Schema(
	{
		price: {
			type: Number,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
	},
	{
		versionKey: process.env.NODE_ENV === "test" && false,
	}
);

nonRecurringExpenseSchema.plugin(require("mongoose-autopopulate"));

const NonRecurringExpense = model<
	INonRecurringExpenseDocument,
	INonRecurringExpenseModel
>("NonRecurringExpense", nonRecurringExpenseSchema);

export default NonRecurringExpense;
