import React, { Component } from 'react';
import './Cell.css';

export default class Cell extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.type===0 ? <b/>:<b className = 'full-cell'/>
    }
}