import * as React from 'react';
import {Container} from './card.styles';

export interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({children}) => {
  return <Container>{children}</Container>;
};

export default Card;
