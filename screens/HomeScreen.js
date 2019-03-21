import React from 'react'
import {ActivityIndicator, ScrollView, View} from "react-native";
import {Divider, Icon, ListItem, Text} from "react-native-elements";
import {connect} from "react-redux";

import {fetchAll} from "../store/actions"


const mapStateToProps = (state) => {
    return {
        games: state.gamesState.games,
        loading: state.gamesState.loading,
        last_selected_game: state.gamesState.last_selected_game
    }
};

class HomeScreen extends React.Component {
    componentDidMount() {
        fetchAll();
    }

    render() {
        const {navigate} = this.props.navigation;
        const {loading, games, last_selected_game} = this.props;
        const gamesList =
            loading ?
                (<ActivityIndicator size="large" color="#000"/>) :
                games.map((game, i) => (
                    <ListItem
                        key={i}
                        title={game.name}
                        onPress={() => navigate('SingleGame', {game_id: game.id})}
                        chevron

                    />
                ));

        return (
            <ScrollView style={styles.mainContainer}>
                <View style={styles.title}>
                    <Icon
                        name='videogame-asset'
                        color='#000'
                        size={50}
                    />
                    <Text h2>Hello Games</Text>
                </View>

                <View styles={styles.listContainer}>
                    {gamesList}
                </View>

                <View styles={styles.lastSelectedGameContainer}>
                    <Text h4 styles={styles.title}>{last_selected_game}</Text>
                </View>
            </ScrollView>
        )
    }
}


export default connect(mapStateToProps)(HomeScreen)

const styles = {
    mainContainer: {

    },
    title: {
        height:"20%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    listContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lastSelectedGameContainer:{
        height:"20%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    lastSelectedGame:{
        textAlign: "center",
        color: "#a02e36"
    }
};