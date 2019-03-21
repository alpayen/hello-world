import React from 'react'
import {ActivityIndicator, View, Linking} from "react-native";
import {Button, Icon, Text} from "react-native-elements";
import {connect} from "react-redux";

import {fetchById} from "../store/actions"

const mapStateToProps = (state) => {
    return {
        current_game: state.gamesState.current_game,
        loading: state.gamesState.loading,
    }
};

class SingleGame extends React.Component {
    componentDidMount() {
        if (this.props.current_game.id !== this.props.navigation.getParam('game_id'))
            fetchById(this.props.navigation.getParam('game_id'));



    }

    static navigationOptions = {
        title: "Single",
    };

    render() {
        const {current_game, loading} = this.props
        if (current_game.name !== undefined && !loading) {
            return (
                <View style={styles.mainContainer}>
                    <Text h1>{current_game.name}</Text>
                    <Text h3>Players : {current_game.players}</Text>
                    <Text h3>Year : {current_game.year}</Text>
                    <Text h4>{current_game.description_en}</Text>
                    <Button
                        title="More info"
                        onPress={() => {
                            Linking.openURL(current_game.url)
                        }}
                    />
                </View>
            )
        } else {
            return (
                <View>
                    <ActivityIndicator/>
                </View>
            )
        }
    }
}


export default connect(mapStateToProps)(SingleGame)

const styles = {
    mainContainer: {
        flex: 1,
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"

    },
    title: {
        flex:3,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};