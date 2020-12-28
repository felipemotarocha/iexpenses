import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/root.reducer';
import { getUserCurrentlyNetBalance } from '../../redux/user/user.utils';
import { Headline, Info, Balance } from './current-balance.styles';

import Card from '../card/card.component';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export interface CurrentBalanceProps {}

const CurrentBalance: React.FC<CurrentBalanceProps> = () => {
  const navigation = useNavigation();
  const { user } = useSelector((state: RootState) => state.user);
  const currentBalance = useMemo(
    () => user && getUserCurrentlyNetBalance(user),
    [user],
  );

  const handleNavigateToMyExpensesScreen = () => {
    navigation.navigate('My Expenses');
  };

  return (
    <Card>
      <Headline>Your current balance</Headline>
      <Info>
        Your monthly net balance minus your non recurring expenses of this
        month.
      </Info>
      <Balance>R${currentBalance}</Balance>
      <Button
        mode="contained"
        dark
        style={{ width: '60%' }}
        onPress={handleNavigateToMyExpensesScreen}>
        See my expenses
      </Button>
    </Card>
  );
};

export default CurrentBalance;
