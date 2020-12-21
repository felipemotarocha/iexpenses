import request from "supertest";
import faker from "faker";

import app from "../../app";
import {
	MOCKED_CATEGORY,
	MOCKED_CATEGORY_ID_STRINGFIED,
	MOCKED_NON_RECURRING_EXPENSE,
	MOCKED_NON_RECURRING_EXPENSE_ID_STRINGFIED,
} from "../../utils/test.utils";
import { NonRecurringExpense as NonRecurringExpenseType } from "../../types/non-recurring-expense.types";
import NonRecurringExpense from "../../models/non-recurring-expense/non-recurring-expense.model";

describe("Non-Recurring Expense Related Requests", () => {
	describe("POST Requests", () => {
		it("should create a non recurring expense", async () => {
			await NonRecurringExpense.deleteMany({});

			await request(app)
				.post("/api/non-recurring-expense")
				.send(MOCKED_NON_RECURRING_EXPENSE)
				.expect(201);

			const createdNonRecurringExpense = await NonRecurringExpense.findById(
				MOCKED_NON_RECURRING_EXPENSE_ID_STRINGFIED
			);
			expect(createdNonRecurringExpense).toBeDefined();
		});
		it("should not create a non recurring expense when an invalid field is provided", async () => {
			await NonRecurringExpense.deleteMany({});

			await request(app)
				.post("/api/non-recurring-expense")
				.send({ invalidField: faker.lorem.word(7) })
				.expect(500);
		});
		it("should not create a non recurring expense when a required field is not provided", async () => {
			await NonRecurringExpense.deleteMany({});

			await request(app)
				.post("/api/non-recurring-expense")
				.send({})
				.expect(500);
		});
		describe("GET Requests", () => {
			it("should get all the non recurring expenses", async () => {
				const {
					body: nonRecurringExpenses,
				}: { body: NonRecurringExpenseType[] } = await request(app)
					.get("/api/non-recurring-expense")
					.expect(200);

				expect(nonRecurringExpenses[0]._id).toStrictEqual(
					MOCKED_NON_RECURRING_EXPENSE_ID_STRINGFIED
				);
			});
			it("should get a non recurring expense by id", async () => {
				const {
					body: foundRecurringExpense,
				}: { body: NonRecurringExpenseType } = await request(app)
					.get(
						`/api/non-recurring-expense/${MOCKED_NON_RECURRING_EXPENSE_ID_STRINGFIED}`
					)
					.expect(200);

				expect(foundRecurringExpense._id).toStrictEqual(
					MOCKED_NON_RECURRING_EXPENSE_ID_STRINGFIED
				);
				expect(foundRecurringExpense.name).toStrictEqual(
					MOCKED_NON_RECURRING_EXPENSE.name
				);
				expect(foundRecurringExpense.price).toStrictEqual(
					MOCKED_NON_RECURRING_EXPENSE.price
				);
				expect(foundRecurringExpense.category._id).toStrictEqual(
					MOCKED_CATEGORY_ID_STRINGFIED
				);
				expect(foundRecurringExpense.category.name).toStrictEqual(
					MOCKED_CATEGORY.name
				);
			});
		});
		describe("PATCH Requests", () => {
			it("should update a non recurring expense", async () => {
				const newName = faker.lorem.word(7);

				const {
					body: updatedNonRecurringExpense,
				}: { body: NonRecurringExpenseType } = await request(app)
					.patch(
						`/api/non-recurring-expense/${MOCKED_NON_RECURRING_EXPENSE_ID_STRINGFIED}`
					)
					.send({ name: newName, category: MOCKED_CATEGORY_ID_STRINGFIED })
					.expect(200);

				const foundUpdatedNonRecurringExpense = await NonRecurringExpense.findById(
					MOCKED_NON_RECURRING_EXPENSE_ID_STRINGFIED
				);

				expect(foundUpdatedNonRecurringExpense!.name).toBe(newName);
				expect(updatedNonRecurringExpense.name).toBe(newName);
			});
			it("should not update a non recurring expense when an invalid category is provided", async () => {
				await request(app)
					.patch(
						`/api/recurring-expense/${MOCKED_NON_RECURRING_EXPENSE_ID_STRINGFIED}`
					)
					.send({ category: faker.random.uuid() })
					.expect(500);
			});

			it("should not update a non recurring expense when an invalid field is provided", async () => {
				await request(app)
					.patch(
						`/api/non-recurring-expense/${MOCKED_NON_RECURRING_EXPENSE_ID_STRINGFIED}`
					)
					.send({ invalidField: faker.lorem.word(7) })
					.expect(500);
			});
		});
		describe("DELETE Requests", () => {
			it("should delete a non recurring expense", async () => {
				const {
					body: nonRecurringExpense,
				}: { body: NonRecurringExpenseType } = await request(app)
					.delete(
						`/api/non-recurring-expense/${MOCKED_NON_RECURRING_EXPENSE_ID_STRINGFIED}`
					)
					.expect(200);

				expect(nonRecurringExpense._id).toStrictEqual(
					MOCKED_NON_RECURRING_EXPENSE_ID_STRINGFIED
				);
				expect(nonRecurringExpense.name).toStrictEqual(
					MOCKED_NON_RECURRING_EXPENSE.name
				);
				expect(nonRecurringExpense.price).toStrictEqual(
					MOCKED_NON_RECURRING_EXPENSE.price
				);
				expect(nonRecurringExpense.category).toStrictEqual(
					MOCKED_CATEGORY_ID_STRINGFIED
				);
				expect(
					await NonRecurringExpense.findById(
						MOCKED_NON_RECURRING_EXPENSE_ID_STRINGFIED
					)
				).toBeNull();
			});
		});
	});
});
