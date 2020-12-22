import moment from 'moment';
import * as React from 'react';
import { FlatList, View } from "react-native";
import { RFValue } from 'react-native-responsive-fontsize';
import { AppText } from '../../../components';
import { UserAvatar } from '../../../components/UserAvatar';
import { AppTheme } from '../../../config';
import { MOCK_GAMES } from '../../../mockups/Mockups';
const UserProfileReviews = ({ navigation }) => {
    let [state, setState] = React.useState({
        isModalVisible: null,
        selectedColor: '#ff1a4a'
    })
    return (
        <View style={{ backgroundColor: 'black', flex: 1 }}>
            <FlatList
                data={MOCK_GAMES}
                nestedScrollEnabled={true}
                initialNumToRender={2}
                windowSize={2}
                // removeClippedSubviews={true}
                maxToRenderPerBatch={2}
                // bounces={false}
                keyExtractor={ii => (ii._id || '') + 'you'}
                renderItem={({ item, index }) => (
                    <View style={{ borderBottomColor: AppTheme.colors.lightGrey, borderBottomWidth: 0.5, padding: RFValue(15) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <UserAvatar corner={item?.corner || ''}  source={{ uri: item.cover }} size={55} />
                            <View style={{ flex: 1, paddingLeft: RFValue(10) }}>
                                <AppText bold={true} size={2}>{item.name}</AppText>
                                <AppText color={AppTheme.colors.lightGrey} size={2}>{item.name}</AppText>
                                <AppText color={AppTheme.colors.lightGrey} size={0}>Release Date: {moment(item.releaseDate).format('DD MMMM YYYY')}</AppText>
                            </View>
                            <View style={{ borderRadius: RFValue(10), borderWidth: 1, padding: RFValue(10), flex: 0.2, justifyContent: 'center', alignItems: 'center', borderColor: item.negetive ? AppTheme.colors.red : AppTheme.colors.green }}>
                                <AppText size={1}>PS4</AppText>
                                <AppText size={3}>{item.points}</AppText>
                            </View>
                        </View>
                        <View style={{ paddingVertical: RFValue(15) }}>
                            <AppText lines={2} size={2}>{item.description}</AppText>
                            <AppText color={AppTheme.colors.lightGrey} style={{ paddingTop: RFValue(10) }} size={0}>01 gennaio 2020</AppText>
                        </View>
                    </View>
                )} />
        </View>
    )
}

export { UserProfileReviews };
