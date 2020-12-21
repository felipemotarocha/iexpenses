import request from "supertest";
import faker from "faker";

import app from "../../app";
import RecurringExpense from "../../models/recurring-expense/recurring-expense.model";
import {
	MOCKED_RECURRING_EXPENSE,
	MOCKED_RECURRING_EXPENSE_ID_STRINGFIED,
} from "../../utils/test.utils";
import { RecurringExpense as RecurringExpenseType } from "../../types/recurring-expense.types";

describe("Recurring Expense Related Requests", () => {
	describe("POST Requests", () => {
		it("should create a recurring expense", async () => {
			await RecurringExpense.deleteMany({});

			await request(app)
				.post("/api/recurring-expense")
				.send(MOCKED_RECURRING_EXPENSE)
				.expect(201);

			const createdRecurringExpense = await RecurringExpense.findById(
				MOCKED_RECURRING_EXPENSE_ID_STRINGFIED
			);
			expect(createdRecurringExpense).toBeDefined();
		});
		it("should not create a recurring expense when an invalid field is provided", async () => {
			await RecurringExpense.deleteMany({});

			await request(app)
				.post("/api/recurring-expense")
				.send({ invalidField: faker.lorem.word(7) })
				.expect(500);
		});
		it("should not create a recurring expense when a required field is not provided", async () => {
			await RecurringExpense.deleteMany({});

			await request(app).post("/api/recurring-expense").send({}).expect(500);
		});
		describe("GET Requests", () => {
			it("should get all the recurring expenses", async () => {
				const {
					body: recurringExpenses,
				}: { body: RecurringExpenseType[] } = await request(app)
					.get("/api/recurring-expense")
					.expect(200);

				expect(recurringExpenses[0]._id).toStrictEqual(
					MOCKED_RECURRING_EXPENSE_ID_STRINGFIED
				);
			});
			it("should get a recurring expense by id", async () => {
				const {
					body: foundRecurringExpense,
				}: { body: RecurringExpenseType } = await request(app)
					.get(
						`/api/recurring-expense/${MOCKED_RECURRING_EXPENSE_ID_STRINGFIED}`
					)
					.expect(200);

				expect(foundRecurringExpense._id).toStrictEqual(
					MOCKED_RECURRING_EXPENSE_ID_STRINGFIED
				);
				expect(foundRecurringExpense.name).toStrictEqual(
					MOCKED_RECURRING_EXPENSE.name
				);
				expect(foundRecurringExpense.price).toStrictEqual(
					MOCKED_RECURRING_EXPENSE.price
				);
			});
		});
		describe("PATCH Requests", () => {
			it("should update a recurring expense", async () => {
				const newName = faker.lorem.word(7);

				const {
					body: updatedRecurringExpense,
				}: { body: RecurringExpenseType } = await request(app)
					.patch(
						`/api/recurring-expense/${MOCKED_RECURRING_EXPENSE_ID_STRINGFIED}`
					)
					.send({ name: newName })
					.expect(200);

				const foundUpdatedRecurringExpense = await RecurringExpense.findById(
					MOCKED_RECURRING_EXPENSE_ID_STRINGFIED
				);

				expect(foundUpdatedRecurringExpense!.name).toBe(newName);
				expect(updatedRecurringExpense.name).toBe(newName);
			});

			it("should not update a recurring expense when an invalid field is provided", async () => {
				await request(app)
					.patch(
						`/api/recurring-expense/${MOCKED_RECURRING_EXPENSE_ID_STRINGFIED}`
					)
					.send({ invalidField: faker.lorem.word(7) })
					.expect(500);
			});
		});
		describe("DELETE Requests", () => {
			it("should delete a recurring expense", async () => {
				const {
					body: recurringExpense,
				}: { body: RecurringExpenseType } = await request(app)
					.delete(
						`/api/recurring-expense/${MOCKED_RECURRING_EXPENSE_ID_STRINGFIED}`
					)
					.expect(200);

				expect(recurringExpense._id).toStrictEqual(
					MOCKED_RECURRING_EXPENSE_ID_STRINGFIED
				);
				expect(recurringExpense.name).toStrictEqual(
					MOCKED_RECURRING_EXPENSE.name
				);
				expect(recurringExpense.price).toStrictEqual(
					MOCKED_RECURRING_EXPENSE.price
				);

				expect(
					await RecurringExpense.findById(
						MOCKED_RECURRING_EXPENSE_ID_STRINGFIED
					)
				).toBeNull();
			});
		});
	});
});
