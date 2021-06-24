import * as React from 'react';
import {Dimensions, ScrollView, FlatList, TouchableOpacity, View} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {useDispatch, useSelector} from 'react-redux';
import {DEFAULT_USER_PIC} from '../../../../assets/images';
import {AppButtonPlane, AppGoldCoin, AppModal, AppText} from '../../../components';
import {UserAvatar} from '../../../components/UserAvatar';
import {AppTheme} from '../../../config';
import {setMyAssets} from '../../../redux/reducers/myAssetsSlice';
import {setUser} from '../../../redux/reducers/userSlice';
import {store} from '../../../redux/store';
import {GetMyAssets, PromtToSetAsDefault} from '../../../services/customizationService';
import {ASSET_TYPES, COLORS, COLOR_BUBBLE_SIZE} from '../../../utils/AppConstants';
import {RemoveDuplicateObjectsFromArray} from '../../../utils/AppHelperMethods';
import {AntDesign, Ionicons} from '../../../utils/AppIcons';
import {storeData} from '../../../utils/AppStorage';
const NUMBER_OF_COLUMNS = 4;
const CustomizeCornersTab = ({navigation}) => {
  let {myAssets, user} = useSelector((state) => state.root);
  console.log(myAssets.corners);
  const dispatch = useDispatch();
  let [state, setState] = React.useState({
    loading: true,
    isModalVisible: null,
    selectedColor: '#ff1a4a',
  });
  const PADDING = RFValue(3);
  const CARD_WIDTH = Dimensions.get('screen').width / NUMBER_OF_COLUMNS - PADDING * RFValue(2);

  function getmyassetshelper() {
    GetMyAssets((cornersRes) => {
      if (cornersRes) {
        dispatch(setMyAssets({corners: RemoveDuplicateObjectsFromArray(cornersRes)}));
      }
      setState((prev) => ({...prev, loading: false}));
    }, ASSET_TYPES.CORNER);
  }
  React.useEffect(() => {
    getmyassetshelper();
  }, []);

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
                  height: COLOR_BUBBLE_SIZE,
                  width: COLOR_BUBBLE_SIZE,
                  margin: RFValue(10),
                  backgroundColor: itm,
                  borderRadius: 90,
                }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={{padding: RFValue(10)}}>
        <FlatList
          data={[...myAssets.corners, {addMore: true}]}
          extraData={state.selectedColor}
          numColumns={NUMBER_OF_COLUMNS}
          style={{flex: 1, width: '100%', height: '100%'}}
          initialNumToRender={2}
          windowSize={2}
          // removeClippedSubviews={true}
          maxToRenderPerBatch={2}
          // bounces={false}
          keyExtractor={(ii) => (ii._id || '') + 'you'}
          renderItem={({item, index}) => {
            if (item.addMore)
              return (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={{padding: RFValue(5)}}
                  onPress={() => {
                    navigation.navigate('OmegaStore', {name: 'Corners'});
                  }}>
                  <View
                    style={{
                      width: RFValue(CARD_WIDTH / 1.35),
                      height: RFValue(CARD_WIDTH / 1.35),
                      borderRadius: 100,
                      borderWidth: 1,
                      paddingLeft: RFValue(2.4),
                      borderColor: AppTheme.colors.primary,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons name="add" style={{fontSize: RFValue(30), color: '#1050F5'}} />
                  </View>
                </TouchableOpacity>
              );
            else
              return (
                <TouchableOpacity activeOpacity={0.7} style={{padding: RFValue(5)}}>
                  <UserAvatar
                    onPress={() => {
                      setState((prev) => ({...prev, loading: true}));
                      PromtToSetAsDefault(
                        (setCornerRes) => {
                          if (setCornerRes) {
                            let tempUser = {...store.getState().root.user};
                            tempUser.corner = item?.attachment?.url;
                            tempUser.cornerColor = state.selectedColor;
                            store.dispatch(setUser(tempUser));
                            storeData('user', tempUser);
                          }
                          setState((prev) => ({...prev, loading: false}));
                        },
                        ASSET_TYPES.CORNER,
                        item._id,
                        state.selectedColor,
                      );
                    }}
                    source={user?.pic ? {uri: user?.pic} : DEFAULT_USER_PIC}
                    corner={item?.attachment?.url}
                    color={state.selectedColor}
                    size={CARD_WIDTH / 1.35}
                  />
                </TouchableOpacity>
              );
          }}
        />
      </View>
      <AppModal show={state.isModalVisible} toggle={() => setState((prev) => ({...prev, isModalVisible: null}))}>
        {state.isModalVisible ? (
          <View style={{padding: RFValue(30)}}>
            <AntDesign
              name="close"
              onPress={() => setState((prev) => ({...prev, isModalVisible: null}))}
              style={{fontSize: RFValue(30), color: 'white', padding: RFValue(10)}}
            />
            <View
              style={{backgroundColor: 'black', borderRadius: RFValue(10), overflow: 'hidden', padding: RFValue(30)}}>
              {/* <FastImage source={state.isModalVisible.image} style={{ width: Dimensions.get('screen').width - RFValue(20), height: '80%' }} /> */}
              <View style={{justifyContent: 'center', paddingVertical: RFValue(30), alignItems: 'center'}}>
                <UserAvatar
                  source={{uri: state.isModalVisible?.attachment?.url}}
                  color={state.selectedColor}
                  size={110}
                />
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
                <AppText size={2}>{state.isModalVisible.name}</AppText>

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
                    if (!state.isModalVisible.isPurchased) setState((prev) => ({...prev, isModalVisible: null}));
                    else {
                      AppShowToast('You already own this item');
                    }
                  }}
                  label={'BUY'}
                />
              </View>
            </View>
          </View>
        ) : null}
      </AppModal>
    </View>
  );
};

export {CustomizeCornersTab};
