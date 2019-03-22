import React from 'react'
import {StyleSheet, Animated, View, Linking, ScrollView, TouchableOpacity} from "react-native";
import {Text} from "react-native-elements";
import {connect} from "react-redux";

import {fetchById} from "../store/actions"
import {globalStyles} from "../style";

const mapStateToProps = (state) => {
    return {
        current_game: state.gamesState.current_game,
        loading: state.gamesState.loading,
    }
};

class SingleGame extends React.Component {

    static navigationOptions = {
        header: null,
    };

    state = {
        fadeAnim: new Animated.Value(0)
    };

    async componentDidMount() {
        try {
            if (this.props.current_game.id !== this.props.navigation.getParam('game_id')) {
                await fetchById(this.props.navigation.getParam('game_id'))
            }
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
        const {current_game} = this.props;
        let {fadeAnim} = this.state;
        return (
            <ScrollView style={{...globalStyles.mainContainer, ...styles.singleContainer, ...StyleSheet.absoluteFill}}>
                <TouchableOpacity
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                    style={globalStyles.backButton}>
                    <Text style={globalStyles.backButtonTitle}>
                        Go back
                    </Text>
                </TouchableOpacity>
                <Animated.View style={{height:"100%",opacity: fadeAnim}}>
                    <View style={globalStyles.paddedItem}>
                        <Text h4 style={globalStyles.paddedItemTitle}>{current_game.name}</Text>
                    </View>
                    <View style={globalStyles.textContainer}>
                        <Text style={globalStyles.textContainerText}><Text style={{fontWeight: "bold"}}>Players :</Text> {current_game.players}</Text>
                        <Text style={globalStyles.textContainerText}><Text style={{fontWeight: "bold"}}>Type :</Text> {current_game.type}</Text>
                        <Text style={globalStyles.textContainerText}><Text style={{fontWeight: "bold"}}>Year :</Text> {current_game.year}</Text>
                    </View>

                    <View style={globalStyles.paddedItem}>
                        <Text h4 style={globalStyles.description}>{current_game.description_en}</Text>
                    </View>

                    <TouchableOpacity
                        style={globalStyles.moreInfo}
                        onPress={() => {
                            Linking.openURL(current_game.url)
                        }}>
                        <Text style={globalStyles.moreInfoText}>
                            More info
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>
        )
    }


}


export default connect(mapStateToProps)(SingleGame)

const styles = {
    singleContainer: {},
    title: {
        flex: 3,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};