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

router.get("/:recurringExpenseId", async (req, res) => {
	try {
		const {
			params: { recurringExpenseId },
		} = req;

		const foundRecurringExpense = await RecurringExpense.findById(
			recurringExpenseId
		);

		res.status(200).send(foundRecurringExpense);
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

router.patch("/:recurringExpenseId", async (req, res) => {
	try {
		const {
			body,
			params: { recurringExpenseId },
		} = req;

		const validFieldsToUpdate = ["price", "name", "creationDate", "category"];
		const receivedFieldsToUpdate = Object.keys(body);

		const receivedFieldsToUpdateAreInvalid = !receivedFieldsToUpdate.every(
			(field) => validFieldsToUpdate.includes(field)
		);

		if (receivedFieldsToUpdateAreInvalid)
			throw new Error("The provided fields to update are invalid.");

		const categoryIsBeingUpdated = receivedFieldsToUpdate.includes("category");
		if (categoryIsBeingUpdated) {
			const categoryId = body["category"];

			const categoryIdIsNotValid = !Types.ObjectId.isValid(categoryId);
			if (categoryIdIsNotValid) {
				throw new Error("Please provide a valid category.");
			}

			const categoryDoesNotExist = !(await Category.findById(categoryId));
			if (categoryDoesNotExist) {
				throw new Error("Please provide a valid category.");
			}
		}

		const recurringExpenseToUpdate = await RecurringExpense.findById(
			recurringExpenseId
		);
		for (let field of receivedFieldsToUpdate) {
			(recurringExpenseToUpdate as any)[field] = body[field];
			await recurringExpenseToUpdate?.save();
		}

		res.status(200).send(recurringExpenseToUpdate);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.delete("/:recurringExpenseId", async (req: Request, res: Response) => {
	try {
		const {
			params: { recurringExpenseId },
		} = req;

		const deletedRecurringExpense = await RecurringExpense.findByIdAndDelete(
			recurringExpenseId
		);

		res.status(200).send(deletedRecurringExpense);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

export default router;
