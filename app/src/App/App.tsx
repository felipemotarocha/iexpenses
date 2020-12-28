import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/home/home.screen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyExpensesScreen from '../screens/my-expenses/my-expenses.screen';

export interface AppProps {}

const Drawer = createDrawerNavigator();

const App: React.FC<AppProps> = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="My Expenses" component={MyExpensesScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
