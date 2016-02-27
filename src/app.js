import React from 'react';

import {connect} from 'react-redux';

import {loadAccountInfo} from 'actions/actions';

import Sidebar from 'containers/SidebarContainer';
import Chat from 'containers/ChatContainer';

import styles from 'styles/app.css';

class App extends React.Component {
    componentDidMount() {
        const {dispatch} = this.props;
        dispatch(loadAccountInfo());
    }
    render() {
        if (!this.props.loaded) return null;
        return (
            <div className={styles.main}>
                <Sidebar/>
                <Chat className={styles.chat}/>
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
