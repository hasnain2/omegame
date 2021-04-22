import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, TextInput, TouchableOpacity, View} from 'react-native';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import {BACKGROUND_IMG} from '../../../assets/images';
import {
  AppBackButton,
  AppButton,
  AppCustomSlider,
  AppModal,
  AppRadioButton,
  AppText,
  UserAvatar,
} from '../../components';
import {AppTheme} from '../../config';
import {MOCK_CONSOLE_TYPES} from '../../mockups/Mockups';
import {setGameReviews} from '../../redux/reducers/gameReviewsSlice';
import {store} from '../../redux/store';
import {PostGameReview} from '../../services/gamesService';
import {EditReview} from '../../services/gamesService';
import {AppLogger, AppShowToast} from '../../utils/AppHelperMethods';
import {AntDesign} from '../../utils/AppIcons';
const NUMBER_OF_COLUMNS = 2;
const RateGameScreen = ({navigation, route}) => {
  let gameData = route?.params?.gameData;
  let reviewData = route?.params?.item;
  let userReview = route?.params?.userReview;

  let [state, setState] = useState({
    loading: false,
    reviewText: reviewData?.feedback ||'',
    rating: reviewData?.ratings || 5,
    selectedConsole: reviewData?.devices[0] || 'Ps4',
    showFilter: false,
  });
  const {user} = useSelector((state) => state.root);

  useEffect(() => {
    if (userReview) {
      const {feedback, ratings, devices} = userReview;
      setState({
        reviewText: feedback,
        rating: ratings,
        selectedConsole: reviewData?.devices[0] || 'Ps4',
      });
    }
  }, [route.params]);

  const onSubmit = () => {
    if (state.reviewText.trim()) {
      setState((prev) => ({...prev, loading: true}));
      PostGameReview(
        (postReviewRes) => {
          if (postReviewRes) {
            let allReviews = [...store.getState().root.gameReviews];

            allReviews.unshift({...postReviewRes, createdBy: user});
            store.dispatch(setGameReviews(allReviews));
          }
          setState((prev) => ({...prev, loading: false}));
          if (postReviewRes) {
            navigation.goBack();
          }
        },
        {
          feedback: state.reviewText.trim(),
          ratings: state.rating,
          devices: [state.selectedConsole],
          gameId: gameData?._id,
        },
      );
    } else {
      AppShowToast('kindly provide feedback');
    }
  };
  const onEdit = ()=>{
    setState((prev) => ({...prev, loading: true}));
    EditReview((res)=>{
      setState((prev) => ({...prev, loading: false}));
      if(res){
        let allReviews = [...store.getState().root.gameReviews];
        let clone = JSON.parse(JSON.stringify(allReviews));
        let devices = [];
        devices.push(state.selectedConsole);
        clone.map((item,index)=>{
          if(item._id === reviewData?._id){
            clone[index].ratings = state.rating;
            clone[index].feedback= state.reviewText.trim();
            clone[index].devices = devices;
          }
        })
        store.dispatch(setGameReviews(clone));
        navigation.navigate('GameDetailsScreen', {gameData: gameData});
      }else{
        AppShowToast("Something went wrong, Please try again")
      }
    },reviewData?._id,{
      feedback: state.reviewText.trim(),
      ratings: state.rating,
      console: [state.selectedConsole],
      gameId: gameData?._id,
    })
  }
  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <AppBackButton navigation={navigation} />
      </View>

      <KeyboardAvoidingScrollView>
        <View style={{flexDirection: 'row', alignItems: 'center', padding: RFValue(15)}}>
          <UserAvatar
            corner={gameData?.corner || ''}
            color={gameData?.cornerColor}
            source={gameData?.background?.url ? {uri: gameData?.background?.url} : BACKGROUND_IMG}
            size={50}
          />

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: RFValue(15),
              paddingVertical: RFValue(10),
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 1, justifyContent: 'center'}}>
              <AppText size={3} color={'white'} bold={true} style={{}}>
                {gameData?.name}
              </AppText>
              <AppText size={2} color={AppTheme.colors.lightGrey} style={{}}>
                {gameData?.supportedDevices.map((ii) => (ii + ', ').toUpperCase())}
              </AppText>
              <AppText size={1} color={AppTheme.colors.lightGrey} style={{}}>
                Release date: {moment(gameData?.releaseDate).format('DD MMMM YYYY')}
              </AppText>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setState((prev) => ({...prev, showFilter: true}));
          }}>
          <View style={{padding: RFValue(15), borderBottomColor: AppTheme.colors.lightGrey, borderBottomWidth: 0.4}}>
            <AppText size={3} color={'white'} style={{}}>
              Choose the console you wish to rate:
            </AppText>
            <AppText size={3} color={AppTheme.colors.primary} bold={true} style={{paddingTop: RFValue(10)}}>
              {state.selectedConsole}
            </AppText>
          </View>
        </TouchableOpacity>

        <View style={{padding: RFValue(15), borderBottomColor: AppTheme.colors.lightGrey, borderBottomWidth: 0.4}}>
          <AppText size={3} color={'white'} style={{}}>
            How much did you like this game?
          </AppText>
          <AppText
            size={3}
            bold={true}
            color={state.rating > 5 ? AppTheme.colors.green : AppTheme.colors.red}
            style={{textAlign: 'right'}}>
            {state.rating.toFixed(2)}
          </AppText>
          <AppCustomSlider
            rating={state.rating}
            onChange={(val) => {
              AppLogger('-------RATING-------', val);
              setState((prev) => ({...prev, rating: val}));
            }}
          />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center', padding: RFValue(20)}}>
          <UserAvatar
            corner={user?.corner || ''}
            color={user?.cornerColor}
            source={user?.pic ? {uri: user.pic} : DEFAULT_USER_PIC}
            size={40}
          />
          <TextInput
            placeholder={'Let us know what do you think about this game...'}
            placeholderTextColor={AppTheme.colors.lightGrey}
            multiline={true}
            value={state.reviewText}
            blurOnSubmit={true}
            style={{flex: 1, color: 'white', height: '100%', maxHeight: RFValue(200), marginLeft: RFValue(10)}}
            onChangeText={(val) => {
              setState((prev) => ({...prev, reviewText: val}));
            }}
          />
        </View>
      </KeyboardAvoidingScrollView>
      <View style={{padding: RFValue(15), paddingTop: 0}}>
        {reviewData?
        <AppButton bgColor="black" onPress={onEdit} label={'EDIT THIS REVIEW'} />:
        <AppButton bgColor="black" onPress={onSubmit} label={'RATE THIS GAME'} />
        }
      </View>

      <AppModal
        show={state.showFilter}
        toggle={() => {
          setState((prev) => ({...prev, showFilter: !state.showFilter}));
        }}>
        <View
          style={{backgroundColor: '#1b1b1b', padding: RFValue(15), width: '85%', maxHeight: '90%', borderRadius: 15}}>
          <AntDesign
            onPress={() => setState((prev) => ({...prev, showFilter: false}))}
            name="close"
            style={{fontSize: RFValue(25), padding: RFValue(5), textAlign: 'right', color: 'white'}}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setState((prev) => ({...prev, visibleFilter: state.visibleFilter !== 'console' ? 'console' : ''}));
            }}>
            <View
              style={{
                borderBottomWidth: 0.4,
                borderBottomColor: AppTheme.colors.lightGrey,
                paddingBottom: RFValue(15),
              }}>
              <AppText size={2}>Console:</AppText>
              <AppText size={2} color={AppTheme.colors.primary} style={{paddingTop: RFValue(10)}}>
                {state.selectedConsole}
              </AppText>
            </View>
          </TouchableOpacity>
          {state.visibleFilter === 'console' ? (
            <FlatList
              data={MOCK_CONSOLE_TYPES.slice(1, 50)}
              initialNumToRender={2}
              windowSize={2}
              removeClippedSubviews={true}
              maxToRenderPerBatch={2}
              bounces={false}
              keyExtractor={(ii) => (ii._id || '') + 'you'}
              numColumns={NUMBER_OF_COLUMNS}
              renderItem={({item, index}) => (
                <View style={{flex: 1, paddingVertical: RFValue(6)}}>
                  <AppRadioButton
                    val={state.selectedConsole === item.name}
                    onPress={() => {
                      setState((prev) => ({...prev, selectedConsole: item.name}));
                    }}
                    size={20}
                    label={item.name}
                  />
                </View>
              )}
            />
          ) : null}

          <View style={{paddingTop: RFValue(20)}}>
            <AppButton
              bgColor={'#1b1b1b'}
              label={'SELECT'}
              onPress={() => {
                setState((prev) => ({...prev, showFilter: false}));
              }}
            />
          </View>

          <AppText
            onPress={() => {
              setState((prev) => ({...prev, selectedConsole: 'Ps4', showFilter: false}));
            }}
            color={AppTheme.colors.red}
            size={2}
            style={{paddingTop: RFValue(20), paddingBottom: RFValue(10), textAlign: 'center'}}>
            Reset
          </AppText>
        </View>
      </AppModal>
    </View>
  );
};

export {RateGameScreen};
