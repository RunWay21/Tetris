import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import types from 'root/actions/types';
import './RepeatPanel.css';

class RepeatPanel extends React.Component {

    static propTypes = {
        actionId: PropTypes.string.isRequired,
        action: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.repeatAction = this.repeatAction.bind(this);
    }

    repeatAction() {
        this.props.action();
    }

    render() {
        const item = this.props.loader.find(x => x.id === this.props.actionId);
        if (item && item.state === types.COMMON_LOADER_WAIT) {
            return (
                <div className='columns is-centered repeat-panel'>
                    <div className='column is-narrow'>
                        <div className='section'>
                            <div className='loader' />
                            <h1 className='title after-loader is-4'>Loading...</h1>
                        </div>
                    </div>
                </div>
            );
        }
        if (item && item.state === types.COMMON_LOADER_ERROR) {
            return (
                <div className='columns is-centered'>
                    <div className="column is-narrow has-text-centered">
                        <h1 className='title is-4'>Could not load data from the server.</h1>
                        <h1 className='subtitle is-4'>Press repeat button to reload data.</h1>
                        <a className='button' onClick={this.repeatAction}>Repeat</a>
                    </div>
                </div>
            );
        }
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        ...ownProps,
        loader: state.common.loader
    };
}

export default connect(
    mapStateToProps
)(RepeatPanel);