import React, { Component } from 'react';
import Column from './column/Column.jsx';
import PropTypes from "prop-types";
import * as FigureGenerator from 'root/FigureGenerator';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from 'root/actions';
import key from 'keymaster';
import './Field.css';

class Field extends Component {
    constructor(props) {
        super(props);
        this.moveLeft = this.moveLeft.bind(this);
        this.moveDown = this.moveDown.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.rotateFigure = this.rotateFigure.bind(this);
        this.pause = this.pause.bind(this);
    }

    static propTypes = {
        onEndGame: PropTypes.func.isRequired
    }

    static saving = false;

    pause(e) {
        if (!e.repeat) {
            this.props.actions.pauseGame(!this.props.pause)

        }
    }

    canMoveLeft(field, figure) {
        if (figure.points.some(x => x.x - 1 < 0 || (x.y >= 0 && field[x.y][x.x - 1].value === 1)))
            return false;
        return true;
    }

    canRotate(field, points) {
        if (points.some(x => x.x < 0 || x.x > 9 || x.y == 19 || (x.y >= 0 && field[x.y][x.x].value === 1)))
            return false;
        return true;
    }

    canMoveRigth(field, figure) {
        if (figure.points.some(x => x.x + 1 > 9 || (x.y >= 0 && field[x.y][x.x + 1].value === 1))) {
            return false;
        }
        return true;
    }

    canMoveDown(field, figure) {
        if (figure.points.some(x => x.y + 1 > 19 || (x.y + 1 >= 0 && field[x.y + 1][x.x].value === 1))) {
            return false;
        }
        return true;
    }

