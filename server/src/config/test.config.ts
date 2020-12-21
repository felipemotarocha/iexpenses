import Category from "../models/category/category.model";
import Income from "../models/income/income.model";
import NonRecurringExpense from "../models/non-recurring-expense/non-recurring-expense.model";
import RecurringExpense from "../models/recurring-expense/recurring-expense.model";
import User from "../models/user/user.model";
import {
	MOCKED_CATEGORY,
	MOCKED_INCOME,
	MOCKED_NON_RECURRING_EXPENSE,
	MOCKED_RECURRING_EXPENSE,
	MOCKED_USER,
} from "../utils/test.utils";

const setupDatabase = async () => {
	await User.deleteMany({});
	await Category.deleteMany({});
	await RecurringExpense.deleteMany({});
	await NonRecurringExpense.deleteMany({});
	await Income.deleteMany({});

	await new User(MOCKED_USER).save();
	await new Category(MOCKED_CATEGORY).save();
	await new RecurringExpense(MOCKED_RECURRING_EXPENSE).save();
	await new NonRecurringExpense(MOCKED_NON_RECURRING_EXPENSE).save();
	await new Income(MOCKED_INCOME).save();
};

beforeEach(setupDatabase);
