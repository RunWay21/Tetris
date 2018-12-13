import { combineReducers } from 'redux';
import common from './common';
import tetris from './tetris/tetrisReducer';
import gameApi from './gameApi';

const reducer = combineReducers({
    common,
    tetris,
    gameApi
});

export default reducer;