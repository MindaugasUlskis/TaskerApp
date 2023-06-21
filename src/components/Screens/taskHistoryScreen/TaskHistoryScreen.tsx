import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Animated, useColorScheme } from 'react-native';
import { CheckBox } from 'react-native-elements';


import { useTranslation } from 'react-i18next';
import TaskTab from '../../Tabs/TaskTab';

import Header from '../../header/Header';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { darkTheme, lightTheme } from '../../../assets/theme';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../utils/RootStackPrams';
import { handleHistoryButtonPress } from '../currentTaskScreen/UseCases';
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

const cities = ['Vilnius', 'Kaunas', 'Klaipėda']; // Array of cities
const categories = ['Plumbing', 'Electrical', 'Carpentry', 'Painting', 'Gardening']; // Array of categories

type NavigationProp = StackNavigationProp<
  RootStackParamList,
  'HistoryTaskInfo'
>

const TaskHistoryScreen: React.FC = () => {
  const { t } = useTranslation();

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const navigation = useNavigation<NavigationProp>();


  const HandleTaskNavigation = (task: Task) => {

    navigation.navigate('HistoryTaskInfo', { Task: task });
  }

  const [showFilters, setShowFilters] = useState(false); // State to control the visibility of the filter options
  const [selectedCities, setSelectedCities] = useState<string[]>([]); // State to store selected cities
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // State to store selected categories

  const slideAnimation = useRef(new Animated.Value(0)).current

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    Animated.timing(slideAnimation, {
      toValue: showFilters ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleCitySelection = (city: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((selectedCity) => selectedCity !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const toggleCategorySelection = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((selectedCategory) => selectedCategory !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const isCitySelected = (city: string) => selectedCities.includes(city);
  const isCategorySelected = (category: string) => selectedCategories.includes(category);

  const filterTasks = (task: Task) => {
    if (selectedCities.length === 0 && selectedCategories.length === 0) {
      return true; // Show all tasks if no filters selected
    }
    const cityFilter = selectedCities.length === 0 || selectedCities.includes(task.city);
    const categoryFilter = selectedCategories.length === 0 || selectedCategories.includes(task.jobCategory);
    return cityFilter && categoryFilter;
  };

  return (
    <View style={[styles.container,  {backgroundColor:theme.colors.background} ]}>
      <Header />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{t('Task History')}</Text>
          <View style={styles.filterButtonContainer}>
  <TouchableOpacity onPress={toggleFilters}>
    <View style={styles.filterButtonIconContainer}>
      <Ionicons name="filter" size={28} color={theme.colors.text} />
    </View>
  </TouchableOpacity>
</View>
        </View>
        {showFilters && (
          <Animated.View style={[styles.filterOptions, { transform: [{ translateY: slideAnimation }] }]}>
            <Text style={styles.filterTitle}>{t('Cities')}</Text>
            {cities.map((city) => (
              <View style={styles.filterItem} key={city}>
                <CheckBox
                  checked={isCitySelected(city)}
                  onPress={() => toggleCitySelection(city)}
                />
                <Text>{city}</Text>
              </View>
            ))}
            <Text style={styles.filterTitle}>{t('Categories')}</Text>
            {categories.map((category) => (
              <View style={styles.filterItem} key={category}>
                <CheckBox
                  checked={isCategorySelected(category)}
                  onPress={() => toggleCategorySelection(category)}
                />
                <Text>{category}</Text>
              </View>
            ))}
          </Animated.View>
        )}
        <FlatList
          data={tasks.filter(filterTasks)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TaskTab
              jobCategory={item.jobCategory}
              dateCreated={item.dateCreated}
              status={item.status}
              address={item.address}
              city={item.city}
              cost={item.cost}
              onPress={() => HandleTaskNavigation(item)}
            />
          )}
        />
      </View>
    </View>
  );
  
          }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingVertical: 5
  },
  filterButton: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#007AFF', // example color, modify as needed
  },
  filterOptions: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  filterTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  filterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
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
  },
  filterButtonContainer: {
    paddingLeft: 10,
  },
  filterButtonIconContainer: {
    paddingLeft: '7.5%', 
  },
});

export default TaskHistoryScreen;
