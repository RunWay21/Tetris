import React, { Component } from 'react'
import { connect } from 'react-redux'
import Score from './score/Score.jsx'
import UserName from './userName/UserName.jsx'
import NextFigure from './nextFigure/NextFigure.jsx'
import './Sidebar.css'

class Sidebar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (<div className='columns is-multiline is-gapless sidebar-columns'>
            <div className="column">
                <UserName name='' />
            </div>
            <div className="column">
                <Score point={this.props.point} />
            </div>
            <div className="column">
                <NextFigure type={this.props.nextFigure.type} />
            </div>
            <div className="column sidebar-empty-column" />
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        nextFigure: state.tetris.nextFigure,
        point: state.tetris.point
    }
}

export default connect(mapStateToProps)(Sidebar);