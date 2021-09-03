import messaging from '@react-native-firebase/messaging';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator, useIsDrawerOpen} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {Image, Linking, TouchableOpacity} from 'react-native';
import AppBlurView from '../components/AppBlurView';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {ICON_ADD, ICON_GAME, ICON_HOME, ICON_QUEST, ICON_SEARCH} from '../../assets/icons';
import {AppTheme} from '../config';
import {
  AppContactsSearch,
  AppFollowersAndFollowingList,
  AppHelpCenter,
  AppReport,
  AppSettingsScreen,
  AppVersionScreen,
  BlockedAccounts,
  ChangePasswordScreen,
  ChatWindow,
  CreatePost,
  DataPolicyScreen,
  DeleteAccount,
  EditUserProfileScreen,
  GameDetailsScreen,
  HomeScreen,
  InboxScreen,
  LeaveFeedBack,
  NotificationScreen,
  OmegaStoreTabs,
  PersonalInformationScreen,
  PostDetailScreenWithComments,
  QuestScreen,
  RateGameScreen,
  ReportAbuseOrSpam,
  ReportAccountHack,
  ReportExposedPrivateInfo,
  ReportImpersonation,
  ReportSystemIssue,
  RequestVerificationScreen,
  ReviewsScreen,
  SearchScreen,
  TermsAndConditions,
  UserProfileCustomizeScreen,
  UserProfileScreen,
  PaymentWebView,
} from '../screens';
import {UserSavedPosts} from '../screens/dashboard/UserSavedPosts';
import {AppShowPushNotification, GetPostByCommentID, requestPushNotificationPermission} from '../services';
import {AppLogger, DynamicLinkHelper} from '../utils/AppHelperMethods';
import {CustomDrawer} from './CustomDrawer';
import AndroidFullScreen from '../components/AndroidFullScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DashboardTabsExtra({navigation}) {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: 'black'}}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          const ICON_SIZE = RFValue(36);
          const ICON_STYLE = {
            height: RFValue(ICON_SIZE),
            width: RFValue(ICON_SIZE),
          };
          if (route.name === 'Home')
            return (
              <Image source={ICON_HOME} style={[ICON_STYLE, focused ? {tintColor: AppTheme.colors.primary} : null]} />
            );
          else if (route.name === 'Search')
            return (
              <Image source={ICON_SEARCH} style={[ICON_STYLE, focused ? {tintColor: AppTheme.colors.primary} : null]} />
            );
          else if (route.name === 'Creat')
            return (
              <TouchableOpacity
                style={{
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
                onPress={() => navigation.navigate('CreatePost')}>
                <FastImage source={ICON_ADD} style={[ICON_STYLE]} />
              </TouchableOpacity>
            );
          else if (route.name === 'Reviews')
            return (
              <Image source={ICON_GAME} style={[ICON_STYLE, focused ? {tintColor: AppTheme.colors.primary} : null]} />
            );
          else if (route.name === 'Quests')
            return (
              <Image source={ICON_QUEST} style={[ICON_STYLE, focused ? {tintColor: AppTheme.colors.primary} : null]} />
            );
        },
      })}
      tabBarOptions={{
        style: {
          height: RFValue(56),
          borderTopColor: 'black',
          borderTopWidth: RFValue(2),
          // paddingTop: RFValue(10)
        },
        showLabel: false,
        activeBackgroundColor: AppTheme.colors.darkGrey,
        inactiveBackgroundColor: AppTheme.colors.darkGrey,
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Creat">{() => <></>}</Tab.Screen>
      <Tab.Screen name="Reviews" component={ReviewsScreen} />
      <Tab.Screen name="Quests" component={QuestScreen} />
    </Tab.Navigator>
  );
}

async function notificationHandler(noti, navigation) {
  if (noti?.message && noti?.createdBy) {
    navigation.push('ChatWindow', {friend: noti?.createdBy});
  } else if (noti?.comment) {
    try {
      const post = await GetPostByCommentID(noti?.comment);
      navigation.push('PostDetailScreenWithComments', {postID: post?._id});
    } catch (err) {}
  } else if (noti?.post) {
    navigation.push('PostDetailScreenWithComments', {postID: noti?.post});
  } else if (noti?.message && noti?.from) {
    navigation.push('ChatWindow', {friend: noti?.from});
  } else if (noti?.createdBy?._id) {
    navigation.push('UserProfileScreen', {userID: noti?.createdBy?._id});
  }
}

