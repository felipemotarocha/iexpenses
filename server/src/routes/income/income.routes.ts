import { Router, Request, Response } from "express";

import Income from "../../models/income/income.model";
import { checkIfUserIsValid } from "../../utils/routes.utils";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
	try {
		const incomes = await Income.find({});

		res.status(200).send(incomes);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.get("/:incomeId", async (req, res) => {
	try {
		const {
			params: { incomeId },
		} = req;

		const foundIncome = await Income.findById(incomeId);

		res.status(200).send(foundIncome);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.post("/", async (req: Request, res: Response) => {
	try {
		const {
			body: { userId },
		} = req;

		const { error: userError } = await checkIfUserIsValid(userId);
		if (userError) throw new Error(userError);

		const createdIncome = new Income(req.body);

		await createdIncome.save();

		res.status(201).send(createdIncome);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.patch("/:incomeId", async (req, res) => {
	try {
		const {
			body,
			params: { incomeId },
		} = req;

		const validFieldsToUpdate = ["name", "amount"];
		const receivedFieldsToUpdate = Object.keys(body);

		const receivedFieldsToUpdateAreInvalid = !receivedFieldsToUpdate.every(
			(field) => validFieldsToUpdate.includes(field)
		);

		if (receivedFieldsToUpdateAreInvalid)
			throw new Error("The provided fields to update are invalid.");

		const incomeToUpdate = await Income.findById(incomeId);
		for (let field of receivedFieldsToUpdate) {
			(incomeToUpdate as any)[field] = body[field];
			await incomeToUpdate?.save();
		}

		res.status(200).send(incomeToUpdate);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.delete("/:incomeId", async (req: Request, res: Response) => {
	try {
		const {
			params: { incomeId },
		} = req;

		const deletedIncome = await Income.findByIdAndDelete(incomeId);

		res.status(200).send(deletedIncome);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

export default router;
