import { Schema, model } from "mongoose";

import { ICategoryDocument, ICategoryModel } from "./category.model.types";

const categorySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{
		versionKey: process.env.NODE_ENV === "test" && false,
	}
);

const Category = model<ICategoryDocument, ICategoryModel>(
	"Category",
	categorySchema
);

export default Category;