    getCompletedFields(field) {
        let completedFields = []
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 10; j++) {
                if (field[i][j].value == 0)
                    break;
                if (j === 9)
                    completedFields.push(i);
            }
        }
        return completedFields;
    }

    setFigureOnField(field, figure) {
        if (figure.points.some(x => x.x < 0 || x.x > 9 || x.y < 0 || x.y > 19)) {
            this.endGame();
            return;
        }
        let newField = field.map(col => col.map(cell => {
            return {
                x: cell.x,
                y: cell.y,
                value: cell.value
            }
        }));
        figure.points.forEach(x => newField[x.y][x.x].value = 1);
        let completedFields = this.getCompletedFields(newField);
        if (completedFields.length < 1) {
            this.props.actions.setPoint(this.props.point + 20);
        } else {
            this.props.actions.setPoint(this.props.point + 100 * Math.pow(2, completedFields.length - 1) + 20)
        }
        completedFields.forEach(x => newField = this.removeColumn(newField, x));
        this.props.actions.addSettedFigure(this.props.settedFigures, figure);
        this.props.actions.setField(newField);
        this.props.actions.setNewFigure(FigureGenerator.getFigure(), this.props.nextFigure);
    }

    removeColumn(field, column) {
        let resultField = [];
        for (let i = 0; i < 20; i++) {
            if (i > column) {
                resultField.push([
                    { x: 0, y: i, value: field[i][0].value },
                    { x: 1, y: i, value: field[i][1].value },
                    { x: 2, y: i, value: field[i][2].value },
                    { x: 3, y: i, value: field[i][3].value },
                    { x: 4, y: i, value: field[i][4].value },
                    { x: 5, y: i, value: field[i][5].value },
                    { x: 6, y: i, value: field[i][6].value },
                    { x: 7, y: i, value: field[i][7].value },
                    { x: 8, y: i, value: field[i][8].value },
                    { x: 9, y: i, value: field[i][9].value }
                ]);
            } else if (i - 1 < 0) {
                resultField.push([
                    { x: 0, y: i, value: 0 },
                    { x: 1, y: i, value: 0 },
                    { x: 2, y: i, value: 0 },
                    { x: 3, y: i, value: 0 },
                    { x: 4, y: i, value: 0 },
                    { x: 5, y: i, value: 0 },
                    { x: 6, y: i, value: 0 },
                    { x: 7, y: i, value: 0 },
                    { x: 8, y: i, value: 0 },
                    { x: 9, y: i, value: 0 }
                ]);
            } else {
                resultField.push([
                    { x: 0, y: i, value: field[i - 1][0].value },
                    { x: 1, y: i, value: field[i - 1][1].value },
                    { x: 2, y: i, value: field[i - 1][2].value },
                    { x: 3, y: i, value: field[i - 1][3].value },
                    { x: 4, y: i, value: field[i - 1][4].value },
                    { x: 5, y: i, value: field[i - 1][5].value },
                    { x: 6, y: i, value: field[i - 1][6].value },
                    { x: 7, y: i, value: field[i - 1][7].value },
                    { x: 8, y: i, value: field[i - 1][8].value },
                    { x: 9, y: i, value: field[i - 1][9].value }
                ]);
            }
        }
        return resultField;
    }

    getRotateCoord(figure) {
        return figure.points.map(x => {
            if (figure.center !== x) {
                let dX = figure.center.x - x.x;
                let dY = figure.center.y - x.y;
                return {
                    x: figure.center.x + dY,
                    y: figure.center.y - dX
                }
            }
            return {
                x: figure.center.x,
                y: figure.center.y
            }
        });
    }

    moveLeft(e) {
        if (!e.repeat && this.canMoveLeft(this.props.field, this.props.figure)) {
            let newFig = {};
            newFig.points = this.props.figure.points.map(x => {
                return { x: x.x - 1, y: x.y };
            });
            newFig.center = newFig.points[1];
            newFig.type = this.props.figure.type;
            this.props.actions.setFigure(newFig);
        }
    }

    moveRight(e) {
        if (!e.repeat && this.canMoveRigth(this.props.field, this.props.figure)) {
            let newFig = {};
            newFig.points = this.props.figure.points.map(x => {
                return { x: x.x + 1, y: x.y };
            });
            newFig.center = newFig.points[1];
            newFig.type = this.props.figure.type;
            this.props.actions.setFigure(newFig)
        }
    }

    rotateFigure(e) {
        if (!e.repeat) {
            let points = this.getRotateCoord(this.props.figure);
            if (this.canRotate(this.props.field, points)) {
                let newFig = {};
                newFig.points = points;
                newFig.center = points[1];
                newFig.type = this.props.figure.type;
                this.props.actions.setFigure(newFig);
            }
        }
    }

    moveDown(e) {
        if (!e.repeat) {
            if (this.canMoveDown(this.props.field, this.props.figure)) {
                let newFig = {};
                newFig.points = this.props.figure.points.map(x => {
                    return { x: x.x, y: x.y + 1 };
                });
                newFig.center = newFig.points[1];
                newFig.type = this.props.figure.type;
                this.props.actions.setFigure(newFig);
                return;
            }
            this.setFigureOnField(this.props.field, this.props.figure);
        }
    }

    startGame() {
        this.props.actions.startGame(FigureGenerator.getFigure(), FigureGenerator.getFigure())
    }

    async endGame() {
        let numberOfL = 0;
        let numberOfJ = 0;
        let numberOfI = 0;
        let numberOfO = 0;
        let numberOfE = 0;
        let numberOfS = 0;
        let numberOfZ = 0;
        this.props.settedFigures.forEach(x => {
            switch (x) {
                case 'L': numberOfL += 1; break;
                case 'J': numberOfJ += 1; break;
                case 'I': numberOfI += 1; break;
                case 'E': numberOfE += 1; break;
                case 'O': numberOfO += 1; break;
                case 'Z': numberOfZ += 1; break;
                case 'S': numberOfS += 1; break;
                default: break;
            }
        });
        if (!Field.saving) {
            Field.saving = true;
            await this.props.gameApi.saveGameAsync({
                numberOfE,
                numberOfI,
                numberOfJ,
                numberOfL,
                numberOfO,
                numberOfS,
                numberOfZ,
                point: this.props.point
            });
        }
        this.props.onEndGame();
    }

    componentWillMount() {
        this.startGame();
        this.props.actions.setGame(this.props.field, this.props.figure);
        key('left', (e) => this.moveLeft(e));
        key('right', (e) => this.moveRight(e));
        key('down', (e) => this.moveDown(e));
        key('up', (e) => this.rotateFigure(e));
        key('p', (e) => this.pause(e));
        if (!this.props.pause)
            this.setState({
                taimer: setInterval(() => this.moveDown(this.props.field, this.props.figure), 1000)
            })
    }

    componentWillUnmount() {
        key.unbind('up');
        key.unbind('down');
        key.unbind('left');
        key.unbind('right');
        key.unbind('p');
        clearInterval(this.state.taimer);
        Field.saving = false;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.field !== this.props.field || nextProps.figure !== this.props.figure) {
            this.props.actions.setGame(nextProps.field, nextProps.figure);
        }
        if (nextProps.pause && !this.props.pause)
            clearInterval(this.state.taimer)
        else if (!nextProps.pause && this.props.pause)
            this.setState({
                taimer: setInterval(() => this.moveDown(this.props.field, this.props.figure), 1000)
            })
    }

    render() {
        return (<div autoFocus ref={elem => this.game = elem} className="columns field-columns is-gapless is-multiline">
            {this.props.game.map(x => <div className='column' key={x[0].y}>
                <Column cells={x} figure={this.props.figure}></Column>
            </div>)}
        </div>)
    }
}


function mapStateToProps(state) {
    return {
        game: state.tetris.game,
        figure: state.tetris.figure,
        field: state.tetris.field,
        pause: state.tetris.pause,
        nextFigure: state.tetris.nextFigure,
        point: state.tetris.point,
        settedFigures: state.tetris.settedFigures
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions.tetris, dispatch),
        gameApi: bindActionCreators(actions.gameApi.game, dispatch)
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Field);