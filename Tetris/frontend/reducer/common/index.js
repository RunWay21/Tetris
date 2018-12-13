import { combineReducers } from 'redux';
import loader from './loaderReducer';
import auth from './authReducer';

const reducer = combineReducers({
    loader,
    auth
});

export default reducer;