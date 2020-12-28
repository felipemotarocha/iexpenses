import * as React from 'react';
import { Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { format } from 'date-fns';

import { Container, DateText, Greeting, Headline } from './home.styles';
import { fetchUserStart } from '../../redux/user/user.actions';

import SuggestedDailySpend from '../../components/suggested-daily-spend/suggested-daily-spend.component';
import Header from '../../components/header/header.component';
import CurrentNetBalance from '../../components/current-net-balance/current-net-balance.component';

export interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUserStart('5fe8dff9e681388fa39a18b5'));
  }, [dispatch]);

  const { current: today } = React.useRef(format(new Date(), 'EEEE, LLLL do'));
  return (
    <Container>
      <Header />
      <Greeting>
        <Headline>Hi, Felipe</Headline>
        <DateText>{today}</DateText>
      </Greeting>
      <SuggestedDailySpend />
      <CurrentNetBalance />
    </Container>
  );
};

export default HomeScreen;
