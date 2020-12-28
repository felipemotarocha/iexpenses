import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import RecurringExpensesScreen from './recurring-expenses/recurring-expenses.screen';
import NonRecurringExpensesScreen from './non-recurring-expenses/non-recurring-expenses.screen';

export interface MyExpensesScreenProps {}

const Tab = createBottomTabNavigator();

const MyExpensesScreen: React.FC<MyExpensesScreenProps> = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#24c685',
        style: {
          paddingBottom: 5,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Recurring Expenses') {
            iconName = 'repeat';
          } else if (route.name === 'Non-Recurring Expenses') {
            iconName = 'credit-card';
          }

          return <MaterialIcon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Recurring Expenses"
        component={RecurringExpensesScreen}
      />
      <Tab.Screen
        name="Non-Recurring Expenses"
        component={NonRecurringExpensesScreen}
      />
    </Tab.Navigator>
  );
};

export default MyExpensesScreen;
