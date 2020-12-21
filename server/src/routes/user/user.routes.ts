import { Router, Request, Response } from "express";

import User from "../../models/user/user.model";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
	try {
		const {
			query: { withExpensesAndIncomes },
		} = req;

		if (withExpensesAndIncomes === "true") {
			const usersWithExpensesAndIncomes = await User.findAllAndPopulateExpensesAndIncomes();
			return res.status(200).send(usersWithExpensesAndIncomes);
		}

		const users = await User.find({});
		return res.status(200).send(users);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.get("/:userId", async (req, res) => {
	try {
		const {
			params: { userId },
			query: { withExpensesAndIncomes },
		} = req;

		if (withExpensesAndIncomes === "true") {
			const foundUserWithExpensesAndIncomes = await User.findByIdAndPopulateExpensesAndIncomes(
				userId
			);
			return res.status(200).send(foundUserWithExpensesAndIncomes);
		}

		const foundUser = await User.findById(userId);
		return res.status(200).send(foundUser);
	} catch (err) {
		return res.status(500).send(err.message);
	}
});

router.post("/", async (req: Request, res: Response) => {
	try {
		const createdUser = new User(req.body);

		await createdUser.save();

		res.status(201).send(createdUser);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.post("/login", async (req: Request, res: Response) => {
	try {
		const {
			body: { email, password },
		} = req;

		const user = await User.loginWithEmailAndPassword(email, password);

		res.status(200).send(user);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.patch("/:userId", async (req, res) => {
	try {
		const {
			body,
			params: { userId },
		} = req;

		const validFieldsToUpdate = ["name", "email", "password"];
		const receivedFieldsToUpdate = Object.keys(body);

		const receivedFieldsToUpdateAreInvalid = !receivedFieldsToUpdate.every(
			(field) => validFieldsToUpdate.includes(field)
		);

		if (receivedFieldsToUpdateAreInvalid)
			throw new Error("The provided fields to update are invalid.");

		const userToUpdate = await User.findById(userId);
		for (let field of receivedFieldsToUpdate) {
			(userToUpdate as any)[field] = body[field];
			await userToUpdate?.save();
		}

		res.status(200).send(userToUpdate);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.delete("/:userId", async (req: Request, res: Response) => {
	try {
		const {
			params: { userId },
		} = req;

		const deletedUser = await User.findByIdAndDelete(userId);

		res.status(200).send(deletedUser);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

export default router;
