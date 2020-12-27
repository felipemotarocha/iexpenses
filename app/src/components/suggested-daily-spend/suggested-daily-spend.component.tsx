import * as React from 'react';
import { useMemo } from 'react';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { Headline, Info, Spend } from './suggested-daily-spend.styles';
import { getUserSuggestedDailySpend } from '../../redux/user/user.utils';
import { RootState } from '../../redux/root.reducer';

import Card from '../card/card.component';

export interface SuggestedDailySpendProps {}

const SuggestedDailySpend: React.FC<SuggestedDailySpendProps> = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const suggestedDailySpend = useMemo(
    () => user && getUserSuggestedDailySpend(user),
    [user],
  );

  return (
    <Card>
      <Headline>Suggested daily spend</Headline>
      <Info>
        Taking into account your current balance and the days remaining in the
        month.
      </Info>
      <Spend>R${suggestedDailySpend}</Spend>
      <Button mode="contained" dark style={{ width: '60%' }}>
        Add Expense
      </Button>
    </Card>
  );
};

export default SuggestedDailySpend;
