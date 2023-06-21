import React, { useState } from 'react';
import { TextInput, StyleSheet, View, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  eyeColor: string;
}
/**
 * Password input field component with a icon button that can reveal/hide password value
 */

const PasswordInput: React.FC<PasswordInputProps> = ({ value, onChangeText, eyeColor }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, value.length === 0 && { opacity: 0.5 }]}
        placeholder="Password"
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity style={[styles.iconContainer, {opacity: 0.3}]} onPress={togglePasswordVisibility}>
        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={eyeColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  iconContainer: {
    padding: 10,
  },
});

export default PasswordInput;
