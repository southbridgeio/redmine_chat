import React from 'react';

import {connect} from 'react-redux';
import {changeChannel, leaveChannel} from 'actions/actions';

import SidebarTop from 'components/sidebar/SidebarTop';
import ChannelList from 'components/sidebar/ChannelList';
import UserList from 'components/sidebar/UserList';

import styles from 'styles/sidebar.module.css';

class SidebarContainer extends React.Component {
    render() {
        return (
            <div className={styles.sidebar}>
                <SidebarTop/>
                <UserList users={this.props.users}/>
                <ChannelList 
                    activeChannel={this.props.activeChannel}
                    onSelectChannel={this.props.onSelectChannel}
                    onLeaveChannel={this.props.onLeaveChannel}
                    channels={this.props.channels}
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectChannel: (channelId) => dispatch(changeChannel(channelId)),
        onLeaveChannel: (channelId) => dispatch(leaveChannel(channelId))
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.chats.currentChannel ? state.chats.channels[state.chats.currentChannel].users : [],
        activeChannel: state.chats.currentChannel,
        channels: state.chats.channels
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
