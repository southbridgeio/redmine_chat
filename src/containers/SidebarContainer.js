import React from 'react';

import {connect} from 'react-redux';

import ChannelList from 'components/sidebar/ChannelList';
import UserList from 'components/sidebar/UserList';

import styles from 'styles/sidebar.css';

class SidebarContainer extends React.Component {
    render() {
        return (
            <div className={styles.sidebar}>
                <UserList users={this.props.users}/>
                <ChannelList channels={this.props.channels}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.account.channels[state.account.currentChannel].users,
        channels: state.account.channels
    }
}
export default connect(mapStateToProps)(SidebarContainer);
