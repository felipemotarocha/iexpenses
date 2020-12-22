import * as React from 'react';

import SuggestedDailySpend from '../../components/suggested-daily-spend/suggested-daily-spend.component';
import {Container} from './home.screen.styles';
import Header from '../../components/header/header.component';

export interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <Container>
      <Header />
      <SuggestedDailySpend />
    </Container>
  );
};

export default HomeScreen;
