import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Divider} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {DEFAULT_USER_PIC} from '../../../assets/images';
import {
  AppButton,
  AppLoadingView,
  AppModal,
  AppNoDataFound,
  AppRadioButton,
  AppSearchBar,
  AppText,
  AppBlurView,
} from '../../components';
import {UserAvatar} from '../../components/UserAvatar';
import {AppTheme} from '../../config';
import {MOCK_CONSOLE_TYPES, MOCK_GENRE_TYPES, MOCK_RELEASEDATE_TYPES} from '../../mockups/Mockups';
import {GetGamesList} from '../../services/gamesService';
import {
  AppLogger,
  GetCurrentDate,
  GetLastMonthEndOf,
  GetLastMonthStartOf,
  GetLastWeekEndOf,
  GetLastWeekStartOf,
  HandleNaN,
  GetLastYearEndOf,
  GetLastYearStartOf,
} from '../../utils/AppHelperMethods';
import {AntDesign, MaterialIcons} from '../../utils/AppIcons';
import {BlurView} from '@react-native-community/blur';
const NUMBER_OF_COLUMNS = 2;
const ReviewsScreen = ({navigation}) => {
  let [state, setState] = useState({
    loading: true,
    searchTerm: '',
    offset: 0,
    showFilter: false,
    showBlur: false,
    visibleFilter: '',
    selectedConsoleTypes: [],
    selectedGenreTypes: [],
    releaseDate: 'All time',
    data: [],
  });

  function getgameshelper(offset, query) {
    GetGamesList(
      (gamesRes) => {
        if (gamesRes) {
          setState((prev) => ({...prev, loading: false, data: gamesRes}));
        } else {
          setState((prev) => ({...prev, loading: false}));
        }
      },
      offset,
      query,
    );
  }

  useEffect(() => {
    getgameshelper(false, {});
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{padding: RFValue(10)}}>
        <AppSearchBar
          onChangeText={(val) => {
            let tempObj = {
              from:
                state.releaseDate === 'Newest'
                  ? GetLastMonthStartOf()
                  : state.releaseDate === 'Past week'
                  ? GetLastWeekStartOf()
                  : state.releaseDate === 'Past month'
                  ? GetLastMonthStartOf()
                  : state.releaseDate === 'Past year'
                  ? GetLastYearStartOf()
                  : GetLastYearStartOf(),
              to:
                state.releaseDate === 'Newest'
                  ? GetCurrentDate()
                  : state.releaseDate === 'Past week'
                  ? GetLastWeekEndOf()
                  : state.releaseDate === 'Past month'
                  ? GetLastMonthEndOf()
                  : state.releaseDate === 'Past year'
                  ? GetLastYearEndOf()
                  : GetCurrentDate(),
            };
            if (state.selectedConsoleTypes.length > 0) tempObj['console'] = state.selectedConsoleTypes;

            if (state.selectedGenreTypes.length > 0) tempObj['genre'] = state.selectedGenreTypes;

            if (val) tempObj['search'] = val;
            getgameshelper(false, tempObj);
            setState((prev) => ({...prev, searchTerm: val}));
          }}
          onRightPess={() => {
            setState((prev) => ({...prev, showFilter: true, showBlur: true}));
          }}
          type="review"
        />
      </View>
      {state.loading ? <AppLoadingView /> : null}
      {!state.loading && state.data?.length < 1 ? <AppNoDataFound /> : null}
      <View style={{flex: 1}}>
        <FlatList
          data={state.data}
          initialNumToRender={10}
          windowSize={3}
          // removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          // bounces={false}
          keyExtractor={(ii) => (ii._id || '') + 'you'}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  navigation.navigate('GameDetailsScreen', {gameData: item});
                }}>
                <>
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      padding: RFValue(10),
                      alignItems: 'center',
                      borderBottomWidth: 0.9,
                      borderBottomColor: '#1A1A1A',
                    }}>
                    <UserAvatar
                      corner={item?.corner || ''}
                      color={item?.cornerColor}
                      source={item?.profile?.url ? {uri: item?.profile?.url} : DEFAULT_USER_PIC}
                      size={55}
                      type="review"
                    />
                    <View style={{paddingLeft: RFValue(10), flex: 1}}>
                      <AppText size={3} bold={true}>
                        {item.name}
                      </AppText>
                      <AppText size={2} color={AppTheme.colors.lightGrey}>
                        {item.supportedDevices.map((ii) => (ii + ', ').toUpperCase())}
                      </AppText>
                      <AppText size={0} color={AppTheme.colors.lightGrey}>
                        Release Date: {moment(item.releaseDate).format('DD MMMM YYYY')}
                      </AppText>
                    </View>
                    <AppText
                      size={2}
                      color={
                        (item?.computed[0]?.value || 0) / (item?.computed[1]?.value || 1) < 5
                          ? AppTheme.colors.red
                          : AppTheme.colors.green
                      }>
                      {HandleNaN((item?.computed[0]?.value || 0) / (item?.computed[1]?.value || 0))?.toFixed(2) || 0}
                    </AppText>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      style={{
                        fontSize: RFValue(18),
                        paddingLeft: RFValue(10),
                        color: '#1A1A1A',
                      }}
                    />
                  </View>
                </>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {state.showBlur ? (
        <BlurView
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
          reducedTransparencyFallbackColor="gray"
          blurType="light"
          blurAmount={1}
        />
      ) : null}
      <AppModal
        show={state.showFilter}
        toggle={() => {
          setState((prev) => ({...prev, showFilter: !state.showFilter, showBlur: !state.showBlur}));
        }}>
        <View
          style={{
            backgroundColor: 'black',
            padding: RFValue(15),
            width: '85%',
            maxHeight: '90%',
            borderRadius: 15,
          }}>
          <AntDesign
            onPress={() => setState((prev) => ({...prev, showFilter: false, showBlur: false}))}
            name="close"
            style={{
              fontSize: RFValue(25),
              padding: RFValue(5),
              textAlign: 'right',
              color: 'white',
            }}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setState((prev) => ({
                ...prev,
                visibleFilter: state.visibleFilter !== 'console' ? 'console' : '',
              }));
            }}>
            <View
              style={{
                paddingBottom: RFValue(15),
              }}>
              <AppText size={2}>Console:</AppText>
              <AppText size={2} color={AppTheme.colors.primary} style={{paddingTop: RFValue(10)}}>
                {state.selectedConsoleTypes.length > 0
                  ? state.selectedConsoleTypes.map((ii) => ii + '; ')
                  : 'Select Console'}
              </AppText>
            </View>
          </TouchableOpacity>
          {state.visibleFilter === 'console' ? (
            <FlatList
              data={MOCK_CONSOLE_TYPES}
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
                    val={state.selectedConsoleTypes.find((i) => i === item.name)}
                    onPress={() => {
                      let tempArr = state.selectedConsoleTypes;
                      if (tempArr.find((i) => i === item.name)) {
                        let tempInd = tempArr.findIndex((r) => r === item.name);
                        if (tempInd >= 0) tempArr.splice(tempInd, 1);
                      } else {
                        tempArr.push(item.name);
                      }
                      setState((prev) => ({
                        ...prev,
                        selectedConsoleTypes: tempArr,
                      }));
                      let tempObj = {
                        from:
                          state.releaseDate === 'Newest'
                            ? GetLastMonthStartOf()
                            : state.releaseDate === 'Past week'
                            ? GetLastWeekStartOf()
                            : state.releaseDate === 'Past month'
                            ? GetLastMonthStartOf()
                            : state.releaseDate === 'Past year'
                            ? GetLastYearStartOf()
                            : GetLastYearStartOf(),
                        to:
                          state.releaseDate === 'Newest'
                            ? GetCurrentDate()
                            : state.releaseDate === 'Past week'
                            ? GetLastWeekEndOf()
                            : state.releaseDate === 'Past month'
                            ? GetLastMonthEndOf()
                            : state.releaseDate === 'Past year'
                            ? GetLastYearEndOf()
                            : GetCurrentDate(),
                      };
                      if (tempArr.length > 0) tempObj['Console'] = tempArr;

                      if (state.selectedGenreTypes.length > 0) tempObj['genre'] = state.selectedGenreTypes;

                      if (state.searchTerm) tempObj['search'] = state.searchTerm;
                      console.log(tempObj);
                      getgameshelper(false, tempObj);

                      AppLogger('', state.selectedConsoleTypes);
                    }}
                    size={20}
                    label={item.name}
                  />
                </View>
              )}
            />
          ) : null}
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#262626',
            }}></View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setState((prev) => ({
                ...prev,
                visibleFilter: state.visibleFilter !== 'genre' ? 'genre' : '',
              }));
            }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#262626',
                paddingVertical: RFValue(15),
              }}>
              <AppText size={2}>Genre:</AppText>
              <AppText size={2} color={AppTheme.colors.primary} style={{paddingTop: RFValue(10)}}>
                {state.selectedGenreTypes.length > 0 ? state.selectedGenreTypes.map((ii) => ii + '; ') : 'Select Genre'}
              </AppText>
            </View>
          </TouchableOpacity>
          {state.visibleFilter === 'genre' ? (
            <FlatList
              data={MOCK_GENRE_TYPES}
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
                    val={state.selectedGenreTypes.find((i) => i === item.name)}
                    onPress={() => {
                      let tempArr = state.selectedGenreTypes;
                      if (tempArr.find((i) => i === item.name)) {
                        let tempInd = tempArr.findIndex((r) => r === item.name);
                        if (tempInd >= 0) tempArr.splice(tempInd, 1);
                      } else {
                        tempArr.push(item.name);
                      }
                      setState((prev) => ({
                        ...prev,
                        selectedGenreTypes: tempArr,
                      }));

                      let tempObj = {
                        from:
                          state.releaseDate === 'Newest'
                            ? GetLastMonthStartOf()
                            : state.releaseDate === 'Past week'
                            ? GetLastWeekStartOf()
                            : state.releaseDate === 'Past month'
                            ? GetLastMonthStartOf()
                            : state.releaseDate === 'Past year'
                            ? GetLastYearStartOf()
                            : GetLastYearStartOf(),
                        to:
                          state.releaseDate === 'Newest'
                            ? GetCurrentDate()
                            : state.releaseDate === 'Past week'
                            ? GetLastWeekEndOf()
                            : state.releaseDate === 'Past month'
                            ? GetLastMonthEndOf()
                            : state.releaseDate === 'Past year'
                            ? GetLastYearEndOf()
                            : GetCurrentDate(),
                      };
                      if (state.selectedConsoleTypes.length > 0) tempObj['console'] = state.selectedConsoleTypes;

                      if (tempArr.length > 0) tempObj['genre'] = tempArr;

                      if (state.searchTerm) tempObj['search'] = state.searchTerm;
                      getgameshelper(false, tempObj);

                      AppLogger('', state.selectedGenreTypes);
                    }}
                    size={20}
                    label={item.name}
                  />
                </View>
              )}
            />
          ) : null}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setState((prev) => ({
                ...prev,
                visibleFilter: state.visibleFilter !== 'releasedate' ? 'releasedate' : '',
              }));
            }}>
            <View style={{paddingVertical: RFValue(15), borderBottomColor: '#262626'}}>
              <AppText size={2}>Release date:</AppText>
              <AppText size={2} color={AppTheme.colors.primary} style={{paddingTop: RFValue(10)}}>
                {state.releaseDate}
              </AppText>
            </View>
          </TouchableOpacity>

          {state.visibleFilter === 'releasedate' ? (
            <FlatList
              data={MOCK_RELEASEDATE_TYPES}
              numColumns={NUMBER_OF_COLUMNS}
              initialNumToRender={2}
              windowSize={2}
              removeClippedSubviews={true}
              maxToRenderPerBatch={2}
              bounces={false}
              keyExtractor={(ii) => (ii._id || '') + 'you'}
              renderItem={({item, index}) => (
                <View style={{flex: 1, paddingVertical: RFValue(6)}}>
                  <AppRadioButton
                    val={state.releaseDate === item.name}
                    onPress={() => {
                      setState((prev) => ({...prev, releaseDate: item.name}));

                      let tempObj = {
                        from:
                          item.name === 'Newest'
                            ? GetLastMonthStartOf()
                            : item.name === 'Past week'
                            ? GetLastWeekStartOf()
                            : item.name === 'Past month'
                            ? GetLastMonthStartOf()
                            : item.name === 'Past year'
                            ? GetLastYearStartOf()
                            : GetLastYearStartOf(),
                        to:
                          item.name === 'Newest'
                            ? GetCurrentDate()
                            : item.name === 'Past week'
                            ? GetLastWeekEndOf()
                            : item.name === 'Past month'
                            ? GetLastMonthEndOf()
                            : item.name === 'Past year'
                            ? GetLastYearEndOf()
                            : GetCurrentDate(),
                      };
                      if (state.selectedConsoleTypes.length > 0) tempObj['console'] = state.selectedConsoleTypes;

                      if (state.selectedGenreTypes.length > 0) tempObj['genre'] = state.selectedGenreTypes;

                      if (state.searchTerm) tempObj['search'] = state.searchTerm;
                      getgameshelper(false, tempObj);
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
              label={'START'}
              onPress={() => {
                setState((prev) => ({...prev, showFilter: false}));
              }}
            />
          </View>

          <AppText
            onPress={() => {
              setState((prev) => ({
                ...prev,
                selectedConsoleTypes: [],
                selectedGenreTypes: [],
                releaseDate: 'All time',
              }));
              getgameshelper(false, {});
            }}
            color={AppTheme.colors.red}
            size={2}
            style={{
              paddingTop: RFValue(20),
              paddingBottom: RFValue(10),
              textAlign: 'center',
            }}>
            Reset
          </AppText>
        </View>
      </AppModal>
    </View>
  );
};

export {ReviewsScreen};
