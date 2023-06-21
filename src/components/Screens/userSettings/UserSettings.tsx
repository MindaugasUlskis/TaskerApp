import { RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { RootStackParamList } from '../../../utils/RootStackPrams';
import Header from '../../header/Header';
import WideButton from '../../buttons/WideButton';
import { useTranslation } from 'react-i18next';
import { darkTheme, lightTheme } from '../../../assets/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';

type UserSettingsScreenRouteProp = RouteProp<RootStackParamList, 'UserSettings'>;

interface UserSettingsProps {
  route: UserSettingsScreenRouteProp;
}

const UserSettings: React.FC<UserSettingsProps> = ({ route }) => {
  const { User } = route.params;
  const [email, setEmail] = useState<string>(User.email);
  const [phone, setPhone] = useState<string>(User.phone);
  const [bankId, setBankId] = useState<string>(User.bank);
  const [address, setAddress] = useState<string>(User.address);
  const [selectedCities, setSelectedCities] = useState<string[]>(User.city);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(User.skills);
  const [isCityListVisible, setCityListVisible] = useState(false);
  const [isSkillListVisible, setSkillListVisible] = useState(false);

  const [prevPhoto, setPrevPhoto] = useState<any>(User.photo);

  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

  const handlePhotoSelect = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 1.0,
      includeBase64: false,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (!response.didCancel && !response.errorCode) {
        const assets = response.assets ?? [];
        if (assets.length > 0) {
          const { uri } = assets[0];
          setPrevPhoto(uri);
        }
      }
    });
  };

  const handleCitySelect = (city: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((item) => item !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const toggleCityList = () => {
    setCityListVisible(!isCityListVisible);
  };

  const toggleSkillList = () => {
    setSkillListVisible(!isSkillListVisible);
  };

  const handleSkillSelect = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((item) => item !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const cities: string[] = [
    'Vilnius',
    'Klaipėda',
    'Šiauliai',
    // Add more cities
  ];

  const skills: string[] = [
    'Carpentry',
    'Plumming',
    'Furniture Building',
    // Add more skills
  ];

  const CityList: React.FC<{ visible: boolean }> = ({ visible }) => {
    if (!visible) {
      return null;
    }

    return (
      <FlatList
        data={cities}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => handleCitySelect(item)}
          >
            <Text style={styles.checkboxText}>{item}</Text>
            <Text>
              {selectedCities.includes(item) ? (
                <Icon name="checkmark" size={16} color="green" />
              ) : null}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    );
  };

  const SkillList: React.FC<{ visible: boolean }> = ({ visible }) => {
    if (!visible) {
      return null;
    }

    return (
      <FlatList
        data={skills}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => handleSkillSelect(item)}
          >
            <Text style={styles.checkboxText}>{item}</Text>
            <Text>
              {selectedSkills.includes(item) ? (
                <Icon name="checkmark" size={16} color="green" />
              ) : null}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor:theme.colors.background }}>
      <Header />
      <ScrollView style={[styles.container,  {backgroundColor:theme.colors.background} ]}>
        <View style={styles.header}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.name}>{User.name}</Text>
            <Text style={styles.surname}>{User.secondName}</Text>
          </View>
          <TouchableOpacity onPress={ ()=> console.log("Button for photoChange pressed")}>
           
              <Image
                source={require('../../../assets/Windows_10_Default_Profile_Picture.svg.png')}
                style={styles.photo}
              />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={[styles.input,  {backgroundColor:theme.colors.componentBackground} ]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={[styles.input,  {backgroundColor:theme.colors.componentBackground} ]}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
        />
        <Text style={styles.label}>Address:</Text>
        <TextInput
          style={[styles.input,  {backgroundColor:theme.colors.componentBackground} ]}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <Text style={styles.label}>Bank ID:</Text>
        <TextInput
          style={[styles.input,  {backgroundColor:theme.colors.componentBackground} ]}
          placeholder="Bank ID"
          value={bankId}
          onChangeText={setBankId}
        />

        <View>
          <Text style={[styles.selectText,  {color:theme.colors.primary} ]} onPress={toggleCityList}>
            Select City
          </Text>
          <CityList visible={isCityListVisible} />
        </View>
        <Text style={[styles.selectText,  {color:theme.colors.primary} ]} onPress={toggleSkillList}>
          Select Skills
        </Text>
        <SkillList visible={isSkillListVisible} />

        <WideButton
          onPress={() => console.log({ selectedCities })}
          title={t('Save Changes')}
          backgroundColor={theme.colors.primary}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 8,
  },
  surname: {
    fontSize: 20,
    marginRight: 8,
  },
  input: {
    height: 50,
    padding: 10,
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 5,
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxText: {
    marginRight: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
});

export default UserSettings;
