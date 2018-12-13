import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import actions from 'root/actions';
import { connect } from 'react-redux';
import types from 'root/actions/types';
import { Link } from 'react-router-dom';
import RepeatPanel from 'components/shared/RepeatPanel.jsx';
import './Menu.scss';

class Menu extends Component {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		this.getScoreInfo();
	}

	getScoreInfo() {
		this.props.actions.getScoreInfoAsync();
	}

	logout() {
		this.props.authActions.logoutAsync();
	}

	render() {
		return (<div className="menu_container">
			<div className="columns is-centered menu">
				<div className="column is-narrow is-one-third menu-panel">
					<div className="columns">
						<div className="column">
							<RepeatPanel actionId={types.GAMEAPI_GAME_GETSCOREINFOASYNC} action={() => this.getScoreInfo()}>
								<div className="columns is-centered">
									<div className="column is-narrow">
										<h1 className="title is-4">Последняя игра: {this.props.scoreInfo.score}</h1>
									</div>
								</div>
								<div className="columns is-centered">
									<div className="column is-narrow">
										<h1 className="title is-4">Рекорд : {this.props.scoreInfo.maxScore}</h1>
									</div>
								</div>
							</RepeatPanel>
						</div>
					</div>
					<div className="columns is-centered">
						<div className="column">
							<div className="level">
								<div className="level-item has-text-centered">
									<Link to='/app/tetris' className="button is-primary">Играть</Link>
								</div>
								<div className="level-item has-text-centered">
									<Link to='/app/statistic' className="button">Статистика</Link>
								</div>
								<div className="level-item has-text-centered">
									<a className="button" onClick={() => this.logout()}>Выйти</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>)
	}
}

function mapStateToProps(state) {
	return {
		scoreInfo: state.gameApi.game.scoreInfo
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions.gameApi.game, dispatch),
		authActions: bindActionCreators(actions.common.auth, dispatch)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);