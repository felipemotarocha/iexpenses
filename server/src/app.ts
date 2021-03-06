import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
import "./config/database.config";

import { default as RecurringExpenseRouter } from "./routes/recurring-expense/recurring-expense.routes";
import { default as CategoryRouter } from "./routes/category/category.routes";
import { default as NonRecurringExpense } from "./routes/non-recurring-expense/non-recurring-expense.routes";
import { default as UserRouter } from "./routes/user/user.routes";
import { default as IncomeRouter } from "./routes/income/income.routes";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", UserRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/recurring-expense", RecurringExpenseRouter);
app.use("/api/non-recurring-expense", NonRecurringExpense);
app.use("/api/income", IncomeRouter);

export default app;
