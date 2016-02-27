import React from 'react';

import styles from 'styles/sidebar.css';

class User extends React.Component {
    render() {
        return (
            <div className={styles.user}>
                <img className={styles.user_avatar} src={this.props.user.photo_url}/>
                <div className={styles.user_name}>{this.props.user.name}</div>
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
