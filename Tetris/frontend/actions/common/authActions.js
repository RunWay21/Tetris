import api from 'root/api';
import types from 'root/actions/types';
import * as loader from 'root/actions/common/loaderActions';

export function login(info) {
    return {
        type: types.COMMON_AUTH_LOGIN,
        info
    };
}

export function logout() {
    return {
        type: types.COMMON_AUTH_LOGOUT
    };
}

export function setItem(item) {
    return {
        type: types.COMMON_AUTH_SETITEM,
        item
    };
}

export function clearitem() {
    return {
        type: types.COMMON_AUTH_CLEARITEM
    };
}

export function getAuthInfoAsyncUnsafe() {
    return async (dispatch) => {
        const info = await api.common.auth.getAuthInfo();
        dispatch(login(info));
    };
}

export function getAuthInfoAsync() {
    return async (dispatch) => {
        try {
            dispatch(loader.wait(types.COMMON_AUTH_GETAUTHINFOASYNC));
            await dispatch(getAuthInfoAsyncUnsafe());
            dispatch(loader.ok(types.COMMON_AUTH_GETAUTHINFOASYNC));
        } catch (error) {
            console.warn('error');
            dispatch(loader.error(types.COMMON_AUTH_GETAUTHINFOASYNC));
        }
    };
}

export function loginAsync(model) {
    return async (dispatch) => {
        try {
            dispatch(loader.wait(types.COMMON_AUTH_LOGINASYNC));
            await api.common.auth.login(model);
            await dispatch(getAuthInfoAsyncUnsafe());
            dispatch(clearitem());
            dispatch(loader.ok(types.COMMON_AUTH_LOGINASYNC));
        } catch (error) {
            console.warn(error);
            dispatch(loader.error(types.COMMON_AUTH_LOGINASYNC));
        }
    };
}

export function logoutAsync() {
    return async (dispatch) => {
        try {
            dispatch(loader.wait(types.COMMON_AUTH_LOGOUTASYNC));
            await api.common.auth.logout();
            dispatch(logout());
            dispatch(loader.ok(types.COMMON_AUTH_LOGOUTASYNC));
        } catch (error) {
            console.warn(error);
            dispatch(loader.error(types.COMMON_AUTH_LOGOUTASYNC));
        }
    };
}