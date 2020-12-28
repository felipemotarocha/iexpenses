import React from 'react';
import { Text } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Category } from '../../types/category.types';
import { getCategoryItem } from '../../utils/category.utils';
import Card from '../card/card.component';
import {
  CategoryContainer,
  CategoryIcon,
  CategoryText,
  Container,
  NameAndCategory,
  NameText,
  PriceText,
} from './expense-item.styles';

export interface ExpenseItemProps {
  name: string;
  price: number;
  category: Category;
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ name, price, category }) => {
  const categoryItem = getCategoryItem(category);
  return (
    <Card>
      <Container>
        <NameAndCategory>
          <NameText>{name}</NameText>
          <CategoryContainer>
            <CategoryIcon
              name={categoryItem?.name}
              color="#eee"
              backgroundColor={categoryItem?.color}
            />
            <CategoryText color={categoryItem?.color}>
              {category.name}
            </CategoryText>
          </CategoryContainer>
        </NameAndCategory>
        <PriceText>R${price}</PriceText>
      </Container>
    </Card>
  );
};

export default ExpenseItem;
