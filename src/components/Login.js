import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {

    handleSelectUser(e) {
        console.log('This is the target value: ' + e.target.value);
        const { dispatch } = this.props

        dispatch(setAuthedUser(e.target.value))
    }

    render() {
        const { users, dispatch } = this.props
        return (
        <div className="card">
            <div className="card-body">
                <div className="card-header">Welcome to the Would-You-Rather App</div>
                <div className="card-body">
                    <select className="dropdown" defaultValue={'none'} onChange={(e) => dispatch(setAuthedUser (e.target.value))}>
                    <option value="none" disabled>Select User</option>
                        {Object.keys(users).map(user => <option value={user} key={user}>{users[user].name}</option>)}
                    </select>
                </div>
            </div>
        </div>
        )
    }
}

function mapStateToProps ({ users, authedUser }) {

    return {
        users,
        authedUser,
    }
}

export default connect(mapStateToProps)(Login)