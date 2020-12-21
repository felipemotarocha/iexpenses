import { Schema, model, Model } from "mongoose";

import { IUserDocument, IUserModel } from "./user.model.types";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: { virtuals: true },
		id: false,
		versionKey: process.env.NODE_ENV === "test" && false,
	}
);

userSchema.virtual("recurringExpenses", {
	ref: "RecurringExpense",
	localField: "_id",
	foreignField: "userId",
});

userSchema.virtual("nonRecurringExpenses", {
	ref: "NonRecurringExpense",
	localField: "_id",
	foreignField: "userId",
});

userSchema.virtual("incomes", {
	ref: "Income",
	localField: "_id",
	foreignField: "userId",
});

userSchema.static(
	"findAllAndPopulateExpensesAndIncomes",
	function (this: Model<IUserDocument>) {
		return this.find({})
			.populate("recurringExpenses")
			.populate("nonRecurringExpenses")
			.populate("incomes")
			.exec();
	}
);

userSchema.static(
	"findByIdAndPopulateExpensesAndIncomes",
	function (this: Model<IUserDocument>, id: string) {
		return this.findById(id)
			.populate("recurringExpenses")
			.populate("nonRecurringExpenses")
			.populate("incomes")
			.exec();
	}
);

const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
