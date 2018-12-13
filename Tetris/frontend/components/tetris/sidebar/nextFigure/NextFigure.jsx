import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from '../../field/cell/Cell.jsx';
import './NextFigure.css';

export default class NextFigure extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<div className="columns is-gapless nextfigure-columns is-multiline">
            <div className="column nextfigure-title-column">
                <p>Next</p>
            </div>
            <div className="column nextfigure-figure-column">
                {this.renderNextFigure(this.props.type)}
            </div>
            <div className="column nextfigure-down-empty-column" />
        </div>)
    }

    renderNextFigure(type) {
        switch (type) {
            case 'I': return this.renderFigure([0, 0, 0, 0], [1, 1, 1, 1]);
            case 'O': return this.renderFigure([0, 0, 1, 1], [0, 0, 1, 1]);
            case 'S': return this.renderFigure([0, 0, 1, 1], [0, 1, 1, 0]);
            case 'Z': return this.renderFigure([0, 1, 1, 0], [0, 0, 1, 1]);
            case 'E': return this.renderFigure([0, 0, 1, 0], [0, 1, 1, 1]);
            case 'L': return this.renderFigure([0, 0, 0, 1], [0, 1, 1, 1]);
            case 'J': return this.renderFigure([0, 1, 1, 1], [0, 0, 0, 1]);
            default: return this.renderFigure([0, 0, 0, 0], [0, 0, 0, 0]);
        }
    }

    renderFigure(topCells, bottomCells) {
        return <div className="columns is-gapless nextfigure-figure-column-up is-multiline">
            <div className="column nextfigure-figure-column-lefttempty" />
            {topCells.map((x, index) => <div key={index} className="column cell-up">
                <Cell type={x} />
            </div>)}
            <div className="column nextfigure-figure-column-rightempty" />
            <div className="column nextfigure-figure-column-lefttempty" />
            {bottomCells.map((x, index) => <div key={index} className="column cell-down">
                <Cell type={x} />
            </div>)}
            <div className="column nextfigure-figure-column-rightempty" />
        </div>
    }
}

NextFigure.propTypes = {
    type: PropTypes.oneOf(['I', 'L', 'J', 'Z', 'S', 'E', 'O']).isRequired
}