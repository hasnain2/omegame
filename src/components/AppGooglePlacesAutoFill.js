import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_PLACES_API_KEY } from '../config';

const AppGooglePlacesAutoFill = () => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            onFail={(err)=>{
                console.log('---------GOOGLE PLACES FAILED------', err)
            }}
            onPress={(data, details = null) => {
                // 'details' is provided when fetchDetails = true
                console.log(data, details);
            }}
            query={{
                key: GOOGLE_PLACES_API_KEY,
                language: 'en',
            }}
        />
    );
};

export { AppGooglePlacesAutoFill };