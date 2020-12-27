import * as React from 'react';
import { useDispatch } from 'react-redux';

import { Container } from './home.screen.styles';
import { fetchUserStart } from '../../redux/user/user.actions';

import SuggestedDailySpend from '../../components/suggested-daily-spend/suggested-daily-spend.component';
import Header from '../../components/header/header.component';

export interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchUserStart('5fe8dff9e681388fa39a18b5'));
  }, [dispatch]);

  return (
    <Container>
      <Header />
      <SuggestedDailySpend />
    </Container>
  );
};

export default HomeScreen;
