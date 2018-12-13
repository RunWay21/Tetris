import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cell from '../cell/Cell.jsx';
import './Column.css';

export default class Column extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div className="columns is-gapless my-column">
            {this.props.cells.map(x => (<div className="column" key={x.x}><Cell type={x.value}></Cell></div>))}
        </div>);
    }
}

Column.propTypes = {
    cells: PropTypes.array.isRequired,
    figure: PropTypes.object.isRequired
}