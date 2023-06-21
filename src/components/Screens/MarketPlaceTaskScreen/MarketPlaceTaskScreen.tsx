import React from 'react';
import { StyleSheet, View, Text, useColorScheme, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../utils/RootStackPrams';
import { darkTheme, lightTheme } from '../../../assets/theme';
import Header from '../../header/Header';
import WideButton from '../../buttons/WideButton';
import { useTranslation } from 'react-i18next';

type MarketPlaceTaskScreenRouteProp = RouteProp<RootStackParamList, 'MarketPlaceTask'>;

interface MarketPlaceTaskProps {
  route: MarketPlaceTaskScreenRouteProp;
}

const handleTaskConfirmation = () => {
  Alert.alert(
    'Confirmation',
    'Are you sure about taking this task?',
    [
      { text: 'No', style: 'cancel' },
      { text: 'Yes', onPress: () => console.log('Task confirmed') },
    ]
  );
};

const MarketPlaceTaskScreen: React.FC<MarketPlaceTaskProps> = ({ route }) => {
  const { Task } = route.params;

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const { t } = useTranslation();


  return (


    <View style={[styles.container,  {backgroundColor:theme.colors.background} ]}>
      <Header />
      <View style={styles.header}>
        <Text style={styles.title}>{t('Task Category')}</Text>
        <Text style={styles.priceTitle}>{t('Price:')}</Text>
      </View>
      <View style={styles.header}>
      <View style={[styles.categoryContainer,  {backgroundColor:theme.colors.componentBackground} ]}>
          <Text style={styles.text}>{Task.jobCategory}</Text>
      </View>
      <Text style={styles.priceTitle}>{Task.cost}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>{t('Address')}</Text>
      </View>
      <View style={[styles.textContainer,  {backgroundColor:theme.colors.componentBackground} ]}>
        <Text style={styles.text}>{Task.city} {Task.address}</Text>
      </View>
      <View style={styles.header}>
        <Text style={styles.title}>{t('Notes')}</Text>
      </View>
      <View style={[styles.textContainer,  {backgroundColor:theme.colors.componentBackground} ]}>
        <Text style={styles.text}>{Task.notes}</Text>
      </View>
      <View style={{paddingVertical: 50}}></View>
      <WideButton onPress={() => handleTaskConfirmation()} title={t("take this task")} backgroundColor={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 18,
    paddingVertical: 10,
  },
  priceTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingVertical: 10,
    marginRight:'12%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
      backgroundColor: '#eee',
      borderRadius: 10,
      margin: 10,
      padding: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      width:"95%",
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    categoryContainer: {
    
      backgroundColor: '#eee',
      borderRadius: 10,
      margin: 10,
      padding: 10,      
      width:"60%",
      alignItems: 'center',
      
    },
    text: {
      fontSize: 16,
    },


});

export default MarketPlaceTaskScreen;
