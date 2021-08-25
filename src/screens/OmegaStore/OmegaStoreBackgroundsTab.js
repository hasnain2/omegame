import * as React from 'react';
import {Dimensions, FlatList, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {useSelector} from 'react-redux';
import {AppButtonPlane, AppGoldCoin, AppModal, AppText, AppBlurView} from '../../components';
import {AppTheme} from '../../config/index';
import {AddAssetBackground} from '../../services';
import {BuyAsset, GetAllAssets} from '../../services/customizationService';
import {ASSET_TYPES} from '../../utils/AppConstants';
import {AppShowToast} from '../../utils/AppHelperMethods';
import {AntDesign} from '../../utils/AppIcons';
import {BlurView} from '@react-native-community/blur';
const NUMBER_OF_COLUMNS = 2;
const {height, width} = Dimensions.get('screen');

const OmegaStoreBackgroundsTab = ({navigation, showBlur, toggleBlur}) => {
  let [state, setState] = React.useState({
    isModalVisible: null,
    data: [],
  });
  let {myAssets} = useSelector((state) => state.root);
  const PADDING = RFValue(3);
  const CARD_WIDTH = Dimensions.get('screen').width / NUMBER_OF_COLUMNS - 7 * RFValue(NUMBER_OF_COLUMNS);
  const CARD_HEIGHT = CARD_WIDTH + RFValue(50);

  function getallassetshelper() {
    GetAllAssets((allAssetsRes) => {
      if (allAssetsRes) {
        setState((prev) => ({...prev, data: allAssetsRes}));
      }
    }, ASSET_TYPES.BACKGROUND);
  }

  React.useEffect(() => {
    getallassetshelper();
  }, []);

  const isPurchased =
    state?.isModalVisible?.isPurchased || !!myAssets?.backgrounds?.find((ii) => ii?._id === state?.isModalVisible?._id);
  return (
    <View style={{backgroundColor: 'black', flex: 1, padding: RFValue(2)}}>
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
                  borderColor: '#404040',
                  borderWidth: 0.8,
                  borderRadius: RFValue(10),
                  overflow: 'hidden',
                }}>
                <FastImage source={{uri: item?.attachment?.url}} style={{width: CARD_WIDTH, height: CARD_HEIGHT}} />
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderTopColor: AppTheme.colors.lightGrey,
                    padding: RFValue(15),
                  }}>
                  <AppText size={2}>{item.name}</AppText>

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
      <AppModal
        show={state.isModalVisible}
        toggle={() => {
          toggleBlur();
          setState((prev) => ({...prev, isModalVisible: null}));
        }}>
        {state.isModalVisible ? (
          <View style={{height: '75%'}}>
            <View
              style={{
                // width: Dimensions.get('screen').width - RFValue(36),
                margin: PADDING,
                borderRadius: RFValue(10),
                overflow: 'hidden',
                // backgroundColor: 'green',
              }}>
              <TouchableOpacity
                onPress={() => {
                  toggleBlur();
                  setState((prev) => ({...prev, isModalVisible: null}));
                }}>
                <AntDesign name="close" style={{fontSize: 30, color: 'white'}} />
              </TouchableOpacity>
              <FastImage
                source={{uri: state.isModalVisible?.attachment?.url}}
                style={{
                  width: Dimensions.get('screen').width - RFValue(30),
                  borderRadius: RFValue(10),
                  height: RFValue(350),
                }}
              />
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'black',
                  paddingTop: RFValue(10),
                }}>
                <AppText size={2}>{state.isModalVisible.name}</AppText>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: RFValue(10),
                  }}>
                  <AppGoldCoin />
                  <AppText size={2}> x {state.isModalVisible.priceInCoins}</AppText>
                </View>
                <View style={{paddingVertical: RFValue(10), marginBottom: RFValue(10)}}>
                  <AppButtonPlane
                    onPress={() => {
                      if (!isPurchased) {
                        toggleBlur();
                        setState((prev) => ({...prev, isModalVisible: null, loading: true}));
                        BuyAsset((buyAssetRes) => {
                          setState((prev) => ({...prev, loading: false}));
                          if (buyAssetRes) {
                            AddAssetBackground(state.isModalVisible);
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
          </View>
        ) : null}
      </AppModal>
    </View>
  );
};

export {OmegaStoreBackgroundsTab};
