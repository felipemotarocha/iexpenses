import * as React from 'react';

import Card from '../card/card.component';
import { Headline, Spend } from './suggested-daily-spend.styles';
import { Button } from 'react-native-paper';
import { Text } from 'react-native';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { fetchUserStart } from '../../redux/user/user.actions';

export interface SuggestedDailySpendProps {}

const SuggestedDailySpend: React.FC<SuggestedDailySpendProps> = () => {
  const dispatch = useDispatch();
  const { current: today } = React.useRef(format(new Date(), 'EEEE, LLLL do'));

  return (
    <Card>
      <Text>{today}</Text>
      <Headline>How much you can spend today:</Headline>
      <Spend>R$50,00</Spend>
      <Button mode="contained" dark style={{ width: '60%' }}>
        Add Expense
      </Button>
    </Card>
  );
};

export default SuggestedDailySpend;
