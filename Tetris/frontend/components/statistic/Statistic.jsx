import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from 'root/actions';
import types from 'root/actions/types';
import { locationToUrl } from 'root/utils/url';
import RepeatPanel from 'components/shared/RepeatPanel.jsx';
import Pagination from 'components/shared/Pagination.jsx';
import './Statistic.scss';

class Statistic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: 0
        }
    }

    getInfo(query) {
        this.props.actions.getGameListAsync(query.page ? query.page : 1, query.userId);
    }

    changeUser(value) {
        this.props.history.push(`/app/statistic${value.target.value == 0 ? '' : `?userId=${value.target.value}`}`)
    }

    componentWillMount() {
        let query = locationToUrl(this.props.location).query;
        if (query.userId !== undefined) {
            this.setState({
                userId: query.userId
            })
        }
        this.getInfo(query);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            let query = locationToUrl(nextProps.location).query;
            this.getInfo(query);
            this.setState({
                userId: query.userId ? query.userId : 0
            })
        }
    }

    render() {
        return (
            <div className="statistic_container">
                <h1 className="title is-4">Статистика</h1>
                {this.renderFilter()}
                <RepeatPanel actionId={types.GAMEAPI_GAME_GETGAMELISTASYNC} action={() => this.getInfo(locationToUrl(this.props.location).query)}>
                    <table className="table is-fullwidth">
                        <thead>
                            <tr>
                                <th className="col_id">Id</th>
                                <th className="col_user">User</th>
                                <th className="col_datetime">End DateTime</th>
                                <th>Point</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.list.items.map(x =>
                                <tr key={x.id}>
                                    <td className="col_id">{x.id}</td>
                                    <td className="col_user">{x.userName}</td>
                                    <td className="col_datetime">{x.dateTime}</td>
                                    <td className="col_point">{x.point}</td>
                                </tr>)}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan='4'>
                                    <Pagination page={this.props.list} location={this.props.location}></Pagination>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </RepeatPanel>
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <a className="button is-primary" onClick={() => this.props.history.push('/app')}>Меню</a>
                        </div>
                    </div>
                    <div className="level-right" />
                </div>
            </div>
        );
    }

    renderFilter() {
        return (<div className="level">
            <div className="level-left">
                <div className="level-item">
                    <div className="field has-addons select_filter">
                        <div className="control filter_label">
                            <a className="button is-static">User</a>
                        </div>
                        <div className="control filter_select">
                            <div className="select">
                                <select value={this.state.userId} onChange={(value) => this.changeUser(value)}>
                                    <option value={0}>All</option>
                                    {this.props.userList.map(x => <option key={x.id} value={x.id}>{x.login}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="level-right" />
        </div>);
    }
}

function mapStateToProps(state) {
    return {
        list: state.gameApi.game.gameList,
        userList: state.gameApi.user.list
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions.gameApi.game, dispatch),
        userActions: bindActionCreators(actions.gameApi.user, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Statistic);