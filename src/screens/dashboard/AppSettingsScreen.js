import React, {useEffect, useState} from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import {
  ICON_ACCOUNT_SETTINGS,
  ICON_GAMEOVER,
  ICON_INFO,
  ICON_NOTIFICATION,
  ICON_PRIVATE,
  ICON_SAVE_POST,
} from '../../../assets/icons';
import {AppBackButton, AppSwitchButton, AppText, AppButton} from '../../components';
import {AppTheme} from '../../config';
import {setUser} from '../../redux/reducers/userSlice';
import {store} from '../../redux/store';
import {GetSingleUserProfile, UpdateProfile, UpdateUserProfile} from '../../services';
import {GetAppSettings, SetAppSettings} from '../../services/appSettingsService';
import {LogOutUser} from '../../services/authService';
import {AppLogger} from '../../utils/AppHelperMethods';
import {EvilIcons} from '../../utils/AppIcons';
import {storeData} from '../../utils/AppStorage';

const ICONSTYLE = {height: RFValue(40), width: RFValue(40), tintColor: 'white'};
const AppSettingsScreen = ({navigation, route}) => {
  let {user} = useSelector((state) => state.root);
  let [state, setState] = useState({
    loading: true,
    isNotificationOn: false,
    accountSettingDetails: false,
    infoHelpDetails: false,
  });

  useEffect(() => {
    UpdateUserProfile();
    GetAppSettings((appSettingsResponse) => {
      if (appSettingsResponse) {
        setState((prev) => ({...prev, isNotificationOn: appSettingsResponse?.notificationsAllowed}));
      } else {
        setState((prev) => ({...prev, loading: false}));
      }
    });
  }, []);

  const rendListItem = (Iconn, name, toggle) => {
    return (
      <View pointerEvents={'none'} style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 0.15, padding: RFValue(8)}}>
          <Image source={Iconn} style={ICONSTYLE} />
        </View>
        <View style={{flex: 1}}>
          <AppText size={3}>
            {'  '}
            {name}
          </AppText>
        </View>
        <View style={{flex: 0.3}}>
          {name === 'Notifications' || name === 'Private Account' ? <AppSwitchButton value={toggle} /> : null}
        </View>
      </View>
    );
  };

  const rendOptionsItem = (name) => {
    return (
      <View style={{flexDirection: 'row', paddingBottom: RFValue(10)}}>
        <AppText size={2} color={AppTheme.colors.lightGrey} style={{}}>
          {name}
        </AppText>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <AppBackButton navigation={navigation} />

      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{padding: RFValue(10)}}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('UserSavedPosts');
            }}>
            {rendListItem(ICON_SAVE_POST, 'Saved Posts', false)}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              SetAppSettings(() => {}, {notificationsAllowed: !state.isNotificationOn});
              setState((prev) => ({...prev, isNotificationOn: !state.isNotificationOn}));
            }}>
            {rendListItem(ICON_NOTIFICATION, 'Notifications', state.isNotificationOn)}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              UpdateProfile(
                (res) => {
                  if (res) {
                    let tempUser = {...store.getState().root.user};
                    tempUser.isPrivate = !user.isPrivate;
                    storeData('user', tempUser);
                    store.dispatch(setUser(tempUser));
                  }
                },
                {isPrivate: !user.isPrivate},
              );
            }}>
            {rendListItem(ICON_PRIVATE, 'Private Account', user.isPrivate)}
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setState((prev) => ({
                ...prev,
                accountSettingDetails: !state.accountSettingDetails,
                infoHelpDetails: false,
              }));
            }}>
            {rendListItem(ICON_ACCOUNT_SETTINGS, 'Account Settings', false)}
          </TouchableOpacity>
          {state.accountSettingDetails ? (
            <View style={{paddingLeft: RFValue(58)}}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingBottom: RFValue(10)}}
                onPress={() => {
                  navigation.navigate('PersonalInformationScreen');
                }}>
                {rendOptionsItem('Personal Information')}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingBottom: RFValue(10)}}
                onPress={() => {
                  navigation.navigate('ChangePasswordScreen');
                }}>
                {rendOptionsItem('Change Password')}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingBottom: RFValue(10)}}
                onPress={() => {
                  navigation.navigate('RequestVerificationScreen');
                }}>
                {rendOptionsItem('Request Verification')}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingBottom: RFValue(10)}}
                onPress={() => {
                  navigation.navigate('BlockedAccounts');
                }}>
                {rendOptionsItem('Blocked Account')}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('DeleteAccount');
                }}>
                {rendOptionsItem('Delete account')}
              </TouchableOpacity>
            </View>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setState((prev) => ({...prev, infoHelpDetails: !state.infoHelpDetails, accountSettingDetails: false}));
            }}>
            {rendListItem(ICON_INFO, 'Info & Help', false)}
          </TouchableOpacity>

          {state.infoHelpDetails ? (
            <View style={{paddingLeft: RFValue(50)}}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingBottom: RFValue(10)}}
                onPress={() => {
                  navigation.navigate('AppVersionScreen');
                }}>
                {rendOptionsItem('App Version')}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingBottom: RFValue(10)}}
                onPress={() => {
                  navigation.navigate('DataPolicyScreen');
                }}>
                {rendOptionsItem('Data Policy')}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingBottom: RFValue(10)}}
                onPress={() => {
                  navigation.navigate('TermsAndConditions');
                }}>
                {rendOptionsItem('Terms of Use')}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingBottom: RFValue(10)}}
                onPress={() => {
                  navigation.navigate('AppReport');
                }}>
                {rendOptionsItem('Report a problem')}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('AppHelpCenter');
                }}>
                {rendOptionsItem('Help Center')}
              </TouchableOpacity>
            </View>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              Alert.alert(
                'Logout',
                'Are you sure you want to logout?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => AppLogger('', 'Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'LOGOUT',
                    onPress: () => {
                      LogOutUser((dta) => {});
                    },
                  },
                ],
                {cancelable: false},
              );
            }}>
            {rendListItem(ICON_GAMEOVER, 'Gameover', false)}
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          {/* <EvilIcons name="star" style={{fontSize: RFValue(20), color: AppTheme.colors.lightBlue}} /> */}
          <AppButton
            color={AppTheme.colors.lightBlue}
            label="Leave a feedback"
            style={{width: '100%', height: 50}}
            onPress={() => {
              navigation.navigate('LeaveFeedBack');
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {AppSettingsScreen};
