
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { AppTheme } from '../config';
import { MOCKUP_POSTS } from '../mockups/Mockups';
import { AppBoxCard } from './AppBoxCard';
import { AppModal } from './AppModal';
import { PostCard } from './PostCard';

let currentItemBeingUpdated = 0;
const { height, width } = Dimensions.get('screen')
let POST_DATA = null;
const NUMBER_OF_COLUMNS = 3;
const AppPostsListingsGrid = ({ navigation, data, style }) => {
    const PADDING = RFValue(2);
    const CARD_SIZE = Dimensions.get('screen').width / NUMBER_OF_COLUMNS - (PADDING * RFValue(2))

    let [state, setState] = useState({
        currentItemIndex: 0,
        focused: true,
        showPost: false,
    })

    useEffect(() => {
        const unsubscribeFocusListner = navigation.addListener('focus', () => {
            setState(prev => ({ ...prev, focused: true }))
        });
        const unsubscribeBlur = navigation.addListener('blur', () => {
            setState(prev => ({ ...prev, focused: false }))
        });

        return () => {
            unsubscribeFocusListner();
            unsubscribeBlur();
        }
    })

    const onViewRef = React.useRef((viewableItems) => {
        if (viewableItems && viewableItems?.changed?.length > 0) {
            let currentIndex = viewableItems?.changed[0]?.index;
            if (currentIndex != state.currentItemIndex && currentIndex != currentItemBeingUpdated) {
                setState(prev => ({ ...prev, currentItemIndex: currentIndex }))
                currentItemBeingUpdated = currentIndex;
            }
        }
    });

    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 60 })

    return (
        <View style={[{ paddingTop: RFValue(10), backgroundColor: AppTheme.colors.background }, style ? style : null]}>
            <FlatList
                data={data || MOCKUP_POSTS}
                numColumns={NUMBER_OF_COLUMNS}
                style={{ flex: 1, backgroundColor: 'red' }}

                windowSize={2}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                removeClippedSubviews={true}
                bounces={false}

                keyboardShouldPersistTaps={'always'}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}

                keyExtractor={ii => ii.id + 'you'}
                renderItem={({ item, index }) => (
                    <TouchableOpacity activeOpacity={0.7} onPress={() => {
                        POST_DATA = item;
                        setState(prev => ({ ...prev, showPost: true }))
                    }}>
                        <View style={{ padding: PADDING }}>
                            <AppBoxCard item={item} startPlaying={false} navigation={navigation} size={CARD_SIZE} />
                        </View>
                    </TouchableOpacity>
                )}
            />

            <AppModal show={state.showPost} toggle={() => setState(prev => ({ ...prev, showPost: false }))}>
                <View style={{ width }}>
                    <PostCard item={POST_DATA} startPlaying={true} navigation={navigation} onMenuPress={() => { }} likePress={() => { }} bookmarkPress={() => { }} />
                </View>
            </AppModal>

        </View>
    );
};

export { AppPostsListingsGrid };
