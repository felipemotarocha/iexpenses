import { Document, Model } from "mongoose";

export interface ICategoryDocument extends Document {
	name: string;
}

export interface ICategoryModel extends Model<ICategoryDocument> {}
