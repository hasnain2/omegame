import React, {useState, useEffect} from 'react';
import {View, Pressable, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {MentionInput} from 'react-native-controlled-mentions';
import {GetUserList} from '../../../services/profileService';
import {useSelector, useDispatch} from 'react-redux';
import {setSuggestions} from '../../../redux/reducers/suggestionsSlice';
import {setQuery} from '../../../redux/reducers/querySlice';
import {UserAvatar, AppText} from '../../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {replaceMentionValues} from 'react-native-controlled-mentions';
import {DEFAULT_REQ} from '../../../../assets/images';
import EditComment from '../EditComment';
const SkelPlaceHolder = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item width={60} height={60} borderRadius={50} />
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item marginTop={6} width={80} height={20} borderRadius={4} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
const getPlainString = ({string}) => {};
const RenderSuggestions = ({keyword, onSuggestionPress, suggestions, loading, selectedContent, setSelectedContent}) => {
  if (keyword == null) {
    return null;
  }

  return (
    <>
      {loading ? (
        <View style={{position: 'absolute', bottom: 40, left: 0, width: '100%', backgroundColor: 'black'}}>
          <SkelPlaceHolder />
          <SkelPlaceHolder />
          <SkelPlaceHolder />
          <SkelPlaceHolder />
        </View>
      ) : (
        <View style={{position: 'absolute', bottom: 40, left: 0, width: '100%', backgroundColor: 'black'}}>
          {suggestions
            .filter((one) => one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
            .map((item) => (
              <TouchableOpacity
                key={item.id}
                style={{zIndex: 5}}
                onPress={() => {
                  setSelectedContent({id: item.id});
                  onSuggestionPress(item);
                }}>
                <View style={{}}>
                  <View style={{flexDirection: 'row'}}>
                    <UserAvatar
                      corner={item?.corner || ''}
                      color={item?.cornerColor}
                      source={item?.pic ? {uri: item?.pic} : DEFAULT_REQ}
                      size={50}
                    />
                    <View style={{flex: 1, paddingLeft: RFValue(10), justifyContent: 'center'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <AppText bold={true} size={1} color={'white'}>
                          {item?.firstName || item?.userName}
                        </AppText>
                      </View>
                    </View>
                  </View>
                  {/* <Text style={{color: 'red'}}>{item.name}</Text> */}
                </View>
              </TouchableOpacity>
            ))}
        </View>
      )}
    </>
  );
};
const CustomMention = ({placeholder, setSeletedValue, value, selected, setSelectedContent, editModal, editComment}) => {
  let dispatch = useDispatch();
  const [listUser, setUser] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState([]);
  const renderMentionSuggestions = (suggestions) => {
    renderSuggestions({suggestions: listUser, keyword: value.substring(1)});
  };
  function getUserList(cursor) {
    setLoading(true);
    GetUserList(
      (response) => {
        if (response) {
          let suggestions = [];
          response?.data.map((item, index) => {
            let temp = [],
              temp1 = [];
            if (selected.length > 0) {
              temp = selected.filter((newItem) => newItem.id === item._id);
            }
            console.log('Edit Comment');
            console.log(editComment);
            // console.log(editComment);
            // if (editComment?.mentions?.length > 0) {
            //   temp1 = editComment?.mentions.filter((newItem) => newItem._id === item._id);
            // }
            if (temp.length === 0) {
              suggestions.push({
                id: item._id,
                name: item.userName,
                corner: item.corner,
                cornerColor: item.cornerColor,
                pic: item.pic,
                firstName: item.firstName,
                userName: item.userName,
              });
            }
          });
          //newSuggestions = suggestions;
          setLoading(!loading);
          setUser(suggestions);
          dispatch(setSuggestions(suggestions));
        }
      },
      10,
      'DESC',
      query,
      '',
    );
  }

  useEffect(() => {
    getUserList(false);
  }, [query]);
  return (
    // <View
    // style={{
    //   width: '80%',
    //   position: 'absolute',
    //   bottom: 20,
    //   // height: RFValue(40),
    //   borderColor: 'white',
    //   borderWidth: 1,
    //   borderRadius: 50,
    //   paddingHorizontal: RFValue(10),
    //   // paddingLeft: RFValue(10),
    //   // paddingRight: RFValue(10),
    //   flexDirection: 'row',
    //   alignSelf: 'center',
    // }}>
    // <View style={{flex: 1}}>
    <MentionInput
      placeholder={placeholder ? placeholder : 'Type a message'}
      placeholderTextColor="white"
      value={value}
      onChange={(e) => {
        setSeletedValue(e);
        let newStr = e.split('@');
        setQuery(newStr[newStr.length - 1]);
      }}
      style={{color: 'white', flex: 1, zIndex: 1}}
      partTypes={[
        {
          trigger: '@', // Should be a single character like '@' or '#'
          renderSuggestions: (props) => (
            <RenderSuggestions
              {...props}
              suggestions={listUser}
              loading={loading}
              selectedContent={selected}
              setSelectedContent={setSelectedContent}
            />
          ),
          textStyle: {fontWeight: 'bold', color: 'blue'}, // The mention style in the input
        },
      ]}
    />
    //   </View>
    //   <View
    //     style={{
    //       color: 'blue',
    //       justifyContent: 'center',
    //       backgroundColor: 'green',
    //       // flex: 1,
    //     }}>
    //     <AppText>Send</AppText>
    //   </View>
    // </View>
  );
};
export default CustomMention;
