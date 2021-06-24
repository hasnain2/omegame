import moment from 'moment';
import * as React from 'react';
import {FlatList, View, TouchableOpacity, Image} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {AppLoadingView, AppNoDataFound, AppText} from '../../../components';
import {UserAvatar} from '../../../components/UserAvatar';
import {AppTheme} from '../../../config';
import {setUserProfileData} from '../../../redux/reducers/userProfileDataSlice';
import {GetUserReviews} from '../../../services/gamesService';
import {ICON_EDIT} from '../../../../assets/icons';
var uuid = require('react-native-uuid');
const UserProfileReviews = ({navigation, userID}) => {
  let {userProfileData, user} = useSelector((state) => state.root);

  let dispatch = useDispatch();

  let [state, setState] = React.useState({
    loading: true,
  });

  React.useEffect(() => {
    GetUserReviews((reviewRes) => {
      if (reviewRes) dispatch(setUserProfileData({reviews: reviewRes}));
      setState((prev) => ({...prev, loading: false}));
    }, userID);
  }, []);

  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      {!state.loading && userProfileData?.reviews.length < 1 ? (
        <AppNoDataFound />
      ) : (
        <FlatList
          data={userProfileData.reviews}
          nestedScrollEnabled={true}
          initialNumToRender={2}
          windowSize={2}
          // removeClippedSubviews={true}
          maxToRenderPerBatch={2}
          // bounces={false}
          keyExtractor={(ii) => (ii?._id || '') + 'you' + uuid.v1()}
          renderItem={({item, index}) => (
            <View
              style={{
                borderBottomColor: AppTheme.colors.lightGrey,
                borderBottomWidth: 0.5,
                padding: RFValue(15),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <UserAvatar
                  corner={item?.corner || ''}
                  color={item?.cornerColor}
                  source={{uri: item.gameImage}}
                  size={55}
                />
                <View style={{flex: 1, paddingLeft: RFValue(10)}}>
                  <AppText bold={true} size={2}>
                    {item?.name || item?.gameName || ''}
                  </AppText>
                  <AppText color={AppTheme.colors.lightGrey} size={2}>
                    {item.forEntity}
                  </AppText>
                  <AppText color={AppTheme.colors.lightGrey} size={0}>
                    Release Date: {moment(item.releaseDate).format('DD MMMM YYYY')}
                  </AppText>
                </View>
                <View
                  style={{
                    borderRadius: RFValue(10),
                    borderWidth: 1,
                    padding: RFValue(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: RFValue(80),
                    borderColor: item.negetive ? AppTheme.colors.red : AppTheme.colors.green,
                  }}>
                  <View style={{alignItems: 'center'}}>
                    <AppText size={1}>{item?.devices ? item?.devices : item.devices}</AppText>
                    <AppText size={3}>{parseFloat(item?.ratings || 0)?.toFixed(2)}</AppText>
                  </View>
                  {user._id === userID ? (
                    <View>
                      <AppText>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('RateGameScreen', {gameData: item, item, profile: true});
                          }}>
                          <Image
                            source={ICON_EDIT}
                            style={{
                              height: RFValue(15),
                              width: RFValue(15),
                              marginBottom: RFValue(15),
                              tintColor: AppTheme.colors.white,
                            }}
                          />
                        </TouchableOpacity>
                      </AppText>
                    </View>
                  ) : null}
                </View>
              </View>
              <View style={{paddingVertical: RFValue(15)}}>
                <AppText lines={2} size={2}>
                  {item.feedback}
                </AppText>
                <AppText color={AppTheme.colors.lightGrey} style={{paddingTop: RFValue(10)}} size={0}>
                  {moment(item.createdAt).format('DD MMM YYYY')}
                </AppText>
              </View>
            </View>
          )}
        />
      )}
      {state.loading && userProfileData?.reviews.length < 1 ? <AppLoadingView /> : null}
    </View>
  );
};

export {UserProfileReviews};
