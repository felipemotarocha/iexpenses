import { Router, Request, Response } from "express";

import NonRecurringExpense from "../../models/non-recurring-expense/non-recurring-expense.model";
import {
	checkIfCategoryIsValid,
	checkIfUserIsValid,
} from "../../utils/routes.utils";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
	try {
		const nonRecurringExpenses = await NonRecurringExpense.find({});
		res.status(200).send(nonRecurringExpenses);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.get("/:nonRecurringExpenseId", async (req, res) => {
	try {
		const {
			params: { nonRecurringExpenseId },
		} = req;

		const foundNonRecurringExpense = await NonRecurringExpense.findById(
			nonRecurringExpenseId
		);

		res.status(200).send(foundNonRecurringExpense);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.post("/", async (req: Request, res: Response) => {
	try {
		const {
			body: { category, userId },
		} = req;

		const { error: categoryError } = await checkIfCategoryIsValid(category);
		if (categoryError) throw new Error(categoryError);

		const { error: userError } = await checkIfUserIsValid(userId);
		if (userError) throw new Error(userError);

		const createdNonRecurringExpense = new NonRecurringExpense(req.body);
		await createdNonRecurringExpense.save();

		res.status(201).send(createdNonRecurringExpense);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.patch("/:nonRecurringExpenseId", async (req, res) => {
	try {
		const {
			body,
			params: { nonRecurringExpenseId },
		} = req;

		const validFieldsToUpdate = ["name", "price", "creationDate", "category"];
		const receivedFieldsToUpdate = Object.keys(body);

		const receivedFieldsToUpdateAreInvalid = !receivedFieldsToUpdate.every(
			(field) => validFieldsToUpdate.includes(field)
		);

		if (receivedFieldsToUpdateAreInvalid)
			throw new Error("The provided fields to update are invalid.");

		const categoryIsBeingUpdated = receivedFieldsToUpdate.includes("category");
		if (categoryIsBeingUpdated) {
			const categoryId = body["category"];
			const { error: categoryError } = await checkIfCategoryIsValid(categoryId);
			if (categoryError) throw new Error(categoryError);
		}

		const nonRecurringExpenseToUpdate = await NonRecurringExpense.findById(
			nonRecurringExpenseId
		);
		for (let field of receivedFieldsToUpdate) {
			(nonRecurringExpenseToUpdate as any)[field] = body[field];
			await nonRecurringExpenseToUpdate?.save();
		}

		res.status(200).send(nonRecurringExpenseToUpdate);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.delete(
	"/:nonRecurringExpenseId",
	async (req: Request, res: Response) => {
		try {
			const {
				params: { nonRecurringExpenseId },
			} = req;

			const deletedNonRecurringExpense = await NonRecurringExpense.findByIdAndDelete(
				nonRecurringExpenseId
			);

			res.status(200).send(deletedNonRecurringExpense);
		} catch (err) {
			res.status(500).send(err.message);
		}
	}
);

export default router;
