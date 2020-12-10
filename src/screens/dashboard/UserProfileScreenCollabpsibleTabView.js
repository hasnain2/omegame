import * as React from 'react';
import { StyleSheet, View, Text, Animated, Dimensions } from 'react-native';
import {
    CollapsibleTabView,
    useCollapsibleScene,
} from 'react-native-collapsible-tab-view';
import { SceneMap } from 'react-native-tab-view';
import { UserProfileExtras } from './UserProfileTabs/UserProfileExtras';
import { UserProfileGridPosts } from './UserProfileTabs/UserProfileGridPosts';
import { UserProfilePosts } from './UserProfileTabs/UserProfilePosts';
import { UserProfileReviews } from './UserProfileTabs/UserProfileReviews';

const HEADER_HEIGHT = 250;

const UserProfileScreen = ({ navigation }) => {

    const SomeRoute = ({
        routeKey,
        color,
    }) => {
        const scrollPropsAndRef = useCollapsibleScene(routeKey);

        return (
            <Animated.ScrollView
                style={{ backgroundColor: color, }}
                {...scrollPropsAndRef}
            >
                <View style={{ height: Dimensions.get('screen').height }}>
                    {routeKey === 'first' ?

                        <UserProfilePosts navigation={navigation} routeKey="first" color="white" />
                        : routeKey === 'second' ?
                            <UserProfileGridPosts navigation={navigation} routeKey="second" color="black" />
                            : routeKey === 'third' ?
                                <UserProfileReviews navigation={navigation} routeKey="third" color="black" />
                                : routeKey === 'fourth' ?
                                    <UserProfileExtras navigation={navigation} routeKey="fourth" color="black" />
                                    : null}
                </View>
            </Animated.ScrollView>
        );
    };

    const FirstScene = () => <SomeRoute navigation={navigation} routeKey="first" color="white" />;
    const SecondScene = () => <SomeRoute navigation={navigation} routeKey="second" color="black" />;
    const ThirdScene = () => <SomeRoute navigation={navigation} routeKey="third" color="black" />;
    const FourthScene = () => <SomeRoute navigation={navigation} routeKey="fourth" color="black" />;



    const renderHeader = () => (
        <View style={styles.header}>
            <Text style={styles.headerText}>COLLAPSIBLE</Text>
        </View>
    );

    const renderScene = SceneMap({
        first: FirstScene,
        second: SecondScene,
        third: ThirdScene,
        fourth: FourthScene,
    });


    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third' },
        { key: 'fourth', title: 'Fourth' },
    ]);

    const handleIndexChange = (index) => {
        setIndex(index);
    };

    return (
        <CollapsibleTabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={handleIndexChange}
            renderHeader={renderHeader} // optional
            headerHeight={HEADER_HEIGHT} // optional, will be computed.
        />
    );
};


const styles = StyleSheet.create({
    header: {
        height: HEADER_HEIGHT,
        backgroundColor: '#2196f3',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
    headerText: {
        color: 'white',
        fontSize: 24,
    },
    content: {
        height: 1500,
    },
});

export { UserProfileScreen }