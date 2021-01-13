
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Platform, RefreshControl, View } from 'react-native';
import { AppLoadingView } from './AppLoadingView';
import { AppNoDataFound } from './AppNoDataFound';
import { PoolCard } from './PoolCard';
import { PostCard } from './PostCard';
import { useScrollToTop } from '@react-navigation/native';
const AppPostsListings = ({ navigation, loading, data, style, loadMore, refreshing, autoPlay = true }) => {
    const flatListRef = useRef(null);
    let [state, setState] = useState({
        showMenu: '',
        currentItemIndex: 0,
        focused: true
    });
    useScrollToTop(flatListRef);
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
    }, [])
    const onViewRef = React.useRef((viewableItems) => {
        if (viewableItems && viewableItems?.changed?.length > 0) {
            let currentIndex = viewableItems?.changed[0]?.index;
            setState(prev => ({ ...prev, currentItemIndex: currentIndex }))

        }
    });

    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 70 })

    return (
        <View style={[{ flex: 1, backgroundColor: 'black' }, style ? style : null]}>
            {!loading && data.length < 1 ?
                <AppNoDataFound />
                : null}

            {loading ?
                <AppLoadingView />
                : null}
            <FlatList
                ref={flatListRef}
                nestedScrollEnabled={true}
                data={data}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        tintColor={'white'}
                        onRefresh={() => {
                            if (loadMore)
                                loadMore(0, true)
                        }}
                    />
                }
                windowSize={Platform.OS === 'ios' ? 3 : 2}
                initialNumToRender={2}
                maxToRenderPerBatch={2}
                // removeClippedSubviews={true}
                // bounces={false}

                keyExtractor={ii => ii?._id + 'you'}
                keyboardShouldPersistTaps={'always'}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                onEndReached={() => {
                    if (loadMore) {
                        loadMore(data[data.length - 1]?._id, false)
                    }
                }}
                onEndReachedThreshold={0.5}
                renderItem={({ item, index }) => {
                    if (item?.postType === 'media')
                        return <PostCard key={'PostCard' + index} startPlaying={state.currentItemIndex === index && state.focused && autoPlay} navigation={navigation} item={item} index={index} />
                    else if (item?.postType === 'voting')
                        return <PoolCard key={'PoolCard' + index} startPlaying={state.currentItemIndex === index && state.focused && autoPlay} navigation={navigation} item={item} index={index} />
                    else
                        return <PostCard key={'PostCard' + index} startPlaying={state.currentItemIndex === index && state.focused && autoPlay} navigation={navigation} item={item} index={index} />
                }}
            />
        </View>
    );
};

export { AppPostsListings };
