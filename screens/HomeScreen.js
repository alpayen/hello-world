import React from 'react'
import {Animated, ScrollView, View, TouchableOpacity} from "react-native";
import {Icon, ListItem, Text} from "react-native-elements";
import {connect} from "react-redux";
import {globalStyles} from "../style";


import {fetchAll, fetchById} from "../store/actions"


const mapStateToProps = (state) => {
    return {
        games: state.gamesState.games,
        loading: state.gamesState.loading,
        current_game: state.gamesState.current_game
    }
};

class HomeScreen extends React.Component {
    static navigationOptions = {
        header:null
    }
    state = {
        fadeAnim: new Animated.Value(0)
    };

    async componentDidMount() {
        try {
            await fetchAll();
            Animated.timing(
                this.state.fadeAnim,
                {
                    toValue: 1,
                    duration: 300
                }
            ).start()
        } catch (e) {
            console.log(e)
        }
    }


    render() {
        let {fadeAnim} = this.state;

        const {navigate} = this.props.navigation;
        const {games, current_game} = this.props;
        const lastGame = Object.entries(current_game).length === 0 && current_game.constructor === Object ?
            null : (
                <TouchableOpacity
                    onPress={() => navigate("SingleGame", {game_id: current_game.id})}
                    style={{...globalStyles.paddedItem, ...styles.lastSelectedGame}}>
                    <Text style={{...globalStyles.paddedItemTitle}}>
                        Last Game : {current_game.name}
                    </Text>
                </TouchableOpacity>
            );

        return (
            <ScrollView style={globalStyles.mainContainer}>
                <View style={styles.title}>
                    <Icon
                        name='videogame-asset'
                        color='#393939'
                        size={50}
                        style={styles.icon}
                    />
                    <Text h2 style={styles.titleText}>Hello Games</Text>
                </View>

                {lastGame}

                <Animated.View style={{
                    ...globalStyles.listContainer,
                    opacity: fadeAnim
                }}>

                    {games.map((game, i) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => navigate("SingleGame", {game_id: game.id})}
                            style={globalStyles.paddedItem}>
                            <Text style={globalStyles.paddedItemTitle}>
                                {game.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </Animated.View>
            </ScrollView>
        )
    }
}


export default connect(mapStateToProps)(HomeScreen)

const styles = {

    title: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },

    titleText:{
        color:"#393939"
    },


    icon: {
        marginRight: 5
    },

    lastSelectedGame: {
        backgroundColor: "#ff7f5b",
        borderColor: '#ff7f5b',
        marginBottom: 40
    }
};