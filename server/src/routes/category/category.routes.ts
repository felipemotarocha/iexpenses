import { Router, Request, Response } from "express";

import Category from "../../models/category/category.model";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
	try {
		const categories = await Category.find({});

		res.status(200).send(categories);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.get("/:categoryId", async (req, res) => {
	try {
		const {
			params: { categoryId },
		} = req;

		const foundCategory = await Category.findById(categoryId);

		res.status(200).send(foundCategory);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.post("/", async (req: Request, res: Response) => {
	try {
		const createdCategory = new Category(req.body);

		await createdCategory.save();

		res.status(201).send(createdCategory);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.patch("/:categoryId", async (req, res) => {
	try {
		const {
			body,
			params: { categoryId },
		} = req;

		const validFieldsToUpdate = ["name"];
		const receivedFieldsToUpdate = Object.keys(body);

		const receivedFieldsToUpdateAreInvalid = !receivedFieldsToUpdate.every(
			(field) => validFieldsToUpdate.includes(field)
		);

		if (receivedFieldsToUpdateAreInvalid)
			throw new Error("The provided fields to update are invalid.");

		const categoryToUpdate = await Category.findById(categoryId);
		for (let field of receivedFieldsToUpdate) {
			(categoryToUpdate as any)[field] = body[field];
			await categoryToUpdate?.save();
		}

		res.status(200).send(categoryToUpdate);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.delete("/:categoryId", async (req: Request, res: Response) => {
	try {
		const {
			params: { categoryId },
		} = req;

		const deletedCategory = await Category.findByIdAndDelete(categoryId);

		res.status(200).send(deletedCategory);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

export default router;
