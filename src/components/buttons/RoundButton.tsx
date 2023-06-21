import React from 'react';
import { TouchableOpacity, View, StyleSheet, useColorScheme } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { darkTheme, lightTheme } from '../../assets/theme';

/**
 * This is a 'Go Back' button which will be primarily used to let user navigate back in the stack\
 * it takes an onPress prop which should be an event.
 */
interface Props {
  onPress: () => void;
}

const RoundButtonWithArrow: React.FC<Props> = ({ onPress }) => {

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button, {backgroundColor: theme.colors.componentBackground}]}>
        <MaterialIcons name="arrow-back" size={24} color="#000" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RoundButtonWithArrow;
