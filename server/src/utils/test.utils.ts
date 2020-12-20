import { Types } from "mongoose";
import faker from "faker";

export const MOCKED_CATEGORY_ID = new Types.ObjectId();
export const MOCKED_CATEGORY = {
	_id: MOCKED_CATEGORY_ID,
	name: faker.name.title(),
};

export const MOCKED_CATEGORY_ID_STRINGFIED = MOCKED_CATEGORY_ID.toString();
export const MOCKED_CATEGORY_WITH_ID_STRINGFIED = {
	...MOCKED_CATEGORY,
	_id: MOCKED_CATEGORY_ID_STRINGFIED,
};

export const MOCKED_RECURRING_EXPENSE_ID = new Types.ObjectId();
export const MOCKED_RECURRING_EXPENSE = {
	_id: MOCKED_RECURRING_EXPENSE_ID,
	price: faker.random.number(),
	name: faker.name.title(),
	creationDate: faker.date.recent(),
	category: MOCKED_CATEGORY_ID,
};

export const MOCKED_RECURRING_EXPENSE_ID_STRINGFIED = MOCKED_RECURRING_EXPENSE_ID.toString();
export const MOCKED_RECURRING_EXPENSE_WITH_ID_STRINGFIED = {
	...MOCKED_RECURRING_EXPENSE,
	_id: MOCKED_RECURRING_EXPENSE_ID_STRINGFIED,
	price: faker.random.number(),
	name: faker.name.title(),
	creationDate: faker.date.recent(),
	category: MOCKED_CATEGORY_ID_STRINGFIED,
};
