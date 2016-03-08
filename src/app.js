require('styles/app.global.css');

import React from 'react';

import {connect} from 'react-redux';

import {maximizeChat} from 'actions/UI';
import {loadAccountInfo} from 'actions/actions';

import Sidebar from 'containers/SidebarContainer';
import Chat from 'containers/ChatContainer';


class App extends React.Component {
    componentDidMount() {
        this.props.loadAccountInfo();
        //subscribeToGlobal(dispatch);
    }
    render() {
        if (!this.props.loaded) return null;
        if (this.props.isMinimized) {
            return (
                <div className="minimized" onClick={this.props.maximize}>
                    Redmine-чат
                </div>
            )
        }
        return (
            <div className="main">
                <Sidebar/>
                <Chat/>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadAccountInfo: () => {
            dispatch(loadAccountInfo());
        },
        minimize: () => {
            dispatch(minimizeChat());
        },
        maximize: () => {
            dispatch(maximizeChat());
        }
    }
}
const mapStateToProps = (state) => {
    return {
        loaded: state.account.loaded,
        isMinimized: state.UI.minimized
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
