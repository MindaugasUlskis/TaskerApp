import React, { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

interface EmailInputProps {
  value: string;
  onChangeText: (text: string) => void;
}
/**
 * Email input field component.
 */
const EmailInput: React.FC<EmailInputProps> = ({ value, onChangeText }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
         style={[styles.input, value.length === 0 && { opacity: 0.5 }]}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    padding: 10,
    fontSize: 16,
  },
});

export default EmailInput;
