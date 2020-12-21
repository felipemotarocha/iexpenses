import request from "supertest";
import app from "../../app";
import User from "../../models/user/user.model";

describe("User Related Requests", () => {
	describe("GET Requests", () => {
		it("should get all the users", async () => {
			await User.find({}).populate("recurringExpenses").exec();
			await request(app).get("/api/user").expect(200);
		});
	});
});
