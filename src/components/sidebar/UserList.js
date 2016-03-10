import React from 'react';

import styles from 'styles/sidebar.module.css';

class User extends React.Component {
    render() {
        return (
            <div className={styles.userlist__user}>
                <img className={styles.userlist__user__avatar} src={this.props.user.photo_url}/>
                <div className={styles.userlist__user__name}>{this.props.user.name}</div>
            </div>
        )
    }
}
export default class UserList extends React.Component{
    render() {
        return (
            <div className={styles.userlist}>
                {this.props.users.map(user => <User key={user.id} user={user}/>)}
            </div>
        )

    }
}
