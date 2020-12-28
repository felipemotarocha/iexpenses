import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux/root.reducer';
import { getUserCurrentlyNetBalance } from '../../redux/user/user.utils';
import { Headline, Info, NetBalance } from './current-net-balance.styles';

import Card from '../card/card.component';

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
      <Info>
        Your monthly net balance minus your non recurring expenses of this
        month.
      </Info>
      <NetBalance>R${currentNetBalance}</NetBalance>
    </Card>
  );
};

export default CurrentNetBalance;
