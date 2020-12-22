import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Image, Linking, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RFValue } from 'react-native-responsive-fontsize';
import { ICON_ADD, ICON_GAME, ICON_HOME, ICON_QUEST, ICON_SEARCH } from '../../assets/icons';
import { AppTheme } from '../config';
import { AppContactsSearch, AppFollowersAndFollowingList, AppSettingsScreen, BlockedAccounts, ChangePasswordScreen, ChatWindow, CreatePost, DataPolicyScreen, DeleteAccount, EditUserProfileScreen, GameDetailsScreen, HomeScreen, InboxScreen, NotificationScreen, OmegaStoreTabs, PersonalInformationScreen, PostDetailScreenWithComments, QuestScreen, RateGameScreen, RequestVerificationScreen, ReviewsScreen, SearchScreen, TermsAndConditions, UserProfileCustomizeScreen, UserProfileScreen } from '../screens';
import { UserSavedPosts } from '../screens/dashboard/UserSavedPosts';
import { requestPushNotificationPermission } from '../services';
import { DynamicLinkHelper } from '../utils/AppHelperMethods';
import { CustomDrawer } from './CustomDrawer';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DashboardTabsExtra({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          const ICON_SIZE = RFValue(32);
          const ICON_STYLE = { height: RFValue(ICON_SIZE), width: RFValue(ICON_SIZE) };
          if (route.name === 'Home')
            return (<Image source={ICON_HOME} style={[ICON_STYLE, focused ? { tintColor: AppTheme.colors.primary } : null]} />);
          else if (route.name === 'Search')
            return <Image source={ICON_SEARCH} style={[ICON_STYLE, focused ? { tintColor: AppTheme.colors.primary } : null]} />;
          else if (route.name === 'Creat')
            return (
              <TouchableOpacity style={{ height: '100%', justifyContent: 'center', alignItems: 'center', width: '100%' }} onPress={() => navigation.navigate("CreatePost")} >
                <FastImage source={ICON_ADD} style={[ICON_STYLE]} />
              </TouchableOpacity>
            )
          else if (route.name === 'Reviews')
            return <Image source={ICON_GAME} style={[ICON_STYLE, focused ? { tintColor: AppTheme.colors.primary } : null]} />;
          else if (route.name === 'Quests')
            return <Image source={ICON_QUEST} style={[ICON_STYLE, focused ? { tintColor: AppTheme.colors.primary } : null]} />;
        }
      })}
      tabBarOptions={{
        style: {
          height: RFValue(50),
          // paddingTop: RFValue(10)
        },
        showLabel: false,
        activeBackgroundColor: AppTheme.colors.darkGrey,
        inactiveBackgroundColor: AppTheme.colors.darkGrey,
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Creat"  >
        {() => <></>}
      </Tab.Screen>
      <Tab.Screen name="Reviews" component={ReviewsScreen} />
      <Tab.Screen name="Quests" component={QuestScreen} />
    </Tab.Navigator>
  );
}

const DrawerDashboardTabsExtra = ({ navigation }) => {
  React.useEffect(() => {
    Linking.addEventListener('url', (link) => {
      DynamicLinkHelper(navigation, link);
    });
    Linking.getInitialURL().then(link => {
      DynamicLinkHelper(navigation, link);
    }).catch(err => {
      console.log('----------ERROR LINK GETTING INITIAL URL DEEP LINK----------', err)
    })
    return () => {
      Linking.removeEventListener('url', (link) => {
        DynamicLinkHelper(navigation, link);
      });
    }
  }, [])
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawer {...props} />}
      drawerStyle={{ width: '85%' }}
    >
      <Drawer.Screen name="Home" component={DashboardTabsExtra} />
      <Drawer.Screen name="UserProfileCustomizeScreen" component={UserProfileCustomizeScreen} />
      <Drawer.Screen name="OmegaStore" component={OmegaStoreTabs} />
      <Drawer.Screen name="UserSavedPosts" component={UserSavedPosts} />
      <Drawer.Screen name="AppSettingsScreen" component={AppSettingsScreen} />
      <Drawer.Screen name="TermsAndConditions" component={TermsAndConditions} />
    </Drawer.Navigator>
  )
}

const DashboardTabs = () => {
  React.useEffect(() => {
    requestPushNotificationPermission();
  }, [])
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
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
      <Stack.Screen name="EditUserProfileScreen" component={EditUserProfileScreen} />
      <Stack.Screen name="UserProfileCustomizeScreen" component={UserProfileCustomizeScreen} />
    </Stack.Navigator>
  );
};

export { DashboardTabs };
