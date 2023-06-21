import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SplashScreen from './src/components/Screens/splashScreen/SplashScreen';
import HomeScreen from './src/components/Screens/HomeScreen/HomeScreen';
import LogInOrRegisterScreen from './src/components/Screens/loginOrRegister/LoginOrRegister';
import LogScreen from './src/components/Screens/LogScreen/LogScreen';
import TaskHistoryScreen from './src/components/Screens/taskHistoryScreen/TaskHistoryScreen';

import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './src/utils/locales/i18n';
import { LogBox, Settings, useColorScheme } from 'react-native';
import CurrentTaskScreen from './src/components/Screens/currentTaskScreen/CurrentTaskScreen';
import MarketPlaceScreen from './src/components/Screens/marketPlaceScreen/MarketPlaceScreen';
import MarketPlaceTaskScreen from './src/components/Screens/MarketPlaceTaskScreen/MarketPlaceTaskScreen';
import { RootStackParamList } from './src/utils/RootStackPrams';
import CurrentTaskInfoScreen from './src/components/Screens/currentTaskInfoScreen/CurrentTaskInfoScreen';
import SettingsScreen from './src/components/Screens/settingsScreens/settingScreen/SettingsScreen';
import UserSettings from './src/components/Screens/userSettings/UserSettings';
import HistoryTaskInfoScreen from './src/components/Screens/historyTaskInfoScreen/HistoryTaskInfoScreen';
import { darkTheme, lightTheme } from './src/assets/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {

  

  LogBox.ignoreAllLogs();// USE THIS ONLY when app is finished and there are few unsolved uneffecting errors.

  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LogInOrRegister" component={LogInOrRegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LogScreen" component={LogScreen}  options={{ headerShown: false }}/>
          <Stack.Screen name="TaskHistory" component={TaskHistoryScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MarketPlaceTask" component={MarketPlaceTaskScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CurrentTaskInfo" component={CurrentTaskInfoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="UserSettings" component={UserSettings} options={{ headerShown: false }} />
          <Stack.Screen name="HistoryTaskInfo" component={HistoryTaskInfoScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
};

const MainTabNavigator: React.FC = () => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {backgroundColor:theme.colors.componentBackground },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === t("Settings")) {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === t("Current Tasks")) {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === t("MarketPlace")) {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          }

          return <Ionicons name={iconName as string} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={t("Current Tasks")} component={CurrentTaskScreen} options={{ headerShown: false }} />
      <Tab.Screen name={t("MarketPlace")} component={MarketPlaceScreen} options={{ headerShown: false }} />
      <Tab.Screen name={t("Settings")} component={SettingsScreen} options={{ headerShown: false }} />
      
    </Tab.Navigator>
  );
};

export default App;
