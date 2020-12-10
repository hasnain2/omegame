
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { MOCKUP_POSTS } from '../mockups/Mockups';
import { PoolCard } from './PoolCard';
import { PostCard } from './PostCard';

let currentItemBeingUpdated = 0;

const AppPostsListings = ({ navigation, data, style, scrollPosition, autoPlay = true }) => {
    let [state, setState] = useState({
        showMenu: '',
        currentItemIndex: 0,
        focused: true
    });

    useEffect(() => {
        console.log('---------rendering APP POST LISTING--------')
        const unsubscribeFocusListner = navigation.addListener('focus', () => {
            setState(prev => ({ ...prev, focused: true }))
        });
        const unsubscribeBlur = navigation.addListener('blur', () => {
            setState(prev => ({ ...prev, focused: false }))
        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return () => {
            unsubscribeFocusListner();
            unsubscribeBlur();
        }
    }, [])
    const onViewRef = React.useRef((viewableItems) => {
        if (viewableItems && viewableItems?.changed?.length > 0) {
            let currentIndex = viewableItems?.changed[0]?.index;
            if (currentIndex != state.currentItemIndex && currentIndex != currentItemBeingUpdated) {
                setState(prev => ({ ...prev, currentItemIndex: currentIndex }))
                currentItemBeingUpdated = currentIndex;
                if (scrollPosition) {
                    scrollPosition({ index: currentIndex })
                }
            }
        }
    });

    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 60 })

    return (
        <View style={[{ flex: 1, backgroundColor: 'black' }, style ? style : null]}>
            <FlatList
                onScroll={(e) => {
                    if (e?.nativeEvent?.contentOffset?.y) {
                        e.persist();
                        scrollPosition ? scrollPosition({ scroll: e?.nativeEvent?.contentOffset?.y, index: state.currentItemIndex }) : null
                    }
                }}
                data={data || MOCKUP_POSTS}



                windowSize={Platform.OS === 'ios' ? 3 : 2}
                initialNumToRender={Platform.OS === 'ios' ? 10 : 3}
                maxToRenderPerBatch={Platform.OS === 'ios' ? 10 : 3}
                removeClippedSubviews={true}
                bounces={false}


                keyExtractor={ii => ii._id  + 'you'}
                keyboardShouldPersistTaps={'always'}


                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}

                renderItem={({ item, index }) => {
                    if (item.postType === 'media')
                        return <PostCard key={'hello' + index} startPlaying={state.currentItemIndex === index && state.focused && autoPlay} navigation={navigation} item={item} index={index}
                            onMenuPress={() => { setState(prev => ({ ...prev, showMenu: item })) }} />
                    else if (item.postType === 'voting')
                        return <PoolCard key={'hello' + index} startPlaying={state.currentItemIndex === index && state.focused && autoPlay} navigation={navigation} item={item} index={index}
                            onMenuPress={() => { setState(prev => ({ ...prev, showMenu: item })) }} />
                    else
                        return <PostCard key={'hello' + index} startPlaying={state.currentItemIndex === index && state.focused && autoPlay} navigation={navigation} item={item} index={index}
                            onMenuPress={() => { setState(prev => ({ ...prev, showMenu: item })) }} />
                }}
            />


        </View>
    );
};

const styles = StyleSheet.create({
    modalListItemStyle: { flexDirection: 'row', alignItems: 'center', padding: RFValue(10), paddingHorizontal: RFValue(20) },
    modalIconStyle: { fontSize: RFValue(25), flex: 0.15, color: 'white' },
})

export { AppPostsListings };
