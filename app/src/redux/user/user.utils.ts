import { User } from '../../types/user.types';
import { differenceInDays, endOfMonth } from 'date-fns';

export const getUserTotalIncomes = (user: User) => {
  return user.incomes!.reduce(
    (accumulator, income) => (accumulator += income.amount),
    0,
  );
};

export const getUserTotalRecurringExpenses = (user: User) => {
  return user.recurringExpenses!.reduce(
    (accumulator, expense) => (accumulator += expense.price),
    0,
  );
};

export const getUserTotalNonRecurringExpenses = (user: User) => {
  return user.nonRecurringExpenses!.reduce(
    (accumulator, expense) => (accumulator += expense.price),
    0,
  );
};

export const getUserMonthlyNetBalance = (user: User) => {
  const totalOfIncomes = getUserTotalIncomes(user);
  const totalOfRecurringExpenses = getUserTotalRecurringExpenses(user);
  return totalOfIncomes - totalOfRecurringExpenses;
};

export const getUserSuggestedDailySpend = (user: User) => {
  const monthlyNetBalance = getUserMonthlyNetBalance(user);
  const totalOfNonRecurringExpenses = getUserTotalNonRecurringExpenses(user);

  const todaysDay = new Date();
  const endDayOfTheCurrentMonth = endOfMonth(todaysDay);
  const remainingDaysOfTheCurrentMonth = differenceInDays(
    endDayOfTheCurrentMonth,
    todaysDay,
  );

  return (
    (monthlyNetBalance - totalOfNonRecurringExpenses) /
    remainingDaysOfTheCurrentMonth
  );
};

export const getUserCurrentlyNetBalance = (user: User) => {
  const userMonthlyNetBalance = getUserMonthlyNetBalance(user);
  const userTotalNonRecurringExpenses = getUserTotalNonRecurringExpenses(user);

  return userMonthlyNetBalance - userTotalNonRecurringExpenses;
};
