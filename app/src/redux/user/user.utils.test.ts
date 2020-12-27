import { MOCKED_USER } from './mocks/user.mocks';
import {
  getUserMonthlyNetBalance,
  getUserSuggestedDailySpend,
  getUserTotalIncomes,
  getUserTotalNonRecurringExpenses,
  getUserTotalRecurringExpenses,
} from './user.utils';

describe('User Related Utility Functions', () => {
  it('should get the user total incomes', () => {
    const userTotalIncomes = getUserTotalIncomes(MOCKED_USER);
    expect(userTotalIncomes).toBe(1000);
  });
  it('should get the user total recurring expenses', () => {
    const userTotalRecurringExpenses = getUserTotalRecurringExpenses(
      MOCKED_USER,
    );
    expect(userTotalRecurringExpenses).toBe(500);
  });
  it('should get the user total non-recurring expenses', () => {
    const userTotalNonRecurringExpenses = getUserTotalNonRecurringExpenses(
      MOCKED_USER,
    );
    expect(userTotalNonRecurringExpenses).toBe(200);
  });
  it('should get the user monthly net balance', () => {
    const userMonthlyNetBalance = getUserMonthlyNetBalance(MOCKED_USER);
    expect(userMonthlyNetBalance).toBe(500);
  });
  it('should get the user suggested daily spend', () => {
    const userSuggestedDailySpend = getUserSuggestedDailySpend(MOCKED_USER);
    expect(userSuggestedDailySpend).toBeDefined();
  });
});
