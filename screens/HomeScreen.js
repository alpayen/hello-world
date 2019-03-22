import React from 'react'
import {Animated, ScrollView, View} from "react-native";
import {Icon, ListItem, Text} from "react-native-elements";
import {connect} from "react-redux";


import {fetchAll, fetchById} from "../store/actions"


const mapStateToProps = (state) => {
    return {
        games: state.gamesState.games,
        loading: state.gamesState.loading,
        last_selected_game: state.gamesState.last_selected_game,
        current_game: state.gamesState.current_game
    }
};

class HomeScreen extends React.Component {

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

    async _fetchAndNavigate(id) {

        try {
            if (this.props.current_game.id !== id) {
                await fetchById(id);
            }
            this.props.navigation.navigate('SingleGame')
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let {fadeAnim} = this.state;

        const {navigate} = this.props.navigation;
        const {games, last_selected_game} = this.props;
        const gamesList = games.map((game, i) => (
            <ListItem
                key={i}
                title={game.name}
                onPress={() => this._fetchAndNavigate(game.id)}
                chevron

            />
        ));

        return (
            <Animated.ScrollView style={{
                ...styles.mainContainer,
                opacity: fadeAnim
            }}>
                <View style={styles.title}>
                    <Icon
                        name='videogame-asset'
                        color='#000'
                        size={50}
                        style={styles.icon}
                    />
                    <Text h2>Hello Games</Text>
                </View>

                <View style={styles.listContainer}>
                    {gamesList}
                </View>

                <View style={styles.lastSelectedGameContainer}>
                    <Text h4 style={styles.lastSelectedGame}>{last_selected_game}</Text>
                </View>
            </Animated.ScrollView>
        )
    }
}


export default connect(mapStateToProps)(HomeScreen)

const styles = {
    mainContainer: {},
    title: {
        height: "20%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        marginRight: 5
    },
    lastSelectedGameContainer: {
        height: "20%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    lastSelectedGame: {

        textAlign: "center",
        color: "#a02e36"
    }
};