import { combineReducers } from 'redux';
import game from './gameReducer';
import user from './userReducer';

const reducer = combineReducers({
    game,
    user
});

export default reducer;