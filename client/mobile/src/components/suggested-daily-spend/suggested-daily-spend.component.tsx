import * as React from 'react';

import Card from '../card/card.component';
import {Headline, Spend} from './suggested-daily-spend.styles';
import {Button} from 'react-native-paper';

export interface SuggestedDailySpendProps {}

const SuggestedDailySpend: React.FC<SuggestedDailySpendProps> = () => {
  return (
    <Card>
      <Headline>Quanto você pode gastar hoje:</Headline>
      <Spend>R$50,00</Spend>
      <Button mode="contained" dark style={{width: '60%'}}>
        Adicionar despesa
      </Button>
    </Card>
  );
};

export default SuggestedDailySpend;
