import faker from 'faker';
import { User } from '../../../types/user.types';

export const MOCKED_USER_ID = faker.random.uuid();

export const MOCKED_USER_INCOMES: User['incomes'] = [
  {
    _id: faker.random.uuid(),
    amount: 1000,
    name: faker.lorem.word(7),
    userId: MOCKED_USER_ID,
  },
];

export const MOCKED_USER_RECURRING_EXPENSES: User['recurringExpenses'] = [
  {
    _id: faker.random.uuid(),
    name: faker.commerce.productName(),
    price: 500,
    userId: MOCKED_USER_ID,
    category: {
      _id: faker.random.uuid(),
      name: faker.lorem.word(7),
    },
  },
];

export const MOCKED_USER_NON_RECURRING_EXPENSES: User['nonRecurringExpenses'] = [
  {
    _id: faker.random.uuid(),
    name: faker.commerce.productName(),
    price: 200,
    userId: MOCKED_USER_ID,
    category: {
      _id: faker.random.uuid(),
      name: faker.lorem.word(7),
    },
    creationDate: faker.date.recent(),
  },
];

export const MOCKED_USER: User = {
  _id: MOCKED_USER_ID,
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  incomes: MOCKED_USER_INCOMES,
  recurringExpenses: MOCKED_USER_RECURRING_EXPENSES,
  nonRecurringExpenses: MOCKED_USER_NON_RECURRING_EXPENSES,
};
