import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../../../redux/root.reducer';
import { Container } from './recurring-expenses.styles';

import ExpenseItem from '../../../components/expense-item/expense-item.component';
import Header from '../../../components/header/header.component';

export interface RecurringExpensesScreenProps {}

const RecurringExpensesScreen: React.FC<RecurringExpensesScreenProps> = () => {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user) return <Text>Loading...</Text>;

  return (
    <Container>
      <Header />
      {user.recurringExpenses?.map((expense) => (
        <ExpenseItem
          name={expense.name}
          price={expense.price}
          category={expense.category}
        />
      ))}
    </Container>
  );
};

export default RecurringExpensesScreen;
