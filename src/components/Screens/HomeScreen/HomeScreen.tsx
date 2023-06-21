import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AppScreen: React.FC = () => {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>hoomtask</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Text>Icon</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.name}>John Doe</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red',
    marginHorizontal: 16,
    marginVertical: 24,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AppScreen;
