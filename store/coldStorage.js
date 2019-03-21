import {AsyncStorage} from 'react-native';


const storeAsync = async (key, value) => {
    try {
        await AsyncStorage.setItem(`@HelloGames:${key}`, value);
    } catch (error) {
        console.log(error)
    }
};

const retrieveAsync = async (key) => {
    try {
        const value = await AsyncStorage.getItem(`@HelloGames:${key}`);
        if (value !== null)
            return value
        return false
    } catch (error) {
        console.log(error)
    }
};


export {
    storeAsync,
    retrieveAsync
}