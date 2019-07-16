import React, { Component } from 'react'
import { connect } from 'react-redux'

class Login extends Component {

    handleSelectUser(e) {
        console.log(e.target.value);
    }

    render() {
        const { users } = this.props
        return (
        <div>
            <div className="dropdown">
                 <select defaultValue={'none'} onChange={this.handleSelectUser}>
                  <option value="none" disabled>Select User</option>
                    {Object.keys(users).map(user => <option value={user} key={user}>{users[user].name}</option>)}
                  </select>
                </div>
        </div>
        )
    }
}

function mapStateToProps ({ users }) {

    return {
        users,
    }
}

export default connect(mapStateToProps)(Login)