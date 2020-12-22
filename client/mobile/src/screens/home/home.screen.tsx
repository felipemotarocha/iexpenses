import * as React from 'react';

import SuggestedDailySpend from '../../components/suggested-daily-spend/suggested-daily-spend.component';
import {Container} from './home.screen.styles';

export interface HomeScreenProps {}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <Container>
      <SuggestedDailySpend />
    </Container>
  );
};

export default HomeScreen;
