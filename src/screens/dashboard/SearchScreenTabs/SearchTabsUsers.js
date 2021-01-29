

import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { AppUserListingWithFollowButtons } from '../../../components';
import { AppTheme } from '../../../config';
import { GetAllTrendingUsers } from '../../../services';
import { RemoveDuplicateObjectsFromArray } from '../../../utils/AppHelperMethods';

let enableReset = true;
let cursorArrUsers = [];
const SearchTabsUsers = ({ navigation }) => {
    const { query } = useSelector(state => state.root)
    let [state, setState] = useState({
        loading: false,
        loadingAllUsers: true, refreshingAllUsers: false,
        usersList: []
    });

    function getalltrendingusers(cursor, searchQuery) {
        let newQuery = searchQuery.split('&')
        let newQuery2 = newQuery.find(ii => ii.includes('search')) || '';

        if (!cursor)
            cursorArrUsers = [];

        if (!cursorArrUsers.includes(cursor)) {
            GetAllTrendingUsers((postResponse) => {
                if (postResponse && (postResponse.length || enableReset)) {
                    let tempData = postResponse;
                    setState(prev => ({ ...prev, loadingAllUsers: false, loading: false, refreshingAllUsers: false, usersList: RemoveDuplicateObjectsFromArray(tempData) }))
                } else {
                    setState(prev => ({ ...prev, loadingAllUsers: false, loading: false, refreshingAllUsers: false, }))
                }
            }, cursor, `${newQuery2}`)
        } else {
            setState(prev => ({ ...prev, refreshingAllUsers: false }))
        }
    }

    useEffect(() => {
        enableReset = true;
        cursorArrUsers = [];
        getalltrendingusers(false, query)
    }, [query])
    
    return (
        <View style={{ flex: 1 }}>
            <AppUserListingWithFollowButtons
                navigation={navigation}
                data={state.usersList}
                loading={state.loadingAllUsers}
                refreshing={state.refreshingAllUsers}
                loadMore={(cursor, refreshControl) => {
                    enableReset = false;
                    if (refreshControl) {
                        setState(prev => ({ ...prev, refreshingAllUsers: true }));
                        getalltrendingusers(false, query)
                    } else {
                        getalltrendingusers(cursor, query)
                    };
                }}
                style={{ backgroundColor: AppTheme.colors.background }} />
        </View>
    );
};


export { SearchTabsUsers };
