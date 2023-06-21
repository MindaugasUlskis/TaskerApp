import React, { useState } from 'react';
import { StyleSheet, View, Text, useColorScheme, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../utils/RootStackPrams';
import { darkTheme, lightTheme } from '../../../assets/theme';
import Header from '../../header/Header';
import WideButton from '../../buttons/WideButton';
import { ImageLibraryOptions, ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';

type CurrentTaskInfoScreenRouteProp = RouteProp<RootStackParamList, 'CurrentTaskInfo'>;

interface CurrentTaskInfoProps {
    route: CurrentTaskInfoScreenRouteProp;
}

const handleTaskCancelation = () => {
    Alert.alert(
        'Cancel Task',
        'Are you sure about canceling this task?',
        [
            { text: 'No', style: 'cancel' },
            { text: 'Yes', onPress: () => console.log('Task canceled') },
        ]
    );
};
const handleArrival = () => {
    Alert.alert(
        'Confirmation',
        'Are you sure about confirming arrival to this location?',
        [
            { text: 'No', style: 'cancel' },
            { text: 'Yes', onPress: () => console.log('Location confirmed') },
        ]
    );
};
const handleFinish = (photoLenght: number) => {

    if(photoLenght <= 0){
        Alert.alert(
            'Error',
            'Please add photos before finishing the task.',
            [
              { text: 'OK', style: 'cancel' },
            ]
          );
    }
    else {
        Alert.alert(
            'Confirmation',
            'Are you sure you want to set this task as finished?',
            [
                { text: 'No', style: 'cancel' },
                { text: 'Yes', onPress: () => console.log('Location confirmed') },
            ]
        ); // Need to add logic for setting new status for the task
    }

    
};



const CurrentTaskInfoScreen: React.FC<CurrentTaskInfoProps> = ({ route }) => {
    const { Task } = route.params;

    const { t } = useTranslation();

    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

    const [prevPhotos, setPrevPhotos] = useState<string[]>([]); //stores photos

    const handleAddPhotos = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 1.0,
            includeBase64: false,
        };

        launchImageLibrary(options, (response: ImagePickerResponse) => {
            if (!response.didCancel && !response.errorCode) {
                const assets = response.assets ?? []; // Provide an empty array as the default value if assets is undefined
                if (assets.length > 0) {
                    const { uri } = assets[0];
                    setPrevPhotos((prevPhotos) => [...prevPhotos, uri].filter((item) => item !== undefined) as string[]);
                }
            }
        });
    };
    const handleRemovePhoto = (index: number) => {
        setPrevPhotos((prevPhotos) => {
            const updatedPhotos = [...prevPhotos];
            updatedPhotos.splice(index, 1);
            return updatedPhotos;
        });
    };



    return (
        <View style={{backgroundColor:theme.colors.background}}>
            <Header />

            <ScrollView contentContainerStyle={[styles.scrollContainer, {backgroundColor:theme.colors.background}]}>
            <View style={[styles.container,  {backgroundColor:theme.colors.background} ]}>

                    <View style={styles.header}>
                        <Text style={styles.title}>{t('Task Category')}</Text>
                        <Text style={styles.priceTitle}>{t('Price:')}</Text>
                    </View>
                    <View style={styles.header}>
                    <View style={[styles.categoryContainer,  {backgroundColor:theme.colors.componentBackground} ]}>
                            <Text style={styles.text}>{t(Task.jobCategory)}</Text>
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
                        <Text style={styles.statusHeader}>{Task.status}</Text>
                    </View>
                    <View style={styles.photosContainer}>
                        {prevPhotos.map((photoUri, index) => (
                            <TouchableOpacity key={index} onPress={() => handleRemovePhoto(index)}>
                                <Image source={{ uri: photoUri }} style={styles.photo} />
                            </TouchableOpacity>
                        ))}
                    </View>
                    {Task.status == 'In Progress' && (
                        <TouchableOpacity onPress={handleAddPhotos} style={[styles.addPhotosButton ,{ backgroundColor: theme.colors.primary }]}>
                            <Text style={styles.addPhotosButtonText}>{t('Add Photos')}</Text>
                        </TouchableOpacity>
                    )}

                    <WideButton onPress={() => handleTaskCancelation()} title={t("Cancel task")} backgroundColor={theme.colors.primary} />

                    {Task.status == 'Pending' && (
                        <WideButton onPress={() => handleArrival()} title={t("Confirm arrival")} backgroundColor={theme.colors.primary} />
                    )}


                    {Task.status == 'In Progress' && (
                        <WideButton onPress={() => handleFinish(prevPhotos.length)} title={t("Finish task")} backgroundColor={theme.colors.primary} />
                    )}



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
        paddingBottom: 40
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

export default CurrentTaskInfoScreen;
