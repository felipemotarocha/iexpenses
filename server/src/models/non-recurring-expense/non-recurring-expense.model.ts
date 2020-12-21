import { Schema, model, Types } from "mongoose";
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
		creationDate: {
			type: Date,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
			autopopulate: true,
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

nonRecurringExpenseSchema.plugin(require("mongoose-autopopulate"));

const NonRecurringExpense = model<
	INonRecurringExpenseDocument,
	INonRecurringExpenseModel
>("NonRecurringExpense", nonRecurringExpenseSchema);

export default NonRecurringExpense;
