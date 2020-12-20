import { Schema, model } from "mongoose";
import { IUserDocument, IUserModel } from "./user.model.types";

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
