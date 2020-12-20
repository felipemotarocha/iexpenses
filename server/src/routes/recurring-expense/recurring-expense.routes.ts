import { Router, Request, Response } from "express";
import { Types } from "mongoose";
import Category from "../../models/category/category.model";

import RecurringExpense from "../../models/recurring-expense/recurring-expense.model";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
	try {
		const recurringExpenses = await RecurringExpense.find({});
		res.status(200).send(recurringExpenses);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.post("/", async (req: Request, res: Response) => {
	try {
		const {
			body: { category },
		} = req;

		const categoryIsNotValid =
			!Types.ObjectId.isValid(category) || !(await Category.findById(category));
		if (categoryIsNotValid) throw new Error("Please provide a valid category.");

		const createdRecurringExpense = new RecurringExpense(req.body);
		await createdRecurringExpense.save();

		res.status(201).send(createdRecurringExpense);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

export default router;
