import { Types } from "mongoose";
import faker from "faker";

export const MOCKED_USER_ID = new Types.ObjectId();
export const MOCKED_USER = {
	_id: MOCKED_USER_ID,
	name: faker.name.firstName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
};

export const MOCKED_USER_ID_STRINGFIED = MOCKED_USER_ID.toString();
export const MOCKED_USER_WITH_ID_STRINGFIED = {
	...MOCKED_USER,
	_id: MOCKED_USER_ID_STRINGFIED,
	name: faker.name.firstName(),
	email: faker.internet.email(),
	password: faker.internet.password(),
};

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
	category: MOCKED_CATEGORY_ID,
	userId: MOCKED_USER_ID,
};

export const MOCKED_RECURRING_EXPENSE_ID_STRINGFIED = MOCKED_RECURRING_EXPENSE_ID.toString();
export const MOCKED_RECURRING_EXPENSE_WITH_ID_STRINGFIED = {
	...MOCKED_RECURRING_EXPENSE,
	_id: MOCKED_RECURRING_EXPENSE_ID_STRINGFIED,
	category: MOCKED_CATEGORY_ID_STRINGFIED,
	userId: MOCKED_USER_ID_STRINGFIED,
};

export const MOCKED_NON_RECURRING_EXPENSE_ID = new Types.ObjectId();
export const MOCKED_NON_RECURRING_EXPENSE = {
	_id: MOCKED_NON_RECURRING_EXPENSE_ID,
	price: faker.random.number(),
	name: faker.name.title(),
	creationDate: faker.date.recent(),
	category: MOCKED_CATEGORY_ID,
	userId: MOCKED_USER_ID,
};

export const MOCKED_NON_RECURRING_EXPENSE_ID_STRINGFIED = MOCKED_NON_RECURRING_EXPENSE_ID.toString();
export const MOCKED_NON_RECURRING_EXPENSE_WITH_ID_STRINGFIED = {
	...MOCKED_NON_RECURRING_EXPENSE,
	_id: MOCKED_NON_RECURRING_EXPENSE_ID_STRINGFIED,
	category: MOCKED_CATEGORY_ID_STRINGFIED,
	userId: MOCKED_USER_ID_STRINGFIED,
};

export const MOCKED_INCOME_ID = new Types.ObjectId();
export const MOCKED_INCOME = {
	_id: MOCKED_INCOME_ID,
	name: faker.name.title(),
	amount: faker.random.number(),
	userId: MOCKED_USER_ID,
};

export const MOCKED_INCOME_ID_STRINGFIED = MOCKED_INCOME_ID.toString();
export const MOCKED_INCOME_WITH_ID_STRINGFIED = {
	...MOCKED_INCOME,
	_id: MOCKED_INCOME_ID_STRINGFIED,
	userId: MOCKED_USER_ID_STRINGFIED,
};
