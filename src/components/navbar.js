import React, {Component} from 'react'
import { connect } from 'react-redux'
import { resetAuthedUser } from '../actions/authedUser';

class Navbar extends Component {
    state = {showLogout: true};
    
    constructor(props) {
        super(props);
        this.state = {showLogout: false};
        this.handleClick = this.handleClick.bind(this);
      }
    
    handleClick() {
        this.setState(() => ({showLogout: !this.state.showLogout}))
    }

    render() {

        const { authedUser, user, dispatch } = this.props
        
        return (
            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">New Question</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Leaderboard</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Username</a>
                    </li>
                </ul>
                {authedUser !== null &&
                        <div className="nav-item">
                            {user !== null && 
                                <div className="dropdown">
                                    <button className="btn btn-default dropdown-toggle" onClick={this.handleClick}>
                                        <img src={user.avatarURL} className='avatar' alt={`Avatar of ${authedUser}`} />
                                    </button>
                                    {this.state.showLogout && 
                                        <ul className="logout">
                                            <a role="menuitem" onClick={() => dispatch(resetAuthedUser())}>Log Out</a>
                                        </ul>
                                    }
                                </div>
                            }
                        </div>
                }
            </div>
        )
    }

}

function mapStateToProps ({ authedUser, users } ) {
  
    return {
        authedUser,
        user: users[authedUser],
    }
}

export default connect(mapStateToProps)(Navbar)