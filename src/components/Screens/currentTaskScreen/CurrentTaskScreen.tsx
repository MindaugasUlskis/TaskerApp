import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import TaskTab from '../../Tabs/TaskTab';
import logoLight from '../../../assets/logoLight.png';
import { darkTheme, lightTheme } from '../../../assets/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../utils/RootStackPrams';
import { handleHistoryButtonPress } from './UseCases';
import Header from '../../header/Header';
interface Task {
  jobCategory: string;
  dateCreated: string;
  status: string;
  address: string;
  cost: number;
  city: string;
  notes: string;
  started?: string;
  tel: string;
  email?: string;
}

const tasks: Task[] = [
  { jobCategory: 'Plumbing', dateCreated: '05/01/2023', status: 'Completed', address: '123 Main St.', city: 'Vilnius', cost: 100, notes: 'Skalbimo mašina pakraunama iš priekio Ströme WM1510/01', started: '15/05/2023 12:10', tel: '+370677777777' },
  { jobCategory: 'Electrical', dateCreated: '05/02/2023', status: 'In Progress', address: '456 Oak Ave.', city: 'Vilnius', cost: 200, notes: 'Televizorius Sony KD50X72KPAEP Android LED TV, 50" (~127 cm)', started: '15/05/2023 12:00', tel: '+370677777777' },
  { jobCategory: 'Carpentry', dateCreated: '05/03/2023', status: 'Pending', address: '789 Maple St.', city: 'Klaipėda', cost: 150, notes: 'Spinta Denver, balta Prekės ID: 6697566', tel: '+370677777777' },
  { jobCategory: 'Plumbing', dateCreated: '05/01/2023', status: 'Completed', address: '123 Main St.', city: 'Vilnius', cost: 120, notes: 'Skalbimo mašina pakraunama iš priekio Ströme WM1510/01', started: '15/05/2023 12:10', tel: '+370677777777' },
  { jobCategory: 'Electrical', dateCreated: '05/02/2023', status: 'In Progress', address: '456 Oak Ave.', city: 'Kaunas', cost: 180, notes: 'Televizorius Sony KD50X72KPAEP Android LED TV, 50" (~127 cm)', started: '15/05/2023 12:00', tel: '+370677777777' },
  { jobCategory: 'Carpentry', dateCreated: '05/03/2023', status: 'Pending', address: '789 Maple St.', city: 'Kaunas', cost: 90, notes: 'Spinta Denver, balta Prekės ID: 6697566', tel: '+370677777777' },
  { jobCategory: 'Plumbing', dateCreated: '05/01/2023', status: 'Completed', address: '123 Main St.', city: 'Vilnius', cost: 80, notes: 'Skalbimo mašina pakraunama iš priekio Ströme WM1510/01', started: '15/05/2023 12:10', tel: '+370677777777' },
  { jobCategory: 'Electrical', dateCreated: '05/02/2023', status: 'In Progress', address: '456 Oak Ave.', city: 'Vilnius', cost: 220, notes: 'Televizorius Sony KD50X72KPAEP Android LED TV, 50" (~127 cm)', started: '15/05/2023 12:00', tel: '+370677777777' },
  { jobCategory: 'Carpentry', dateCreated: '05/03/2023', status: 'Pending', address: '789 Maple St.', city: 'Klaipėda', cost: 130, notes: 'Spinta Denver, balta Prekės ID: 6697566', tel: '+370677777777' },
];


type NavigationPropA = StackNavigationProp<
  RootStackParamList,
  'TaskHistory'
>

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'CurrentTaskInfo'
>


const CurrentTaskScreen: React.FC = () => {





  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;
  const { t } = useTranslation();

  const navigationA = useNavigation<NavigationPropA>();
  const navigation = useNavigation<NavigationProp>();


  const HandleTaskNavigation = (task: Task) => {

    navigation.navigate('CurrentTaskInfo', { Task: task });
  }


  return (
    <View style={[styles.container,  {backgroundColor:theme.colors.background} ]}>
      <Header />
      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>{t('Current Tasks')}</Text>
          <TouchableOpacity style={styles.historyButton} onPress={() => navigationA.navigate("TaskHistory")}>
            <Text style={{ color: theme.colors.primary, fontWeight: 'bold' }}>{t("History")}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            if (item.status === 'Pending' || item.status === 'In Progress') {
              return (
                <TaskTab
                  jobCategory={item.jobCategory}
                  dateCreated={item.dateCreated}
                  status={item.status}
                  address={item.address}
                  city={item.city}
                  cost={item.cost}
                  onPress={() => HandleTaskNavigation(item)}
                />
              );
            }
            return null; // Skip rendering if status is not "Pending" or "In Progress"
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  topLeft: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  topRight: {
    position: 'absolute',
    top: 10,
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
  content: {
    flex: 1,
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 18,
    paddingVertical: 10,
    flex: 0.95
  },
  historyButton: {
    alignSelf: 'center',


  },
  contentHeader: {
    flexDirection: "row",
  }

});

export default CurrentTaskScreen;
