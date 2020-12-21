import { Types } from "mongoose";

import Category from "../models/category/category.model";
import User from "../models/user/user.model";

export const checkIfCategoryIsValid = async (categoryId: string) => {
	const categoryIdIsNotValid = !Types.ObjectId.isValid(categoryId);
	if (categoryIdIsNotValid) {
		return {
			valid: false,
			error: "Please provide a valid category.",
		};
	}

	const categoryDoesNotExist = !(await Category.findById(categoryId));
	if (categoryDoesNotExist) {
		return {
			valid: false,
			error: "Please provide a valid category.",
		};
	}

	return { valid: true, error: undefined };
};

export const checkIfUserIsValid = async (userId: string) => {
	const userIdIsNotValid = !Types.ObjectId.isValid(userId);
	if (userIdIsNotValid) {
		return {
			valid: false,
			error: "Please provide a valid user.",
		};
	}

	const userDoesNotExist = !(await User.findById(userId));
	if (userDoesNotExist) {
		return {
			valid: false,
			error: "Please provide a valid user.",
		};
	}

	return { valid: true, error: undefined };
};
