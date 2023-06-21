import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from "react-native";
import { darkTheme, lightTheme } from "../../../assets/theme";
import RoundButtonWithArrow from "../../buttons/RoundButton";
import WideButton from "../../buttons/WideButton";
import logoLight from "../../../assets/logoLight.png"
import { useTranslation } from "react-i18next";
import PasswordInput from "../../PasswordInput/passwordInput";
import EmailInput from "../../EmailInput/EmailInput";
import { handleLogin } from "./UseCases";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../utils/RootStackPrams";
import * as RNLocalize from 'react-native-localize';


type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'LogInOrRegister'
>
type NavigationPropA = StackNavigationProp<
  RootStackParamList,
  'Main'
>
const LogScreen: React.FC = () => {

  const { t } = useTranslation();

  const navigation = useNavigation<NavigationProp>();
  const navigationA = useNavigation<NavigationPropA>();

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const locales = RNLocalize.getLocales();
const preferredLanguageCodes = locales.map(locale => locale.languageCode);



  return (
    <View style={[styles.container,  {backgroundColor:theme.colors.background} ]}>
  
      <View style={styles.topLeft}>
        <Image source={logoLight} style={styles.logo} />
      </View>
      <View style={styles.iconContainer}>
        <RoundButtonWithArrow onPress={() => navigation.navigate('LogInOrRegister')} />
      </View>
      <Text style={[styles.loginText, { color:theme.colors.text }]}>{t('Log in')}</Text>
      <View>

        <EmailInput value={email} onChangeText={setEmail} />

        <PasswordInput value={password} onChangeText={setPassword} eyeColor={theme.colors.background2} />
      </View>
      <WideButton onPress={() => handleLogin({ email, password }, navigationA)} title={t('Log in')} backgroundColor={theme.colors.primary} />
      <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => console.log(preferredLanguageCodes)}>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
      </TouchableOpacity>
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white"
  },
  topLeft: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  logo: {
    width: 150,
    height: 35,
    resizeMode: 'contain',
  },
  iconContainer: {
    marginTop: 35,
    alignItems: "flex-start"
  },
  icon: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    borderRadius: 25,
  },
  loginText: {
    marginTop: "30%",
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'left',
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    height: 50,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  loginButton: {
    marginTop: 20,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: "center"
  },
  forgotPassword: {
    marginTop: 10,
    textDecorationLine: "underline",
  },
});

export default LogScreen;