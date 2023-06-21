import React, { useState } from 'react';
import { StyleSheet, View, Text, useColorScheme, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../utils/RootStackPrams';
import { darkTheme, lightTheme } from '../../../assets/theme';
import Header from '../../header/Header';
import WideButton from '../../buttons/WideButton';
import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';

type HistoryTaskInfoScreenRouteProp = RouteProp<RootStackParamList, 'HistoryTaskInfo'>;

interface HistoryTaskInfoProps {
    route: HistoryTaskInfoScreenRouteProp;
}




const HistoryTaskInfoScreen: React.FC<HistoryTaskInfoProps> = ({ route }) => {
    const { Task } = route.params;

    const { t } = useTranslation();

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    const [prevPhotos, setPrevPhotos] = useState<string[]>([]); //stores photos



    return (
        <View style={[styles.container,  {backgroundColor:theme.colors.background} ]}>
            <Header />

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View>

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
                        <Text style={styles.title}>{t('Contact information')}</Text>
                    </View>
                    <View style={[styles.textContainer,  {backgroundColor:theme.colors.componentBackground} ]}>
                        <Text style={styles.text}>{Task.tel}</Text>
                    </View>
                    <View style={styles.header}>
                        <Text style={styles.title}>{t('Notes')}</Text>
                    </View>
                    <View style={[styles.textContainer,  {backgroundColor:theme.colors.componentBackground} ]}>
                        <Text style={styles.text}>{Task.notes}</Text>
                    </View>
                    <View style={styles.status}>
                        <Text style={styles.statusHeader}>{t('Status')}</Text>
                    </View>
                    <View style={styles.status}>
                        <Text style={styles.statusHeader}>{t(Task.status)}</Text>
                    </View>
                    <View style={styles.photosContainer}>
                        {prevPhotos.map((photoUri, index) => (
                            
                                <Image source={{ uri: photoUri }} style={styles.photo} />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 50,
    },
    container: {
        flex: 1,
        paddingBottom: 20
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
        marginRight: '12%'
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
        width: "95%",
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    categoryContainer: {

        backgroundColor: '#eee',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        width: "60%",
        alignItems: 'center',

    },
    text: {
        fontSize: 16,
    },
    status: {
        alignSelf: 'center'
    },
    statusHeader: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    addPhotosButton: {
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 5,
        alignSelf: 'center',
    },
    addPhotosButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    photosContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 10,
    },
    photo: {
        width: 100,
        height: 100,
        margin: 5,
        borderRadius: 5,
    },


});

export default HistoryTaskInfoScreen;
