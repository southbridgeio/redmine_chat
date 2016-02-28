require('styles/app.global.css');

import React from 'react';

import {connect} from 'react-redux';

import {loadAccountInfo} from 'actions/actions';
import {subscribeToGlobal} from 'sources/faye';

import Sidebar from 'containers/SidebarContainer';
import Chat from 'containers/ChatContainer';


class App extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props;
        subscribeToGlobal(dispatch);
        dispatch(loadAccountInfo());
    }
    render() {
        if (!this.props.loaded) return null;
        return (
            <div className="main">
                <Sidebar/>
                <Chat/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loaded: state.account.loaded
    }
}

export default connect(mapStateToProps)(App);
