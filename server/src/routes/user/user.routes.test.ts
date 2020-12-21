import request from "supertest";

import app from "../../app";
import User from "../../models/user/user.model";
import { User as UserType } from "../../types/user.types";
import { MOCKED_USER, MOCKED_USER_ID_STRINGFIED } from "../../utils/test.utils";
import faker from "faker";

describe("User Related Requests", () => {
	describe("POST Requests", () => {
		it("should create an user", async () => {
			await User.deleteMany({});

			const { body: createdUser }: { body: UserType } = await request(app)
				.post("/api/user")
				.send(MOCKED_USER)
				.expect(201);

			expect(createdUser._id).toStrictEqual(MOCKED_USER_ID_STRINGFIED);
			expect(createdUser.name).toStrictEqual(MOCKED_USER.name);
			expect(createdUser.email).toStrictEqual(MOCKED_USER.email);
		});
		it("should not create an user when a required field is provided", async () => {
			await User.deleteMany({});

			await request(app)
				.post("/api/user")
				.send({ ...MOCKED_USER, name: null })
				.expect(500);
		});
		it("should login an user with email and password", async () => {
			const { body: loggedUser }: { body: UserType } = await request(app)
				.post("/api/user/login")
				.send({ email: MOCKED_USER.email, password: MOCKED_USER.password })
				.expect(200);

			expect(loggedUser._id).toStrictEqual(MOCKED_USER_ID_STRINGFIED);
			expect(loggedUser.name).toStrictEqual(MOCKED_USER.name);
			expect(loggedUser.email).toStrictEqual(MOCKED_USER.email);
		});
		it("should not login an user with email and password when an invalid password is provided", async () => {
			await request(app)
				.post("/api/user/login")
				.send({ email: MOCKED_USER.email, password: faker.internet.password() })
				.expect(500);
		});
		it("should not login an user with email and password when an invalid email is provided", async () => {
			await request(app)
				.post("/api/user/login")
				.send({ email: faker.internet.email(), password: MOCKED_USER.password })
				.expect(500);
		});
	});
	describe("GET Requests", () => {
		it("should get all the users", async () => {
			await User.find({}).populate("recurringExpenses").exec();
			const { body: users }: { body: UserType[] } = await request(app)
				.get("/api/user")
				.expect(200);

			expect(users[0]._id).toStrictEqual(MOCKED_USER_ID_STRINGFIED);
		});
		it("should get an user by id", async () => {
			await User.find({}).populate("recurringExpenses").exec();
			const { body: user }: { body: UserType } = await request(app)
				.get(`/api/user/${MOCKED_USER_ID_STRINGFIED}`)
				.expect(200);

			expect(user._id).toStrictEqual(MOCKED_USER_ID_STRINGFIED);
			expect(user.name).toStrictEqual(MOCKED_USER.name);
			expect(user.email).toStrictEqual(MOCKED_USER.email);
		});
	});
	describe("PATCH Requests", () => {
		it("should update an user", async () => {
			const newName = faker.name.firstName();
			const { body: updatedUser }: { body: UserType } = await request(app)
				.patch(`/api/user/${MOCKED_USER_ID_STRINGFIED}`)
				.send({ name: newName })
				.expect(200);

			expect(updatedUser._id).toStrictEqual(MOCKED_USER_ID_STRINGFIED);
			expect(updatedUser.name).toStrictEqual(newName);
		});
		it("should not update an user when an invalid field is provided", async () => {
			await request(app)
				.patch(`/api/user/${MOCKED_USER_ID_STRINGFIED}`)
				.send({ invalidField: faker.lorem.word(7) })
				.expect(500);
		});
	});
	describe("DELETE Requests", () => {
		it("should delete an user", async () => {
			const { body: deletedUser }: { body: UserType } = await request(app)
				.delete(`/api/user/${MOCKED_USER_ID_STRINGFIED}`)
				.expect(200);

			expect(deletedUser._id).toStrictEqual(MOCKED_USER_ID_STRINGFIED);
			expect(deletedUser.name).toStrictEqual(MOCKED_USER.name);
			expect(deletedUser.email).toStrictEqual(MOCKED_USER.email);
		});
	});
});
