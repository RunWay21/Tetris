import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from 'components/pages/HomePage.jsx';
import NotFound from 'components/common/NotFound.jsx';
import Game from '../Game.jsx';


export default class AppBody extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route path='/app' component={Game} />
                <Redirect exact from="/" to="/app" />
            </Switch>
        );
    }
}