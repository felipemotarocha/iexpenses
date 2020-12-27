import React, { useMemo } from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root.reducer';
import { getUserCurrentlyNetBalance } from '../../redux/user/user.utils';
import Card from '../card/card.component';
import { Headline, NetBalance } from './current-net-balance.styles';

export interface CurrentNetBalanceProps {}

const CurrentNetBalance: React.FC<CurrentNetBalanceProps> = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const currentNetBalance = useMemo(
    () => user && getUserCurrentlyNetBalance(user),
    [user],
  );
  return (
    <Card>
      <Headline>Your current balance</Headline>
      <NetBalance>R${currentNetBalance}</NetBalance>
    </Card>
  );
};

export default CurrentNetBalance;
