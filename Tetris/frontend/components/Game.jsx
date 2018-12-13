import React, { Component } from "react";
import Tetris from "./tetris/Tetris.jsx";
import Menu from "./menu/Menu.jsx";
import Statistic from './statistic/Statistic.jsx';
import { Route, Switch } from 'react-router-dom';

export default class Game extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route path="/app/tetris" component={Tetris} />
                <Route path="/app/statistic" component={Statistic}/>
                <Route path="/app" component={Menu} />
            </Switch>)
    }
}