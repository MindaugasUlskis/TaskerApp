import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text, useColorScheme } from 'react-native';

import logoLight from '../../assets/logoLight.png'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { darkTheme, lightTheme } from '../../assets/theme';

// Header component used in most screens to display bell button for future implementations and logo
// !!!!!!! Change logo background color!!!.

interface HeaderProps {
  onBellPress: () => void;
}



const Header: React.FC = () => {

    const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;


  return (
    <View style={[styles.header,  {backgroundColor:theme.colors.background} ]}>
      <TouchableOpacity style={styles.topLeft}>
        <Image source={logoLight} style={styles.logo} />
      </TouchableOpacity>
      <View style={styles.topRight}>
        <TouchableOpacity style={styles.bellIcon} onPress={() => console.log("bell clicked")}>
            <Text>
            <Ionicons name= 'md-notifications-outline' size={28} color= {theme.colors.text} />
            </Text>
        
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 23,
    backgroundColor: 'white',
  },
  topLeft: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  topRight: {
    position: 'absolute',
    top: 5,
    right: 20,
  },
  logo: {
    width: 150,
    height: 35,
    resizeMode: 'contain',
  },
  bellIcon: {
    padding: 10,
  },
});

export default Header;
