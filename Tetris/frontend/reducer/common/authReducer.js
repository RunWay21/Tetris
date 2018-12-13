import types from 'root/actions/types';
import initialState from 'root/reducer/initialState';

export default function (state = initialState.common.auth, action) {
    switch (action.type) {
        case types.COMMON_AUTH_LOGIN:
            return {
                ...state,
                info: action.info
            };
        case types.COMMON_AUTH_LOGOUT:
            return {
                ...state,
                info: initialState.common.auth.info
            };
        case types.COMMON_AUTH_SETITEM:
            return {
                ...state,
                item: action.item
            };
        case types.COMMON_AUTH_CLEARITEM:
            return {
                ...state,
                item: initialState.common.auth.item
            };
        default:
            return state;
    }
}