import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from 'root/actions';
import types from 'root/actions/types';
import RepeatPanel  from 'components/shared/RepeatPanel.jsx';
import { withRouter } from 'react-router-dom';

import './layout.scss';
import AppBody from './AppBody.jsx';

import Login from 'components/common/Login.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.getAuthInfo();
    }

    async getAuthInfo() {
        await this.props.actions.getAuthInfoAsync();
    }

    render() {
        if (!this.props.authInfo.isAuth)
            return (
                <RepeatPanel actionId={types.COMMON_AUTH_GETAUTHINFOASYNC} action={() => this.getAuthInfo()}>
                    <Login></Login>
                </RepeatPanel>
            );
        return (
            <div>
                <AppBody authInfo = {this.props.authInfo}></AppBody>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        authInfo: state.common.auth.info
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions.common.auth, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));