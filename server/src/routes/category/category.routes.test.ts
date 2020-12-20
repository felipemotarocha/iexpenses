import faker from "faker";
import request from "supertest";
import app from "../../app";
import Category from "../../models/category/category.model";
import { Category as CategoryType } from "../../types/category.types";
import {
	MOCKED_CATEGORY,
	MOCKED_CATEGORY_ID_STRINGFIED,
	MOCKED_CATEGORY_WITH_ID_STRINGFIED,
} from "../../utils/test.utils";

describe("Category Related Requests", () => {
	describe("POST Requests", () => {
		it("should create a category", async () => {
			await Category.deleteMany({});

			await request(app)
				.post("/api/category")
				.send(MOCKED_CATEGORY)
				.expect(201);

			const createdCategory = await Category.findById(
				MOCKED_CATEGORY_ID_STRINGFIED
			);
			expect(createdCategory).toBeDefined();
		});
		it("should not create a category when an invalid field is provided", async () => {
			await Category.deleteMany({});

			await request(app)
				.post("/api/category")
				.send({ invalidField: faker.lorem.word(7) })
				.expect(500);
		});
		it("should not create a category when a required field is not provided", async () => {
			await Category.deleteMany({});

			await request(app).post("/api/category").send({}).expect(500);
		});
	});
	describe("GET Requests", () => {
		it("should get all the categories", async () => {
			const { body: category }: { body: CategoryType } = await request(app)
				.get("/api/category")
				.expect(200);

			expect(category).toContainEqual(MOCKED_CATEGORY_WITH_ID_STRINGFIED);
		});
		it("should get a category by id", async () => {
			const { body: foundCategory }: { body: CategoryType } = await request(app)
				.get(`/api/category/${MOCKED_CATEGORY_ID_STRINGFIED}`)
				.expect(200);

			expect(foundCategory).toStrictEqual(MOCKED_CATEGORY_WITH_ID_STRINGFIED);
		});
	});
	describe("PATCH Requests", () => {
		it("should update a category", async () => {
			const newName = faker.name.title();

			const { body: updatedCategory }: { body: CategoryType } = await request(
				app
			)
				.patch(`/api/category/${MOCKED_CATEGORY_ID_STRINGFIED}`)
				.send({ name: newName })
				.expect(200);

			const foundUpdatedCategory = await Category.findById(
				MOCKED_CATEGORY_ID_STRINGFIED
			);

			expect(foundUpdatedCategory!.name).toBe(newName);
			expect(updatedCategory.name).toBe(newName);
		});
		it("should not update a category when an invalid field is provided", async () => {
			await request(app)
				.patch(`/api/category/${MOCKED_CATEGORY_ID_STRINGFIED}`)
				.send({ invalidField: faker.lorem.word(7) })
				.expect(500);
		});
	});
	describe("DELETE Requests", () => {
		it("should delete a category", async () => {
			const { body: deletedCategory }: { body: CategoryType } = await request(
				app
			)
				.delete(`/api/category/${MOCKED_CATEGORY_ID_STRINGFIED}`)
				.expect(200);

			expect(deletedCategory._id).toStrictEqual(MOCKED_CATEGORY_ID_STRINGFIED);
			expect(deletedCategory.name).toBe(MOCKED_CATEGORY.name);
			expect(await Category.findById(MOCKED_CATEGORY_ID_STRINGFIED)).toBeNull();
		});
	});
});
