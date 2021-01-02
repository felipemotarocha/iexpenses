import createSagaMiddleware from 'redux-saga';
import configureStore from 'redux-mock-store';
import { RootState } from '../redux/root.reducer';

export const sagaMiddleware = createSagaMiddleware();
export const middlewares: any = [sagaMiddleware];

export const mockStore = configureStore(middlewares);

export const initialRootState: RootState = {
  user: {
    user: null,
    loading: false,
  },
};
