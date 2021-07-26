import * as React from 'react';
import {Dimensions, FlatList, ScrollView, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import {AppButtonPlane, AppGoldCoin, AppModal, AppText} from '../../components';
import {AppTheme} from '../../config';
import {AddAssetNickname} from '../../services';
import {BuyAsset, GetAllAssets} from '../../services/customizationService';
import {ASSET_TYPES} from '../../utils/AppConstants';
import {AppShowToast} from '../../utils/AppHelperMethods';
import {AntDesign} from '../../utils/AppIcons';
const NUMBER_OF_COLUMNS = 2;
const OmegaStoreNicknameTab = ({navigation, showBlur, toggleBlur}) => {
  let {user, myAssets} = useSelector((state) => state.root);
  let [state, setState] = React.useState({
    isModalVisible: null,
    selectedColor: '#ff1a4a',
    data: [],
  });
  const PADDING = RFValue(3);
  const CARD_WIDTH = Dimensions.get('screen').width / NUMBER_OF_COLUMNS - 7 * RFValue(NUMBER_OF_COLUMNS);
  const COLORS = ['#666666', '#ff1a4a', '#ffd949', '#00ff88', '#02eeff', '#0049ff', '#ff03f7'];
  const BUBBLE_SIZE = RFValue(25);

  function getallassetshelper() {
    GetAllAssets((nicknamesResponse) => {
      if (nicknamesResponse) {
        setState((prev) => ({...prev, data: nicknamesResponse}));
      }
    }, ASSET_TYPES.NICKNAME);
  }
  React.useEffect(() => {
    getallassetshelper();
  }, []);

  const isPurchased =
    state.isModalVisible?.isPurchased || !!myAssets?.nicknames?.find((ii) => ii?._id === state?.isModalVisible?._id);
  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <View style={{flexDirection: 'row', padding: RFValue(10)}}>
        {/* <FontAwesome name="paint-brush" style={{ fontSize: RFValue(20), margin: RFValue(10), color: '#02eeff' }} /> */}
        <ScrollView horizontal={true}>
          {COLORS.map((itm, indx) => (
            <TouchableOpacity
              key={`${indx}key`}
              activeOpacity={0.7}
              onPress={() => setState((prev) => ({...prev, selectedColor: itm}))}>
              <View
                style={{
                  height: BUBBLE_SIZE,
                  width: BUBBLE_SIZE,
                  margin: RFValue(10),
                  backgroundColor: itm,
                  borderRadius: 90,
                }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{flex: 1}}>
        <FlatList
          data={state.data}
          numColumns={NUMBER_OF_COLUMNS}
          initialNumToRender={2}
          windowSize={2}
          // removeClippedSubviews={true}
          maxToRenderPerBatch={2}
          // bounces={false}
          keyExtractor={(ii) => (ii?._id || '') + 'you'}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  toggleBlur();
                  setState((prev) => ({...prev, isModalVisible: item}));
                }}>
                <View
                  style={{
                    width: CARD_WIDTH,
                    margin: PADDING,
                    borderColor: AppTheme.colors.lightGrey,
                    borderWidth: 0.5,
                    borderRadius: RFValue(10),
                    overflow: 'hidden',
                  }}>
                  {/* <FastImage source={item.image} style={{ width: CARD_WIDTH, height: CARD_HEIGHT }} /> */}

                  <View style={{flex: 1, justifyContent: 'center', paddingVertical: RFValue(30), alignItems: 'center'}}>
                    <AppText size={2} color={AppTheme.colors.lightGrey}>
                      {user?.userName}
                    </AppText>
                    <AppText size={3} color={state.selectedColor}>
                      {item?.nickName}
                    </AppText>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTopWidth: 1,
                      borderTopColor: AppTheme.colors.lightGrey,
                      padding: RFValue(15),
                    }}>
                    <AppText size={2}>{item?.name}</AppText>

                    <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: RFValue(5)}}>
                      <AppGoldCoin />
                      <AppText size={2}> x {item.priceInCoins}</AppText>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <AppModal
        show={state.isModalVisible}
        toggle={() => {
          toggleBlur();
          setState((prev) => ({...prev, isModalVisible: null}));
        }}>
        {state.isModalVisible ? (
          <View style={{padding: RFValue(30)}}>
            <AntDesign
              name="close"
              onPress={() => {
                toggleBlur();
                setState((prev) => ({...prev, isModalVisible: null}));
              }}
              style={{fontSize: RFValue(30), color: 'white', padding: RFValue(10)}}
            />
            <View
              style={{backgroundColor: 'black', borderRadius: RFValue(10), overflow: 'hidden', padding: RFValue(30)}}>
              {/* <FastImage source={state.isModalVisible.image} style={{ width: Dimensions.get('screen').width - RFValue(20), height: '80%' }} /> */}

              <View style={{justifyContent: 'center', paddingVertical: RFValue(30), alignItems: 'center'}}>
                <AppText size={2} color={AppTheme.colors.lightGrey}>
                  Username
                </AppText>
                <AppText color={state.selectedColor}>{user?.userName}</AppText>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'black',
                  borderTopWidth: 1,
                  borderTopColor: 'grey',
                  padding: RFValue(15),
                }}>
                <AppText size={2}>{state.isModalVisible?.name}</AppText>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: RFValue(10),
                  }}>
                  <AppGoldCoin />
                  <AppText size={2}> x {state.isModalVisible.coins}</AppText>
                </View>
                <AppButtonPlane
                  onPress={() => {
                    if (!isPurchased) {
                      toggleBlur();
                      setState((prev) => ({...prev, isModalVisible: null, loading: true}));
                      BuyAsset((buyAssetRes) => {
                        setState((prev) => ({...prev, loading: false}));
                        if (buyAssetRes) {
                          AddAssetNickname(state.isModalVisible);
                        } else {
                          AppShowToast('You dont have enough coins');
                        }
                      }, state.isModalVisible?._id);
                    } else {
                      AppShowToast('You already own this background');
                    }
                  }}
                  label={isPurchased ? 'PURCHASED' : 'BUY'}
                />
              </View>
            </View>
          </View>
        ) : null}
      </AppModal>
    </View>
  );
};

export {OmegaStoreNicknameTab};
