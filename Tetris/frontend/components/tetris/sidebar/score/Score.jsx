import React, { Component } from 'react';
import './Score.css'

export default class Score extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<div className='columns score-columns is-gapless is-multiline'>
            <div className='column score-title-column'>
                <p>Score</p>
            </div>
            <div className='column score-value-column'>
                {this.props.point}
            </div>
            <div className='column score-empty-column' />
        </div>)
    }
}