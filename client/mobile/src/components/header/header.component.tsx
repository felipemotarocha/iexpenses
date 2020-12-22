import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {Text} from 'react-native';
import {IconButton} from 'react-native-paper';
import {Container} from './header.styles';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const navigation = useNavigation();

  const handleOpenDrawer = () => {
    // TODO: fix type
    navigation.openDrawer();
  };
  return (
    <Container>
      <IconButton icon="menu" color="white" onPress={handleOpenDrawer} />
    </Container>
  );
};

export default Header;
