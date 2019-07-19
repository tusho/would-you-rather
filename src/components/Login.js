import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {

    render() {
        const { users, setAuthedUser } = this.props
        return (
        <div className="card">
            <div className="card-body">
                <div className="card-header">Welcome to the Would-You-Rather App</div>
                <div className="card-body">
                    <select className="dropdown" defaultValue={'none'} onChange={(e) => setAuthedUser(e.target.value)}>
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

function mapDispatchToProps (dispatch) {

    return {
        setAuthedUser: (id) => {
            dispatch(setAuthedUser(id))
          }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Login)