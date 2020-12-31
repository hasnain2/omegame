import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppConfig } from '../config';
import { AppLogger } from '../utils/AppHelperMethods';
import { AppBackButton } from './AppBackButton';
import { AppModal } from './AppModal';
import { AppText } from './AppText';

const AppGooglePlacesAutoFill = ({ show, toggle, onChangeValue }) => {
    let [state, setState] = useState({
        selectedLocation: ''
    })
    return (
        <AppModal show={show} toggle={toggle}>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'black', width: '100%' }}>
                <View style={{ flex: 1, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <AppBackButton onPress={toggle} />
                        <AppText
                            style={{ padding: RFValue(10) }}
                            onPress={toggle} size={3} bold={true} color={'white'}>Done</AppText>
                    </View>
                    <View style={{ paddingHorizontal: RFValue(10), flex: 1 }}>
                        <GooglePlacesAutocomplete
                            placeholder='Search'
                            fetchDetails={true}
                            nearbyPlacesAPI="GoogleReverseGeocoding"
                            currentLocation={true}
                            onFail={(err) => {
                                AppLogger('---------GOOGLE PLACES FAILED------', err)
                            }}
                            onPress={(data, details = null) => {
                                let locationObj = {
                                    addressName: data?.terms[0]?.value || data?.description,
                                    country: data?.terms[1]?.value || data?.description,
                                    streetAddress: data?.description,
                                    coordinates: ((details?.geometry?.location?.lat || '') + ", " + (details.geometry?.location?.lng || ''))
                                };
                                if (onChangeValue)
                                    onChangeValue(locationObj)
                            }}
                            GooglePlacesDetailsQuery={{ fields: 'geometry' }}
                            query={{
                                key: AppConfig.GOOGLE_PLACES_API_KEY,
                                language: 'en',
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </AppModal>
    );
};

export { AppGooglePlacesAutoFill };
