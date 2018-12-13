import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import actions from 'root/actions';
import types from 'root/actions/types';
import Validator from 'root/utils/validator';
import classNames from 'classnames';
import './Login.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: ''
        };
        this.handleChanges = this.handleChanges.bind(this);
        this.validator = new Validator();
        this.validator.buildRules('login', 'Login').required();
        this.validator.buildRules('password', 'Password').required();
        this.props.history.replace('/');
    }

    handleChanges(field, value) {
        this.props.actions.setItem({ ...this.props.item, [field]: value });
    }

    async login() {
        if (!this.validator.validate(this.props.item)) {
            this.setState({ messages: this.validator.messages });
            return;
        }
        await this.props.actions.loginAsync(this.props.item);
        const item = this.props.loader.find(x => x.id === types.COMMON_AUTH_LOGINASYNC);
        if (item.error)
            this.setState({ messages: [item.error] });
    }

    handleKeyPress(key) {
        if (key === 'Enter')
            this.login();
    }

    render() {
        const item = this.props.loader.find(x => x.id === types.COMMON_AUTH_LOGINASYNC);
        const isSaving = item && item.state == types.COMMON_LOADER_WAIT;
        return (
            <div className="columns login-page">
                <div className="column is-narrow login-form">
                    <div className="columns">
                        <div className="column">
                            <h1 className="title is-4">Tetris</h1>
                            <hr />
                        </div>
                    </div>
                    {this.renderMessage()}
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <label className="label">Login</label>
                                <div className="control">
                                    <input className="input" onChange={e => this.handleChanges('login', e.target.value)} value={this.props.item.login} onKeyPress={e => this.handleKeyPress(e.key)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <label className="label">Password</label>
                                <div className="control">
                                    <input className="input" onChange={e => this.handleChanges('password', e.target.value)} value={this.props.item.password} onKeyPress={e => this.handleKeyPress(e.key)}
                                        type="password" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            <div className="field">
                                <div className="control">
                                    <a className={classNames('button', 'is-primary', 'is-fullwidth', { 'loading': isSaving })} onClick={() => this.login()}>Sign in</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderMessage() {
        if (this.state.messages.length > 0) {
            return (
                <div className="columns">
                    <div className="column">
                        <div className="has-text-danger">
                            <ul>
                                {this.state.messages.map((x, index) => <li key={index}>{x}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        item: state.common.auth.item,
        loader: state.common.loader,
        info: state.common.auth.info
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions.common.auth, dispatch)
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));