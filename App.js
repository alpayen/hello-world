import {createAppContainer, createStackNavigator} from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import SingleGame from "./screens/SingleGame";

import React from "react";
import {connect, Provider} from "react-redux";

import {store} from "./store/index"

import {fetchInitialGameState} from "./store/actions";

let RootStack = createStackNavigator({
    Home: HomeScreen,
    SingleGame: SingleGame,
});

let Navigation = createAppContainer(RootStack);


export default class App extends React.Component{
    componentDidMount() {
        fetchInitialGameState()
    }

    render() {
        return (
            <Provider store={store}>
                <Navigation/>
            </Provider>

        );
    }
}


