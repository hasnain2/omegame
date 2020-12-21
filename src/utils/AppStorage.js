import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, data) => await AsyncStorage.setItem(key, JSON.stringify(data))
const getData = (key, callback) => {
    AsyncStorage.getItem(key).then(res => {
        if (res) {
            callback(JSON.parse(res))
        } else
            callback(false)
    })
};
const clearStorage = async () => await AsyncStorage.clear();

const removeItemsFromLocalStorage = async (keys) => {
    keys.forEach(async key => {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch (exception) {
            return false;
        }
    });
}

export { storeData, getData, clearStorage, removeItemsFromLocalStorage }