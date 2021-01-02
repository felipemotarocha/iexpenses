import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { MockStoreEnhanced } from 'redux-mock-store';

import SuggestedDailySpend from './suggested-daily-spend.component';
import { MOCKED_USER } from '../../redux/user/mocks/user.mocks';
import { initialRootState, mockStore } from '../../config/tests.config';

describe('Suggested Daily Spend Component', () => {
  let store: MockStoreEnhanced<unknown, {}>;

  beforeEach(() => {
    store = mockStore({
      ...initialRootState,
      user: {
        loading: false,
        user: MOCKED_USER,
      },
    });
  });

  it('should render the component', () => {
    const component = (
      <Provider store={store}>
        <SuggestedDailySpend />
      </Provider>
    );

    const wrapper = render(component);
    expect(wrapper).toBeDefined();
  });
});
