import * as React from 'react';
import { useMemo } from 'react';
import { Button } from 'react-native-paper';
import { Text } from 'react-native';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

import { Headline, Spend } from './suggested-daily-spend.styles';
import { getUserSuggestedDailySpend } from '../../redux/user/user.utils';
import { RootState } from '../../redux/root.reducer';

import Card from '../card/card.component';

export interface SuggestedDailySpendProps {}

const SuggestedDailySpend: React.FC<SuggestedDailySpendProps> = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const { current: today } = React.useRef(format(new Date(), 'EEEE, LLLL do'));

  const suggestedDailySpend = useMemo(
    () => user && getUserSuggestedDailySpend(user),
    [user],
  );

  return (
    <Card>
      <Text>{today}</Text>
      <Headline>Suggested daily spend:</Headline>
      <Spend>R${suggestedDailySpend}</Spend>
      <Button mode="contained" dark style={{ width: '60%' }}>
        Add Expense
      </Button>
    </Card>
  );
};

export default SuggestedDailySpend;
