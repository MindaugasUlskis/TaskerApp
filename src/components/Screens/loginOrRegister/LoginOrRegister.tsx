import React from 'react';
import { View, Text, Image, StyleSheet,  useColorScheme, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import WideButton from '../../buttons/WideButton';

import { lightTheme, darkTheme } from '../../../assets/theme';

import logoLight from '../../../assets/logoLight.png';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../utils/RootStackPrams';



type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'LogScreen'
>

const LogInOrRegisterScreen: React.FC = () => {

  const { t } = useTranslation();

  const navigation = useNavigation<NavigationProp>();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
/**
 * LogInOrRegister screen gives user an option to either request and account or procceed to LogScreen
 * LogIn WideButton navigates use to LogScreen where user can input information.
 * 
 */
  return (
    <View style={[styles.container,  {backgroundColor:theme.colors.background} ]}>
      <View style={styles.upperFlex}>
      <Image source={logoLight} style={styles.logo} />
        <Text style={[styles.text, {color: theme.colors.text}]}>{t("For the professionals")}</Text>
      </View>
      <View style={styles.bottomFlex}>
      <WideButton onPress={() => navigation.navigate('LogScreen')} title={t('Log in')} backgroundColor={theme.colors.primary} ></WideButton>
      <WideButton onPress={() => Linking.openURL('https://www.google.com') } title={t('Request an account')} backgroundColor={theme.colors.primary} ></WideButton>
      </View>
    </View>
  );
 
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'white'
    },
    upperFlex: {
      flex: 0.6,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomFlex: {
      flex: 0.4,
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
        
      },
    text: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom:"50%",
   
    },
  });



export default LogInOrRegisterScreen;
