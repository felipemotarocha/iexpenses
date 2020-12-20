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
