import React from 'react';
import { View, Text, Image, StyleSheet,  useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../utils/RootStackPrams';
import logoLight from '../../../assets/logoLight.png';

import RoundButtonWithArrow from '../../buttons/RoundButton';
import WideButton from '../../buttons/WideButton';

import { lightTheme, darkTheme } from '../../../assets/theme';
import useLoading from '../../../utils/helperFunctions/Loading';
import { useTranslation } from 'react-i18next';
import TaskTab from '../../Tabs/TaskTab';

type logInScreenProp = StackNavigationProp<RootStackParamList, 'LogInOrRegister'>


/**
 * 
 * At this moment RoundButton and Wide Buttons are here just to test if they work.
 * To simulate loading, there is a timer set to 10seconds in utility function Loading.
 * After Loading in user will be pushed to LogInOrRegister Screen.
 */
const SplashScreen: React.FC = () => {

  const { t } = useTranslation();

  const navigation = useNavigation<logInScreenProp>();
  const { loading} = useLoading();


  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Image source={logoLight} style={styles.logo} />
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }
   else {
    navigation.navigate('LogInOrRegister');
    return null;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    marginTop: 20,
    padding:50,
  },
});

export default SplashScreen;
