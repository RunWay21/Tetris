import React, { Component } from 'react'
import Field from './field/Field.jsx'
import Sidebar from './sidebar/Sidebar.jsx';
import './Tetris.css'

export default class Tetris extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tetris_container">
                <div className="columns is-centered tetris">
                    <div className="column is-narrow">
                        <div className='columns is-gapless tetris-columns'>
                            <div className="column">
                                <Field onEndGame={() => this.props.history.push('/')} />
                            </div>
                            <div className="column">
                                <Sidebar />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="columns is-centered">
                    <div className="column is-narrow">
                        <a className="button is-primary" onClick={() => this.props.history.push('/')}>НАЗАД</a>
                    </div>
                </div>
            </div>);
    }
}