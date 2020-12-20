import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
import "./config/database.config";

import { default as RecurringExpenseRouter } from "./routes/recurring-expense/recurring-expense.routes";
import { default as CategoryRouter } from "./routes/category/category.routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/recurring-expense", RecurringExpenseRouter);
app.use("/api/category", CategoryRouter);

export default app;
