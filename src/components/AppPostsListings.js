
import React, { useEffect, useState } from 'react';
import { FlatList, Platform, RefreshControl, View } from 'react-native';
import { PoolCard } from './PoolCard';
import { PostCard } from './PostCard';

let currentItemBeingUpdated = 0;

const AppPostsListings = ({ navigation, data, style, scrollPosition, loadMore, refreshing, autoPlay = true }) => {
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
            console.log('----------CURRENT INDEX--------', currentIndex)
            setState(prev => ({ ...prev, currentItemIndex: currentIndex }))

        }
    });

    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 80 })

    return (
        <View style={[{ flex: 1, backgroundColor: 'black' }, style ? style : null]}>
            <FlatList
                nestedScrollEnabled={true}
                onScroll={(e) => {
                    if (e?.nativeEvent?.contentOffset?.y) {
                        e.persist();
                        scrollPosition ? scrollPosition({ scroll: e?.nativeEvent?.contentOffset?.y, index: state.currentItemIndex }) : null
                    }
                }}
                data={data}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            if (loadMore)
                                loadMore(0, true)
                        }}
                    />
                }


                windowSize={Platform.OS === 'ios' ? 3 : 2}
                initialNumToRender={Platform.OS === 'ios' ? 10 : 3}
                maxToRenderPerBatch={Platform.OS === 'ios' ? 10 : 3}
                removeClippedSubviews={true}
                bounces={false}


                keyExtractor={ii => ii._id + 'you'}
                keyboardShouldPersistTaps={'always'}


                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}

                renderItem={({ item, index }) => {
                    if (item.postType === 'media')
                        return <PostCard key={'hello' + index} startPlaying={state.currentItemIndex === index && state.focused && autoPlay} navigation={navigation} item={item} index={index} />
                    else if (item.postType === 'voting')
                        return <PoolCard key={'hello' + index} startPlaying={state.currentItemIndex === index && state.focused && autoPlay} navigation={navigation} item={item} index={index} />
                    else
                        return <PostCard key={'hello' + index} startPlaying={state.currentItemIndex === index && state.focused && autoPlay} navigation={navigation} item={item} index={index} />
                }}
            />

        </View>
    );
};

export { AppPostsListings };
