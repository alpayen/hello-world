import types from "./types";
import {store} from "./index"
import {retrieveAsync, storeAsync} from "./coldStorage";

const fetchGames = () => {
    return fetch(`https://androidlessonsapi.herokuapp.com/api/game/list`)
};

const fetchGameById = (id) => {
    return fetch(`https://androidlessonsapi.herokuapp.com/api/game/details?game_id=${id}`)
};


export const fetchAll = async () => {
    return new Promise(async (resolve, reject) => {
        store.dispatch({
            type: types.FETCH_BEGINS
        });

        try {
            const result = await fetchGames();
            const games = await result.json();
            store.dispatch({
                type: types.FETCH_ALL,
                payload: {games: games}
            });
            resolve()
        } catch (e) {

            console.log(e);
            reject("An error as occurred fetching all the games")
        }
    })
};

export const fetchById = async (id) => {
    return new Promise(async (resolve, reject) => {
        store.dispatch({
            type: types.FETCH_BEGINS
        });
        try {
            const result = await fetchGameById(id);
            const game = await result.json();
            await storeAsync('last_selected_game', JSON.stringify(game));
            store.dispatch({
                type: types.FETCH_BY_ID,
                payload: {game: game}
            });
        resolve()
        } catch (e) {
            console.log(e);
            reject(`An error as occurred fetching post ${id}`);
        }
    })
};

export const fetchInitialGameState = async () => {
    const last_selected_game = await retrieveAsync('last_selected_game') || false;
    store.dispatch({
        type: types.FETCH_INITIAL_GAME_STATE,
        payload: {current_game: !last_selected_game ? {} : JSON.parse(last_selected_game)}
    });
};


