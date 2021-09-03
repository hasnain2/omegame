import React, {useEffect, useState} from 'react';
import {Alert, Image, Platform, TouchableOpacity, View} from 'react-native';
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
import {setItalian} from '../../redux/reducers/translationSlice';
import {store} from '../../redux/store';
import {GetSingleUserProfile, UpdateProfile, UpdateUserProfile} from '../../services';
import {GetAppSettings, SetAppSettings} from '../../services/appSettingsService';
import {LogOutUser} from '../../services/authService';
import {AppLogger} from '../../utils/AppHelperMethods';
import {EvilIcons} from '../../utils/AppIcons';
import {storeData} from '../../utils/AppStorage';
import {useTranslation} from 'react-i18next';
import {METHOD_DATA_IOS, DETAILS_IOS, METHOD_DATA_ANDROID, DETAILS_ANDROID} from '../../utils/AppConstants';
import {useDispatch} from 'react-redux';
const METHOD_DATA = [
  {
    supportedMethods: ['android-pay'],
    data: {
      supportedNetworks: ['visa', 'mastercard', 'amex'],
      currencyCode: 'USD',
      environment: 'TEST', // defaults to production
      paymentMethodTokenizationParameters: {
        tokenizationType: 'NETWORK_TOKEN',
        parameters: {
          publicKey: 'BPWwZfZY5ptX+2xjsPoJ1lM81se036AF9S0HPld81yT+s1fsa8B7/HuneclulpHKDtf1QkUAU+EcUHRqaoZnBjg=',
        },
      },
    },
  },
];

const ICONSTYLE = {height: RFValue(40), width: RFValue(40), tintColor: 'white'};
const AppSettingsScreen = ({navigation, route}) => {
  let {user, isItalian} = useSelector((state) => state.root);
  let dispatch = useDispatch();
  const {t, i18n} = useTranslation();
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
  const handleLanguageChange = () => {
    if (!isItalian) {
      i18n.changeLanguage('it');
    } else {
      i18n.changeLanguage('en');
    }
    dispatch(setItalian(!isItalian));
  };

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
          {name === 'Notifications' ||
          name === 'Private Account' ||
          name === 'Switch to Italian' ||
          name === 'Conto privato' ||
          name === 'Passa all italiano' ||
          name === 'Notifiche' ? (
            <AppSwitchButton value={toggle} />
          ) : null}
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
            {rendListItem(ICON_SAVE_POST, t('setting.savedPosts'), false)}
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              SetAppSettings(() => {}, {notificationsAllowed: !state.isNotificationOn});
              setState((prev) => ({...prev, isNotificationOn: !state.isNotificationOn}));
            }}>
            {rendListItem(ICON_NOTIFICATION, t('setting.notifications'), state.isNotificationOn)}
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
            {rendListItem(ICON_PRIVATE, t('setting.privateAccount'), user.isPrivate)}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLanguageChange}>
            {rendListItem(ICON_PRIVATE, t('setting.switchItalian'), isItalian)}
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
            {rendListItem(ICON_ACCOUNT_SETTINGS, t('setting.accountSettings'), false)}
          </TouchableOpacity>
          {state.accountSettingDetails ? (
            <View style={{paddingLeft: RFValue(58)}}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingBottom: RFValue(10)}}
                onPress={() => {
                  navigation.navigate('PersonalInformationScreen');
                }}>
                {rendOptionsItem(t('setting.personalInformation'))}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingBottom: RFValue(10)}}
                onPress={() => {
                  navigation.navigate('ChangePasswordScreen');
                }}>
                {rendOptionsItem(t('setting.changePassword'))}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingBottom: RFValue(10)}}
                onPress={() => {
                  navigation.navigate('RequestVerificationScreen');
                }}>
                {rendOptionsItem(t('setting.requestVerification'))}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingBottom: RFValue(10)}}
                onPress={() => {
                  navigation.navigate('BlockedAccounts');
                }}>
                {rendOptionsItem(t('setting.blockedAccount'))}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('DeleteAccount');
                }}>
                {rendOptionsItem(t('setting.deleteAccount'))}
              </TouchableOpacity>
            </View>
          ) : null}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setState((prev) => ({...prev, infoHelpDetails: !state.infoHelpDetails, accountSettingDetails: false}));
            }}>
            {rendListItem(ICON_INFO, t('setting.infoHelp'), false)}
          </TouchableOpacity>

          {state.infoHelpDetails ? (
            <View style={{paddingLeft: RFValue(50)}}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingBottom: RFValue(10)}}
                onPress={() => {
                  navigation.navigate('AppVersionScreen');
                }}>
                {rendOptionsItem(t('setting.appVersion'))}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingBottom: RFValue(10)}}
                onPress={() => {
                  navigation.navigate('DataPolicyScreen');
                }}>
                {rendOptionsItem(t('setting.dataPolicy'))}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingBottom: RFValue(10)}}
                onPress={() => {
                  navigation.navigate('TermsAndConditions');
                }}>
                {rendOptionsItem(t('setting.termUse'))}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                style={{paddingBottom: RFValue(10)}}
                onPress={() => {
                  navigation.navigate('AppReport');
                }}>
                {rendOptionsItem(t('setting.reportProblem'))}
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('AppHelpCenter');
                }}>
                {rendOptionsItem(t('setting.helpCenter'))}
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
            {rendListItem(ICON_GAMEOVER, t('setting.Gameover'), false)}
          </TouchableOpacity>
        </View>

        <TouchableOpacity>
          {/* <EvilIcons name="star" style={{fontSize: RFValue(20), color: AppTheme.colors.lightBlue}} /> */}
          {/* <View style={{marginVertical: RFValue(5)}}>
            <AppButton
              color={AppTheme.colors.lightBlue}
              label="Donate"
              style={{width: '100%', height: 50}}
              onPress={() => {
                if (Platform.OS === 'ios') {
                  const paymentRequest = new PaymentRequest(METHOD_DATA_IOS, DETAILS_IOS);
                  paymentRequest.show();
                } else {
                  const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS_ANDROID);
                  paymentRequest.show();
                }
              }}
            />
          </View> */}
          <AppButton
            color={AppTheme.colors.lightBlue}
            label={t('setting.leaveFeedback')}
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
