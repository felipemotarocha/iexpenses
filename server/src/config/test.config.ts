import Category from "../models/category/category.model";
import { MOCKED_CATEGORY } from "../utils/test.utils";

const setupDatabase = async () => {
	await Category.deleteMany({});

	await new Category(MOCKED_CATEGORY).save();
};

beforeEach(setupDatabase);
