import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

/**
 * This Component is the default button for mose cases in this project.
 * Button can take in title, onPress which is the even that will happen when button is pressed
 * and background color, most cases where this button was used dinamic colors from themes were picked according to users dark/light modes
 */

interface Props {
  onPress: () => void;
  title: string;
  backgroundColor?: string;
}

const WideButton: React.FC<Props> = ({ onPress, title, backgroundColor }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor }]}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: '80%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: "center",
    marginTop: 20
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WideButton;
