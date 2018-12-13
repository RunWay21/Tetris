import react from 'react'
import keyMirror from 'fbjs/lib/keyMirror'

const types = {
    COMMON_LOADER_WAIT: null,
    COMMON_LOADER_ERROR: null,
    COMMON_LOADER_OK: null,

    COMMON_AUTH_GETAUTHINFOASYNC: null,
    COMMON_AUTH_LOGINASYNC: null,
    COMMON_AUTH_LOGOUTASYNC: null,
    COMMON_AUTH_LOGIN: null,
    COMMON_AUTH_LOGOUT: null,
    COMMON_AUTH_SETITEM: null,
    COMMON_AUTH_CLEARITEM: null,

    TETRIS_CLEAR_FIELD: null,
    TETRIS_START_GAME: null,
    TETRIS_SET_NEW_FIGURE: null,
    TETRIS_END_GAME: null,
    TETRIS_SET_GAME: null,
    TETRIS_SET_POINT: null,
    TETRIS_SET_FIELD: null,
    TETRIS_PAUSE_GAME: null,
    TETRIS_SET_FIGURE: null,
    TETRIS_ADD_SETTEDFIGURE: null,

    GAMEAPI_GAME_SAVEGAME: null,
    GAMEAPI_GAME_SETGAMELIST: null,
    GAMEAPI_GAME_GETGAMELISTASYNC: null,
    GAMEAPI_GAME_SETSCOREINFO: null,
    GAMEAPI_GAME_GETSCOREINFOASYNC: null,

    GAMEAPI_USER_SETLIST: null
};

const mirror = keyMirror(types);

export default mirror;