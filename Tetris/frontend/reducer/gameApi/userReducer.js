import initialState from '../initialState';
import types from 'root/actions/types';

export default (state = initialState.gameApi.user, action) => {
    switch (action.type) {
        case types.GAMEAPI_USER_SETLIST:
            return { ...state, list: action.list }
        default: return state;
    }
}