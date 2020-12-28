import styled from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

type CategoryTextProps = {
  color: string;
};

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const NameAndCategory = styled.View``;

export const NameText = styled.Text`
  margin-bottom: 2px;
  font-size: 16px;
`;

export const CategoryContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CategoryText = styled.Text<CategoryTextProps>`
  font-weight: bold;
  color: ${({ color }) => color};
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 1px;
  margin-left: 5px;
`;

export const CategoryIcon = styled(MaterialIcon)`
  padding: 5px;
  font-size: 16px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 50px;
`;

export const PriceText = styled.Text`
  color: #5db075;
  font-size: 30px;
`;