const DrawerDashboardTabsExtra = ({navigation}) => {
  React.useEffect(() => {
    Linking.addEventListener('url', (link) => {
      DynamicLinkHelper(navigation, link);
    });
    Linking.getInitialURL()
      .then((link) => {
        DynamicLinkHelper(navigation, link);
      })
      .catch((err) => {
        AppLogger('----------ERROR LINK GETTING INITIAL URL DEEP LINK----------', err);
      });
    /* NOTIFICATION HANDLERS */
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      if (remoteMessage) {
        let newData = JSON.parse(remoteMessage?.data?.payload);
        AppLogger('----set backgrou mssge handler-------:', newData);

        notificationHandler(newData, navigation);
      }
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      if (remoteMessage) {
        let newData = JSON.parse(remoteMessage?.data?.payload);
        notificationHandler(newData, navigation);
      }
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          let newData = JSON.parse(remoteMessage?.data?.payload);
          notificationHandler(newData, navigation);
        }
      });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage) {
        AppShowPushNotification(remoteMessage?.notification?.title, remoteMessage?.notification?.body, () => {
          let newData = JSON.parse(remoteMessage?.data?.payload);
          notificationHandler(newData, navigation);
        });
      }
    });

    return () => {
      unsubscribe();
      Linking.removeEventListener('url', (link) => {
        DynamicLinkHelper(navigation, link);
      });
    };
  }, []);
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      overlayColor={'rgba(0,0,0,0.9)'}
      drawerContent={(props) => <CustomDrawer {...props} />}
      drawerStyle={{width: '85%'}}>
      <Drawer.Screen name="Home" component={DashboardTabsExtra} />
      <Drawer.Screen name="UserProfileCustomizeScreen" component={UserProfileCustomizeScreen} />
      <Drawer.Screen name="OmegaStore" component={OmegaStoreTabs} />
      <Drawer.Screen name="UserSavedPosts" component={UserSavedPosts} />
      <Drawer.Screen name="AppSettingsScreen" component={AppSettingsScreen} />
      <Drawer.Screen name="LeaveFeedBack" component={LeaveFeedBack} />
    </Drawer.Navigator>
  );
};

const DashboardTabs = () => {
  React.useEffect(() => {
    requestPushNotificationPermission();
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Dashboard" component={DrawerDashboardTabsExtra} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="OmegaStore" component={OmegaStoreTabs} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
      <Stack.Screen name="InboxScreen" component={InboxScreen} />
      <Stack.Screen name="AppSettingsScreen" component={AppSettingsScreen} />
      <Stack.Screen name="UserSavedPosts" component={UserSavedPosts} />
      <Stack.Screen name="PersonalInformationScreen" component={PersonalInformationScreen} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
      <Stack.Screen name="RequestVerificationScreen" component={RequestVerificationScreen} />
      <Stack.Screen name="BlockedAccounts" component={BlockedAccounts} />
      <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      <Stack.Screen name="DataPolicyScreen" component={DataPolicyScreen} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
      <Stack.Screen name="ChatWindow" component={ChatWindow} />
      <Stack.Screen name="AppContactsSearch" component={AppContactsSearch} />
      <Stack.Screen name="AppFollowersAndFollowingList" component={AppFollowersAndFollowingList} />
      <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
      <Stack.Screen name="GameDetailsScreen" component={GameDetailsScreen} />
      <Stack.Screen name="PostDetailScreenWithComments" component={PostDetailScreenWithComments} />
      <Stack.Screen name="RateGameScreen" component={RateGameScreen} />
      <Stack.Screen name="LeaveFeedBack" component={LeaveFeedBack} />
      <Stack.Screen name="AppReport" component={AppReport} />
      <Stack.Screen name="ReportAbuseOrSpam" component={ReportAbuseOrSpam} />
      <Stack.Screen name="ReportAccountHack" component={ReportAccountHack} />
      <Stack.Screen name="ReportExposedPrivateInfo" component={ReportExposedPrivateInfo} />
      <Stack.Screen name="ReportImpersonation" component={ReportImpersonation} />
      <Stack.Screen name="ReportSystemIssue" component={ReportSystemIssue} />
      <Stack.Screen name="AppVersionScreen" component={AppVersionScreen} />
      <Stack.Screen name="AppHelpCenter" component={AppHelpCenter} />
      <Stack.Screen name="EditUserProfileScreen" component={EditUserProfileScreen} />
      <Stack.Screen name="UserProfileCustomizeScreen" component={UserProfileCustomizeScreen} />
      <Stack.Screen name="AndroidFullScreen" component={AndroidFullScreen} />
      <Stack.Screen name="PaymentWebView" component={PaymentWebView} />
    </Stack.Navigator>
  );
};

export {DashboardTabs};
