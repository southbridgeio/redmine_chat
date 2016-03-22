import React from 'react';

import {connect} from 'react-redux';
import { changeChannel, leaveChannel, toggleNotifications, leaveAllChannels } from 'actions/actions';

import SidebarTop from 'components/sidebar/SidebarTop';
import ChannelList from 'components/sidebar/ChannelList';
import UserList from 'components/sidebar/UserList';

import styles from 'styles/sidebar.module.css';

class SidebarContainer extends React.Component {
    render() {
        return (
            <div className={styles.sidebar}>
                <SidebarTop
                    notificationsEnabled={this.props.notificationsEnabled} 
                    onLeaveAllChannels={this.props.onLeaveAllChannels}
                    onToggleNotifications={this.props.onToggleNotifications}
                />
                <UserList users={this.props.users}/>
                { !this.props.singleChannel ? 
                <ChannelList 
                    activeChannel={this.props.activeChannel}
                    onSelectChannel={this.props.onSelectChannel}
                    onLeaveChannel={this.props.onLeaveChannel}
                    channels={this.props.channels}
                /> : null }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectChannel: (channelId) => dispatch(changeChannel(channelId)),
        onLeaveChannel: (channelId) => dispatch(leaveChannel(channelId)),
        onToggleNotifications: () => dispatch(toggleNotifications()),
        onLeaveAllChannels: () => dispatch(leaveAllChannels())
    }
}
const mapStateToProps = (state) => {
    return {
        users: state.chats.currentChannel ? state.chats.channels[state.chats.currentChannel].users : [],
        activeChannel: state.chats.currentChannel,
        channels: state.chats.channels,
        singleChannel: state.account.singleChannel,
        notificationsEnabled: state.account.settings.notificationsEnabled
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer);
