import React from 'react';
import Icon from 'react-fa'

export default class SidebarTop extends React.Component {
    render() {
        return (
            <div>
                    <Icon name="power-off" size="2x"/>
                    &nbsp;
                    <Icon name="volume-off" size="2x"/>
            </div>
        )
    }
}
