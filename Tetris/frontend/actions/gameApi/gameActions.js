import api from 'root/api';
import types from 'root/actions/types';
import * as loader from 'root/actions/common/loaderActions';
import * as user from './userActions';

export function setGameList(list) {
  return {
    type: types.GAMEAPI_GAME_SETGAMELIST,
    list
  }
}

export function setScoreInfo(info) {
  return {
    type: types.GAMEAPI_GAME_SETSCOREINFO,
    info
  }
}

export function getScoreInfoAsync() {
  return async (dispatch) => {
    try {
      dispatch(loader.wait(types.GAMEAPI_GAME_GETSCOREINFOASYNC));
      const info = await api.game.getScoreInfo();
      dispatch(setScoreInfo(info));
      dispatch(loader.ok(types.GAMEAPI_GAME_GETSCOREINFOASYNC));
    } catch (error) {
      console.warn(error);
      dispatch(loader.error(types.GAMEAPI_GAME_GETSCOREINFOASYNC));
    }
  }
}

export function getGameListAsync(page, userId) {
  return async (dispatch) => {
    try {
      dispatch(loader.wait(types.GAMEAPI_GAME_GETGAMELISTASYNC));
      dispatch(user.getListAsyncUnsafe());
      const list = await api.game.getUserGameList(page, userId);
      dispatch(setGameList(list));
      dispatch(loader.ok(types.GAMEAPI_GAME_GETGAMELISTASYNC));
    } catch (error) {
      console.warn(error);
      dispatch(loader.error(types.GAMEAPI_GAME_GETGAMELISTASYNC));
    }
  }
}

export function saveGameAsync(model) {
  return async (dispatch) => {
    try {
      dispatch(loader.wait(types.GAMEAPI_GAME_SAVEGAME));
      await api.game.saveGame(model);
      dispatch(clearItem());
      dispatch(loader.ok(types.GAMEAPI_GAME_SAVEGAME));
    } catch (error) {
      console.warn(error);
      dispatch(loader.error(types.GAMEAPI_GAME_SAVEGAME));
    }
  }
}

export function saveAsync(model) {
  return async (dispatch) => {
    try {
      dispatch(loader.wait(types.ADMIN_CATEGORY_SAVEASYNC));
      await api.admin.category.save(model);
      dispatch(clearItem());
      dispatch(loader.ok(types.ADMIN_CATEGORY_SAVEASYNC));
    } catch (error) {
      console.warn(error);
      dispatch(loader.error(types.ADMIN_CATEGORY_SAVEASYNC));
    }
  };
}