import api from 'root/api';
import types from 'root/actions/types';

function setList(list) {
    return {
        type: types.GAMEAPI_USER_SETLIST,
        list
    }
}

export function getListAsyncUnsafe() {
    return async (dispatch) => {
        let list = await api.user.getList();
        dispatch(setList(list));
    }
}