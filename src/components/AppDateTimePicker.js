import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Platform, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppText } from '../components';
import { AppTheme } from '../config';

const AppDateTimePicker = ({ show, value, setShow, onChange, mode, }) => {
    return (
        <View >
            {show && (
                <View style={[Platform.OS === 'ios' ? { backgroundColor: AppTheme.colors.darkGrey, marginTop: RFValue(50) } : null]}>
                    {Platform.OS === 'ios' ?
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between' }}>
                            <AppText onPress={() => { setShow(false); onChange('') }} style={{ padding: RFValue(10), }} color={'white'}>Cancel</AppText>
                            <AppText onPress={() => { setShow(false) }} style={{ padding: RFValue(10), }} color={AppTheme.colors.primary}>Done</AppText>
                        </View> : null}
                    <DateTimePicker
                        testID="dateTimePicker"

                        collapsable={true}
                        minimumDate={new Date(1950, 0, 1)}
                        maximumDate={new Date(2050, 10, 20)}

                        value={value ? new Date(value) : new Date()}

                        onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || value;
                            setShow(Platform.OS === 'ios');
                            onChange(currentDate);
                        }}
                    />
                </View>
            )}
        </View>
    );

};

export { AppDateTimePicker };
