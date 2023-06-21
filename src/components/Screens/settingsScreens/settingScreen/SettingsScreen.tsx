import React from 'react';
import { View, ScrollView, StyleSheet, Image, Text, TouchableOpacity, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../../../header/Header';
import WideButton from '../../../buttons/WideButton';
import { useTranslation } from 'react-i18next';
import { darkTheme, lightTheme } from '../../../../assets/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../utils/RootStackPrams';
import { useNavigation } from '@react-navigation/native';
// Import default photo
const defaultPhoto = require('../../../../assets/Windows_10_Default_Profile_Picture.svg.png');


type NavigationProp = StackNavigationProp<RootStackParamList, 'UserSettings'>;


const SettingsScreen: React.FC = () => {

    const { t } = useTranslation();

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    const navigation = useNavigation<NavigationProp>();


    interface User {
        name: string;
        secondName: string;
        rating: number;
        address: string;
        photo: string;
        phone: any;
        bank: string;
        city: string[];
        skills: string[];
        email: string;
    }

    const user: User =
        { name: 'John',
        secondName: "Doe",
        rating: 4.8,
        address: 'Naugarduko g. 98',
        city: ['Vilnius', 'Klaipėda'],
        skills: ['Carpentry', 'Plumming'], 
        phone: '+37066666666', 
        bank: 'LT601010012345678901',
        email: 'example@gmail.com',
        photo: defaultPhoto,
        };

    return (
        <View style={{backgroundColor:theme.colors.background}}>
            <Header />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.surname}>{user.secondName}</Text>
                    </View>

                    <Image source={defaultPhoto} style={styles.photo} />
                </View>
                <View style={styles.ratingContainer}>
                    <Text>
                        <Ionicons name='star' size={16} color={theme.colors.text} />
                    </Text>
                    <Text style={styles.ratingText}>{user.rating}  </Text>
                </View>
                <TouchableOpacity style={[styles.button,  {backgroundColor:theme.colors.componentBackground} ]} onPress={() => navigation.navigate('UserSettings', {User: user})}>
                    <Text style={styles.buttonText}>{t("My Profile")}</Text>
                    <Icon name="chevron-forward" size={16} style={styles.arrowIcon} />
                </TouchableOpacity>
                <Text style={styles.sectionHeader}>{t("About")}</Text>
                <TouchableOpacity style={[styles.button,  {backgroundColor:theme.colors.componentBackground} ]} onPress={() => console.log("Button pressed")}>
                    <Text style={styles.buttonText}>{t("Rate our app")}</Text>
                    <Icon name="chevron-forward" size={16} style={styles.arrowIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,  {backgroundColor:theme.colors.componentBackground} ]} onPress={() => console.log("Button pressed")}>
                    <Text style={styles.buttonText}>{t("Like us on Facebook")}</Text>
                    <Icon name="chevron-forward" size={16} style={styles.arrowIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,  {backgroundColor:theme.colors.componentBackground} ]} onPress={() => console.log("Button pressed")}>
                    <Text style={styles.buttonText}>{t("Terms of service")}</Text>
                    <Icon name="chevron-forward" size={16} style={styles.arrowIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,  {backgroundColor:theme.colors.componentBackground} ]} onPress={() => console.log("Button pressed")}>
                    <Text style={styles.buttonText}>{t("Privacy Policy")}</Text>
                    <Icon name="chevron-forward" size={16} style={styles.arrowIcon} />
                </TouchableOpacity>
                <Text style={styles.sectionHeader}>{t("Help")}</Text>
                <TouchableOpacity style={[styles.button,  {backgroundColor:theme.colors.componentBackground} ]} onPress={() => console.log("Button pressed")}>
                    <Text style={styles.buttonText}>{t("Contact us")}</Text>
                    <Icon name="chevron-forward" size={16} style={styles.arrowIcon} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button,  {backgroundColor:theme.colors.componentBackground} ]} onPress={() => console.log("Button pressed")}>
                    <Text style={styles.buttonText}>{t("Give us feedback")}</Text>
                    <Icon name="chevron-forward" size={16} style={styles.arrowIcon} />
                </TouchableOpacity>
                <WideButton onPress={() => console.log('log out clicked')} title={t("Log out")} backgroundColor={theme.colors.primary} />
                <View style={{ padding: 25 }}></View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'space-between'

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
    photo: {
        width: 80,
        height: 80,
        borderRadius: 20,
        right: '25%'
    },
    sectionHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    button: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        borderRadius: 10,
        margin: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        width: "95%",
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        justifyContent: 'space-between'
    },
    buttonText: {
        fontSize: 16,
        marginRight: 8,
    },
    arrowIcon: {
        width: 16,
        height: 16,
        alignSelf: 'center'
    },
    ratingText: {
        fontSize: 16,

    },
    ratingContainer: {
        flexDirection: 'row-reverse',
        marginLeft: '10%',
        alignContent: 'center',
        alignItems: 'center',
    }

});

export default SettingsScreen;
