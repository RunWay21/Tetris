import initialState from '../initialState';
import types from 'root/actions/types';

export default (state = initialState.tetris, action) => {
    switch (action.type) {
        case types.TETRIS_SET_FIGURE_AND_FIELD:
            return { ...state, figure: action.figure, field: action.field }
        case types.TETRIS_SET_FIELD:
            return { ...state, field: action.field, figure: initialState.tetris.figure }
        case types.TETRIS_SET_FIGURE:
            return { ...state, figure: action.figure }
        case types.TETRIS_SET_GAME:
            return { ...state, game: action.game }
        case types.TETRIS_PAUSE_GAME:
            return { ...state, pause: action.pause }
        case types.TETRIS_START_GAME:
            return { ...initialState.tetris, figure: action.figure, nextFigure: action.nextFigure, pause: false }
        case types.TETRIS_SET_POINT:
            return { ...state, point: action.point }
        case types.TETRIS_END_GAME:
            return { ...state, endGame: true }
        case types.TETRIS_CLEAR_END_GAME:
            return { ...state, endGame: false }
        case types.TETRIS_SET_NEW_FIGURE:
            return { ...state, figure: action.figure, nextFigure: action.nextFigure }
        case types.TETRIS_ADD_SETTEDFIGURE:
            return { ...state, settedFigures: action.settedFigures }
        default: return state;
    }
}