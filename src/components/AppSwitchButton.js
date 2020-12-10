import * as React from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppTheme } from '../config';

const AppSwitchButton = ({ value }) => {
    const THUMB_COLOR = value ? AppTheme.colors.primary : AppTheme.colors.lightGrey;
    const RAIL_COLOR = value ? 'rgba(0, 95, 247,0.4)' : AppTheme.colors.darkGrey;

    const SWITCH_SIZE_HEIGHT = RFValue(20);
    const SWITCH_SIZE_WIDTH = SWITCH_SIZE_HEIGHT + RFValue(20);
    return (
        <View style={{
            borderRadius: 90, backgroundColor: RAIL_COLOR,
            height: SWITCH_SIZE_HEIGHT, width: SWITCH_SIZE_WIDTH,
            alignItems: value ? 'flex-end' : 'flex-start',
            overflow: 'hidden'
        }}>

            <View style={{ height: SWITCH_SIZE_HEIGHT, width: SWITCH_SIZE_HEIGHT, borderRadius: 90, borderWidth: 2.5, borderColor: THUMB_COLOR, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: SWITCH_SIZE_HEIGHT - RFValue(10), width: SWITCH_SIZE_HEIGHT - RFValue(10), backgroundColor: THUMB_COLOR, borderRadius: 90, borderWidth: 1, borderColor: THUMB_COLOR, justifyContent: 'center', alignItems: 'center' }} />
            </View>
        </View>
    )
}
export { AppSwitchButton };
