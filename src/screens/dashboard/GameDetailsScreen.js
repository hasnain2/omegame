import moment from 'moment';
import React, {useEffect, useState, useRef} from 'react';
import {Dimensions, Image, Linking, ScrollView, TouchableOpacity, View, Alert} from 'react-native';
import FastImage from 'react-native-fast-image';
import {FlatList} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {ICON_SHOP, ICON_EDIT} from '../../../assets/icons';
import {BACKGROUND_IMG} from '../../../assets/images';
import {AppBackButton, AppButton, AppText, IsUserVerifiedCheck} from '../../components';
import {UserAvatar} from '../../components/UserAvatar';
import {AppTheme} from '../../config';
import {setGameReviews} from '../../redux/reducers/gameReviewsSlice';
import {GetGameReviews, PostGameReview, DeleteUserReview} from '../../services/gamesService';
import {HandleNaN, largeNumberShortify} from '../../utils/AppHelperMethods';
import {MaterialIcons} from '../../utils/AppIcons';
import {AntDesign, Feather} from '../../utils/AppIcons';
import { AppShowToast} from '../../utils/AppHelperMethods';
import {useScrollToTop} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';

const GameDetailsScreen = ({navigation, route}) => {
  const flatListRef = useRef(null);
  const dispatch = useDispatch();
  let gameData = route?.params?.gameData;
  useScrollToTop(flatListRef);

  const {gameReviews, user} = useSelector((state) => state.root);
  const [state, setState] = useState({
    loading: true,
    selectedSortType: 'RECENT',
    showBuyModal: false,
  });
  const TRANS_BLACK = 'rgba(0,0,0,0.0)';
  const BLACK = 'black';
  const COLORS_ARR = [
    AppTheme.colors.darkGrey,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    TRANS_BLACK,
    BLACK,
    BLACK,
  ];

  function getgamereviewshelper(cursor, filter) {
    setState({...state, loading: true});
    GetGameReviews(
      (reviewsRes) => {
        if (reviewsRes) {
          dispatch(setGameReviews(reviewsRes));
          setState((prev) => ({...prev, loading: false}));
        } else {
          setState((prev) => ({...prev, loading: false}));
        }
      },
      0,
      filter,
      gameData._id,
    );
  }

  useEffect(() => {
    getgamereviewshelper(0, 'RECENT');
  }, []);

  const removePressHandler = (id) => {
    Alert.alert('Remove Rating', 'Are you sure?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Remove', onPress: () => removeRating(id)},
    ]);
  };

  const removeRating = (id) => {
    DeleteUserReview((res) => {
      if (res) {
        console.log('Succcess');
        let allReviews = [...gameReviews];
        const filtered = allReviews.filter((item) => item._id !== id);
        dispatch(setGameReviews(filtered));
      } else {
        console.log('error');
      }
    }, id);
  };

  return (
    <View
      style={{flex: 1, backgroundColor: 'black'}}
      onLayout={(event) => {
        var {x, y, width, height} = event.nativeEvent.layout;
        setState((prev) => ({...prev, LHeight: height, LWidth: width}));
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0.3)',
          height: RFValue(56),
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}>
        <AppBackButton navigation={navigation} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={{flex: 1}}
          onPress={() => {
            Linking.openURL(gameData?.referralLink || '');
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={ICON_SHOP}
              style={{
                height: RFValue(30),
                width: RFValue(30),
                tintColor: AppTheme.colors.yellow,
              }}
            />
            <AppText size={2} style={{paddingLeft: RFValue(15), color: AppTheme.colors.yellow}}>
              Buy it now!
            </AppText>
          </View>
        </TouchableOpacity>
        <View style={{flex: 0.3}} />
      </View>
      <ScrollView style={{flex: 1}} decelerationRate={0} nestedScrollEnabled={false}>
        <View style={{height: state.LHeight, width: state.LWidth}}>
          <FastImage
            source={gameData?.background?.url ? {uri: gameData?.background?.url} : BACKGROUND_IMG}
            style={{height: state.LHeight, width: state.LWidth}}>
            <LinearGradient
              colors={COLORS_ARR}
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <UserAvatar
                corner={gameData?.corner || ''}
                color={false}
                source={gameData?.background?.url ? {uri: gameData?.background?.url} : BACKGROUND_IMG}
                size={140}
              />

              <View
                style={{
                  flexDirection: 'row',
                  paddingHorizontal: RFValue(10),
                  paddingVertical: RFValue(10),
                  justifyContent: 'space-between',
                }}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    <AppText size={2} color={AppTheme.colors.lightGrey} style={{}}>
                      Name:
                    </AppText>
                    <AppText size={3} color={'white'} style={{}}>
                      {' '}
                      {gameData?.name}
                    </AppText>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <AppText size={2} color={AppTheme.colors.lightGrey} style={{}}>
                      devices:
                    </AppText>
                    <AppText size={1} color={AppTheme.colors.text} style={{}}>
                      {' '}
                      {gameData?.supportedDevices.map((ii) => (ii + ', ').toUpperCase())}
                    </AppText>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <AppText size={2} color={AppTheme.colors.lightGrey} style={{}}>
                      Release date:
                    </AppText>
                    <AppText size={1} color={AppTheme.colors.text} style={{}}>
                      {' '}
                      {moment(gameData?.releaseDate).format('DD MMMM YYYY')}
                    </AppText>
                  </View>
                </View>
                <View
                  style={{
                    borderRadius: RFValue(5),
                    borderWidth: 1,
                    justifyContent: 'center',
                    padding: RFValue(10),
                    alignItems: 'center',
                    borderColor: AppTheme.colors.green,
                  }}>
                  <AppText size={1} color={'white'} bold={true} style={{}}>
                    RATE
                  </AppText>
                  <AppText
                    size={4}
                    color={
                      (gameData?.computed[0]?.value || 0) / (gameData?.computed[1]?.value || 1) > 5 ? 'green' : 'red'
                    }
                    bold={true}>
                    {HandleNaN((gameData?.computed[0]?.value || 0) / (gameData?.computed[1]?.value || 1)).toFixed(2)}
                  </AppText>
                </View>
              </View>
            </LinearGradient>
          </FastImage>
        </View>
        <View style={{flexDirection: 'row', paddingLeft: RFValue(10)}}>
          <AppText size={2} color={AppTheme.colors.lightGrey} style={{}}>
            Suggested price:
          </AppText>
          <AppText size={2} style={{paddingBottom: RFValue(20)}} color={AppTheme.colors.text}>
            {' '}
            {gameData?.price || '0'} $
          </AppText>
        </View>

        <View style={{paddingLeft: RFValue(10)}}>
          {gameData.genre ? (
            <View style={{flexDirection: 'row'}}>
              <AppText size={2} color={AppTheme.colors.lightGrey} style={{paddingVertical: RFValue(10)}}>
                Genre:
              </AppText>
              <AppText size={2} color={AppTheme.colors.text} style={{paddingVertical: RFValue(10)}}>
                {' '}
                {gameData?.genre}
              </AppText>
            </View>
          ) : null}
        </View>

        <View style={{padding: RFValue(10)}}>
          <AppButton
            label={'RATE THIS GAME'}
            onPress={() => {
              let counter = 0;
              gameReviews.map((item, index)=>{
                if(item.createdBy._id === user._id){
                  counter = counter + 1;
                }
              })
              if(counter>0){
                AppShowToast("You have already rated for this game.");
              }else{
                navigation.navigate('RateGameScreen', {gameData});
              }
              
            }}
            bgColor={'black'}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: RFValue(10),
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{flex: 1, margin: RFValue(3)}}
            onPress={() => {
              getgamereviewshelper(0, 'RECENT');
              setState((prev) => ({
                ...prev,
                loading: true,
                selectedSortType: 'RECENT',
              }));
            }}>
            <View
              style={{
                borderRadius: 90,
                borderWidth: state.selectedSortType === 'RECENT' ? 1 : 0,
                borderColor: AppTheme.colors.lightGrey,
                flex: 1,
                paddingVertical: RFValue(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AppText size={2} color={AppTheme.colors.lightGrey}>
                Recent
              </AppText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{flex: 1, margin: RFValue(3)}}
            onPress={() => {
              getgamereviewshelper(0, 'LOWEST');
              setState((prev) => ({
                ...prev,
                loading: true,
                selectedSortType: 'LOWEST',
              }));
            }}>
            <View
              style={{
                borderRadius: 90,
                borderWidth: state.selectedSortType === 'LOWEST' ? 1 : 0,
                borderColor: AppTheme.colors.lightGrey,
                flex: 1,
                paddingVertical: RFValue(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AppText size={2} color={AppTheme.colors.lightGrey}>
                Lowest
              </AppText>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={{flex: 1, margin: RFValue(3)}}
            onPress={() => {
              getgamereviewshelper(0, 'HIGHEST');
              setState((prev) => ({
                ...prev,
                loading: true,
                selectedSortType: 'HIGHEST',
              }));
            }}>
            <View
              style={{
                borderRadius: 90,
                borderWidth: state.selectedSortType === 'HIGHEST' ? 1 : 0,
                borderColor: AppTheme.colors.lightGrey,
                flex: 1,
                paddingVertical: RFValue(10),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AppText size={2} color={AppTheme.colors.lightGrey}>
                Highest
              </AppText>
            </View>
          </TouchableOpacity>
        </View>
        {state.loading?<ActivityIndicator color={'#00bbff'} size={'small'} />:null}

        <View >
          <FlatList
            ref={flatListRef}
            data={gameReviews}
            initialNumToRender={2}
            windowSize={2}
            decelerationRate={0}
            nestedScrollEnabled={true}
            keyExtractor={(ii) => ii?._id}
            //removeClippedSubviews={true}
            maxToRenderPerBatch={2}
            //bounces={false}
            keyExtractor={(ii) => (ii._id || '') + 'you'}
            renderItem={({item, index}) => (
              <View
                style={{
                  padding: RFValue(15),
                  borderBottomWidth: 0.3,
                  borderBottomColor: '#213A57',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingBottom: RFValue(15),
                  }}>
                  <UserAvatar
                    corner={item?.createdBy?.corner || ''}
                    color={item?.createdBy?.cornerColor}
                    onPress={() => {
                      if (item?.createdBy?._id)
                        navigation.navigate('UserProfileScreen', {
                          userID: item?.createdBy?._id,
                        });
                    }}
                    source={item?.createdBy?.pic ? {uri: item?.createdBy?.pic} : false}
                  />

                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={{flex: 1, justifyContent: 'center'}}
                    onPress={() => {
                      if (item?.createdBy?._id)
                        navigation.navigate('UserProfileScreen', {
                          userID: item?.createdBy?._id,
                        });
                    }}>
                    <View style={{paddingLeft: RFValue(14)}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AppText bold={true} size={1} color={AppTheme.colors.lightGrey}>
                          {item?.createdBy?.firstName || item?.createdBy?.userName}
                        </AppText>
                        <IsUserVerifiedCheck check={item?.createdBy?.isVerified} />
                        <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{paddingLeft: RFValue(5)}}>
                          {largeNumberShortify(item?.createdBy?.level)}
                        </AppText>
                      </View>
                      <AppText size={1} color={AppTheme.colors.lightGrey}>
                        {item?.createdBy?.userName}
                      </AppText>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{
                      borderColor: item?.ratings > 5 ? AppTheme.colors.green : 'red',
                      borderWidth: 1,
                      paddingHorizontal: RFValue(25),
                      paddingVertical: RFValue(10),
                      borderRadius: RFValue(15),
                      flexDirection: 'row'
                    }}>
                    <View>
                    <AppText size={1} style={{textAlign: 'center'}}>
                      {item?.devices[0]}
                    </AppText>
                    
                    <AppText
                      size={3}
                      style={{textAlign: 'center'}}
                      color={item?.ratings > 5 ? AppTheme.colors.green : 'red'}>
                      {parseFloat(item?.ratings || 0)?.toFixed(2)}
                    </AppText>
                    </View>
                    <View>
                    <AppText>
                    {item?.createdBy?._id === user._id ?
                    <TouchableOpacity onPress={()=>{
                      navigation.navigate('RateGameScreen', {gameData, item});
                    }}>
                    <Image
                      source={ICON_EDIT}
                      style={{
                      height: RFValue(15),
                      width: RFValue(15),
                      tintColor: AppTheme.colors.white,
                      marginLeft: RFValue(5)
              }}
            />
                  </TouchableOpacity>:null  
                    }
                    </AppText>
                    </View>
                  </View>
                </View>
                <AppText size={2}>{item?.feedback}</AppText>
                <AppText size={1} color={AppTheme.colors.lightGrey} style={{paddingTop: RFValue(10)}}>
                  {moment(item?.createdAt).format('DD MMM YYYY')}
                </AppText>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export {GameDetailsScreen};
