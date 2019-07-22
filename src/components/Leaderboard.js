import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {



  render() {
    
    const { users } = this.props;

    return (
      <div>
        <h3 className='text-center'>Leaderboard</h3>
          <ul className='list-unstyled'>
              {users !== null && Object.values(users).map((user) => (
                  <li className='question d-flex flex-column' key={user.id}>
                      <div className='row'>
                        <div className='col-2'><img src={user.avatarURL} className='avatar' alt={`Avatar of ${user.name}`} /></div>
                        <div className='col-6'>
                            <h3>{user.name}</h3>
                            <p>Questions answered: {Object.keys(user.answers).length}</p>
                            <p>Questions created: {Object.keys(user.questions).length}</p>
                        </div>
                        <div className='col-2'>Your Score: {Object.keys(user.answers).length + Object.keys(user.questions).length}</div>
                      </div>
                  </li>
              ))}
          </ul>
      </div>
    )

  }

}


function mapStateToProps ({ users }) {

  return {
    users
  }

}


export default connect(mapStateToProps)(Dashboard)