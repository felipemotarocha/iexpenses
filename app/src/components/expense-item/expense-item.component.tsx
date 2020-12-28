import React from 'react';
import { Text } from 'react-native';
import Card from '../card/card.component';
import { Container, NameAndCategory, Price } from './expense-item.styles';

export interface ExpenseItemProps {
  name: string;
  price: number;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ name, price }) => {
  return (
    <Card>
      <Container>
        <NameAndCategory>
          <Text>{name}</Text>
          <Text>Entertainment</Text>
        </NameAndCategory>
        <Price>
          <Text>{price}</Text>
        </Price>
      </Container>
    </Card>
  );
};

export default ExpenseItem;
