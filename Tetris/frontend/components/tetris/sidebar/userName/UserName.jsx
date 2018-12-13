import React, { Component } from 'react';
import './UserName.css'

export default class UserName extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<div className='columns username-columns is-gapless is-multiline'>
            <div className='column username-title-column'>
                <p>{this.props.name}</p>
            </div>
        </div>)
    }
}