import initialState from '../initialState';
import types from 'root/actions/types';

export default (state = initialState.gameApi.game, action) => {
    switch (action.type) {
        case types.GAMEAPI_GAME_SETGAMELIST:
            return { ...state, gameList: action.list }
        case types.GAMEAPI_GAME_SETSCOREINFO:
            return { ...state, scoreInfo: action.info }
        default: return state;
    }
}