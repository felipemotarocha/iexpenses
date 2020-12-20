import { Router, Request, Response } from "express";

import Category from "../../models/category/category.model";

const router = Router();

router.get("/", async (_req: Request, res: Response) => {
	try {
		const category = await Category.find({});

		res.status(200).send(category);
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

export default router;
