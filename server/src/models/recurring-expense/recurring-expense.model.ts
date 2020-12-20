import { Schema, model } from "mongoose";

import {
	IRecurringExpenseDocument,
	IRecurringExpenseModel,
} from "./recurring-expense.model.types";

const recurringExpenseSchema = new Schema({
	price: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	creationDate: {
		type: String,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: "Category",
		autopopulate: true,
	},
});

recurringExpenseSchema.plugin(require("mongoose-autopopulate"));

const RecurringExpense = model<
	IRecurringExpenseDocument,
	IRecurringExpenseModel
>("RecurringExpense", recurringExpenseSchema);

export default RecurringExpense;
