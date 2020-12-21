import faker from "faker";
import request from "supertest";
import app from "../../app";
import Income from "../../models/income/income.model";
import { Income as IncomeType } from "../../types/income.types";
import {
	MOCKED_INCOME,
	MOCKED_INCOME_ID_STRINGFIED,
	MOCKED_INCOME_WITH_ID_STRINGFIED,
} from "../../utils/test.utils";

describe("Income Related Requests", () => {
	describe("POST Requests", () => {
		it("should create an income", async () => {
			await Income.deleteMany({});

			await request(app).post("/api/income").send(MOCKED_INCOME).expect(201);

			const createdIncome = await Income.findById(MOCKED_INCOME_ID_STRINGFIED);

			expect(createdIncome).toBeDefined();
			expect(createdIncome?.name).toStrictEqual(MOCKED_INCOME.name);
			expect(createdIncome?.amount).toStrictEqual(MOCKED_INCOME.amount);
			expect(createdIncome?.userId).toStrictEqual(MOCKED_INCOME.userId);
		});
		it("should not create an income when an invalid field is provided", async () => {
			await Income.deleteMany({});

			await request(app)
				.post("/api/income")
				.send({ invalidField: faker.lorem.word(7) })
				.expect(500);
		});
		it("should not create an income when a required field is not provided", async () => {
			await Income.deleteMany({});

			await request(app).post("/api/income").send({}).expect(500);
		});
	});
	describe("GET Requests", () => {
		it("should get all the incomes", async () => {
			const { body: income }: { body: IncomeType } = await request(app)
				.get("/api/income")
				.expect(200);

			expect(income).toContainEqual(MOCKED_INCOME_WITH_ID_STRINGFIED);
		});
		it("should get an income by id", async () => {
			const { body: foundIncome }: { body: IncomeType } = await request(app)
				.get(`/api/income/${MOCKED_INCOME_ID_STRINGFIED}`)
				.expect(200);

			expect(foundIncome).toStrictEqual(MOCKED_INCOME_WITH_ID_STRINGFIED);
		});
	});
	describe("PATCH Requests", () => {
		it("should update an income", async () => {
			const newName = faker.name.title();

			const { body: updatedIncome }: { body: IncomeType } = await request(app)
				.patch(`/api/income/${MOCKED_INCOME_ID_STRINGFIED}`)
				.send({ name: newName })
				.expect(200);

			const foundUpdatedIncome = await Income.findById(
				MOCKED_INCOME_ID_STRINGFIED
			);

			expect(foundUpdatedIncome!.name).toBe(newName);
			expect(updatedIncome.name).toBe(newName);
		});
		it("should not update an income when an invalid field is provided", async () => {
			await request(app)
				.patch(`/api/income/${MOCKED_INCOME_ID_STRINGFIED}`)
				.send({ invalidField: faker.lorem.word(7) })
				.expect(500);
		});
	});
	describe("DELETE Requests", () => {
		it("should delete an income", async () => {
			const { body: deletedIncome }: { body: IncomeType } = await request(app)
				.delete(`/api/income/${MOCKED_INCOME_ID_STRINGFIED}`)
				.expect(200);

			expect(deletedIncome._id).toStrictEqual(MOCKED_INCOME_ID_STRINGFIED);
			expect(deletedIncome.name).toBe(MOCKED_INCOME.name);
			expect(await Income.findById(MOCKED_INCOME_ID_STRINGFIED)).toBeNull();
		});
	});
});
