import Category from "../models/category/category.model";
import NonRecurringExpense from "../models/non-recurring-expense/non-recurring-expense.model";
import RecurringExpense from "../models/recurring-expense/recurring-expense.model";
import {
	MOCKED_CATEGORY,
	MOCKED_NON_RECURRING_EXPENSE,
	MOCKED_RECURRING_EXPENSE,
} from "../utils/test.utils";

const setupDatabase = async () => {
	await Category.deleteMany({});
	await RecurringExpense.deleteMany({});
	await NonRecurringExpense.deleteMany({});

	await new Category(MOCKED_CATEGORY).save();
	await new RecurringExpense(MOCKED_RECURRING_EXPENSE).save();
	await new NonRecurringExpense(MOCKED_NON_RECURRING_EXPENSE).save();
};

beforeEach(setupDatabase);
