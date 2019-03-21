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
    store.dispatch({
        type: types.FETCH_BEGINS
    });

    try {
        const result = await fetchGames();
        const games = await result.json();
        store.dispatch({
            type: types.FETCH_ALL,
            payload: {games: games}
        })
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const fetchById = async (id) => {
    store.dispatch({
        type: types.FETCH_BEGINS
    });

    try {
        const result = await fetchGameById(id);
        const game = await result.json();
        await storeAsync('last_selected_game', game.name);
        console.log(store)
        store.dispatch( {
            type: types.FETCH_BY_ID,
            payload: {game: game}
        });
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const fetchInitialGameState = async () =>{
    const last_selected_game = await retrieveAsync('last_selected_game') || "";
     store.dispatch({
        type: types.FETCH_INITIAL_GAME_STATE,
        payload: {last_selected_game : last_selected_game }
     });
};


