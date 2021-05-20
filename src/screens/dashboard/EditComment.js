import React, {useState} from 'react';
import moment from 'moment';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
    AppInputToolBar,
    AppButton,
    AppModal,
    AppText,
    IsUserVerifiedCheck,
  } from '../../components';
import {UserAvatar} from '../../components/UserAvatar';
import {AppTheme} from '../../config';
const EditComment = ({item, editModal, showEditModal, navigation})=>{
    const [text, setText]= useState(item?.text || '')
    return(
        <View>
        <AppModal show={editModal}
            toggle={() => {
              showEditModal(!editModal);
            }}>
            <View style={{ width: '80%', backgroundColor: 'black'}}>
            <View style={{flexDirection: 'row'}}>
            <View>
            <UserAvatar
              onPress={() => {
                if (item?.createdBy?._id)
                  navigation.navigate('UserProfileScreen', {
                    userID: item?.createdBy?._id,
                  });
              }}
              corner={item?.createdBy?.corner || ''}
              color={item?.createdBy?.cornerColor}
              source={item?.createdBy?.pic ? {uri: item?.createdBy?.pic} : DEFAULT_USER_PIC}
              size={50}
            />
            </View>
            <View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  if (item?.createdBy?._id)
                    navigation.navigate('UserProfileScreen', {
                      userID: item?.createdBy?._id,
                    });
                }}>
                <View style={{paddingLeft: RFValue(10), paddingTop: RFValue(10)}}>
                  <View style={{flexDirection: 'row', alignItems: 'center', width:RFValue(100)}}>
                    <AppText bold={true} size={1} color={AppTheme.colors.lightGrey}>
                      {item?.createdBy?.firstName || item?.createdBy?.userName}
                    </AppText>
                    <IsUserVerifiedCheck check={item?.createdBy?.isVerified} />
                    <AppText size={1} bold={true} color={AppTheme.colors.primary} style={{paddingLeft: RFValue(5)}}>
                      {item?.createdBy?.level}
                    </AppText>
                    <AppText size={1} color={AppTheme.colors.lightGrey} style={{flex: 1}}>
                      {' '}
                      - {moment(item?.createdAt || new Date()).fromNow(true)}
                    </AppText>

                    <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
                      {/* <Image source={ICON_MENU} style={{ tintColor: 'white', height: RFValue(30), width: RFValue(30), padding: RFValue(15) }} /> */}
                    </TouchableOpacity>
                  </View>
                  <AppText size={1} color={AppTheme.colors.lightGrey}>
                    {item?.createdBy?.userName}
                  </AppText>
                </View>
              </TouchableOpacity>
            </View>
          </View>
            <TextInput placeholder={item?.text} value={text} onChange={(val)=>{setText(val)}} style={{color: 'white', paddingVertical: 20}}>
            </TextInput>
            <AppButton
              bgColor={'#1b1b1b'}
              label={'Edit Comment'}
              onPress={() => {
                setState((prev) => ({...prev, showFilter: false}));
              }}
            />
            </View>
            </AppModal>
        </View>
    )
}
export default EditComment;