import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';
import { categoryColors } from '../../utils/jobCategoryColors/JobCategoryColors';
import { useTranslation } from 'react-i18next';
import { darkTheme, lightTheme } from '../../assets/theme';


// TAB template used to generate clickable tabs in screens.

interface TabProps {
  jobCategory: string;
  dateCreated: string;
  status: string;
  address: string;
  city: string;
  cost: number;
  onPress: () => void;
}

const TaskTab: React.FC<TabProps> = ({
  jobCategory,
  dateCreated,
  status,
  address,
  city,
  cost,
  onPress,
}) => {
  const { t } = useTranslation();

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const borderColor = categoryColors[jobCategory.toLowerCase()] || 'gray';

  return (
    <TouchableOpacity style={[styles.tab, { borderLeftColor: borderColor, backgroundColor:theme.colors.componentBackground }]} onPress={onPress}>
      <View style={styles.tabHeader}>
        <Text style={styles.tabHeaderText}>{t(jobCategory)}</Text>
        <Text style={styles.tabHeaderText}>{dateCreated}</Text>
      </View>
      <View style={styles.tabContent}>
        <View>
        <Text style={styles.tabContentText}>{t(status)}</Text>
        <Text style={styles.tabContentText}>{address}</Text>
        </View>
        <View>
        <Text style={styles.tabContentText}>{city}</Text>
        <Text style={styles.tabContentText}>{cost} Eur</Text>
        </View>

        
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  tab: {
    borderRadius: 10,
    margin: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    width:"95%",
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderLeftWidth: 5,
  },
  tabHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tabHeaderText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  tabContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabContentText: {
    fontSize: 14,
  },
});

export default TaskTab;
