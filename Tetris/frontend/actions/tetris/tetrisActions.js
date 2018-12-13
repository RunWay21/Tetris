import types from '../types';
import * as FigureGenerator from 'root/FigureGenerator';

export function clearField() {
    return { type: types.TETRIS_CLEAR_FIELD };
}

export function startGame(figure, nextFigure) {
    return { type: types.TETRIS_START_GAME, figure, nextFigure }
}

export function setNewFigure(nextFigure, currentNextFigure) {
    return {
        type: types.TETRIS_SET_NEW_FIGURE,
        figure: currentNextFigure,
        nextFigure
    }
}

export function endGame(state) {
    return { type: types.TETRIS_END_GAME }
}

export function setGame(field, figure) {
    let game = [];
    field.forEach(col => {
        let collumn = [];
        collumn = col.map(x => { return { x: x.x, y: x.y, value: x.value } });
        game.push(collumn);
    })
    figure.points.forEach(x => {
        if (x.x >= 0 && x.x < 10 && x.y >= 0 && x.y < 20)
            game[x.y][x.x].value = 1
    });
    return { type: types.TETRIS_SET_GAME, game }
}

export function setPoint(point) {
    return {
        type: types.TETRIS_SET_POINT,
        point
    }
}

export function setFigureAndField(figure, field) {
    return {
        type: types.TETRIS_SET_FIGURE_AND_FIELD,
        figure,
        field
    }
}

export function setField(field) {
    return {
        type: types.TETRIS_SET_FIELD,
        field
    }
}

export function pauseGame(value) {
    return { type: types.TETRIS_PAUSE_GAME, pause: value }
}

export function setFigure(figure) {
    return {
        type: types.TETRIS_SET_FIGURE, figure
    }
}

export function addSettedFigure(mas, figure) {
    let newMas = [...mas, figure.type];
    return {
        type: types.TETRIS_ADD_SETTEDFIGURE,
        settedFigures: newMas
    }
}