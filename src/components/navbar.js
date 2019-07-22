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
    
    componentWillMount() {
        document.addEventListener('mousedown', this.handleDropdownClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleDropdownClick, false);
    }

    handleDropdownClick = (e) => {
        const { resetAuthedUser } = this.props
        if (this.state.showLogout === true) {
            if (this.node.contains(e.target)) {
                resetAuthedUser()
                this.setState(() => ({showLogout: !this.state.showLogout}))
                return;
            }
            this.setState(() => ({showLogout: !this.state.showLogout}))
        }
    }
    
    handleClick() {
        this.setState(() => ({showLogout: !this.state.showLogout}))
    }
    

    render() {

        const { authedUser, user } = this.props
        
        return (
            <div className='navbar navbar-expand-lg navbar-light'>
                <ul className='navbar-nav'>
                    <li className='nav-item active'>
                        <a className='nav-link' href='#'>Home <span className='sr-only'>(current)</span></a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='#'>New Question</a>
                    </li>
                    <li className='nav-item'>
                        <a className='nav-link' href='#'>Leaderboard</a>
                    </li>
                </ul>
                {authedUser !== null &&
                        <div className='nav-item'>
                            {user !== null && 
                                <div className='dropdown'>
                                    <button className='btn btn-default dropdown-toggle' onClick={this.handleClick}>
                                        <img src={user.avatarURL} className='avatar' alt={`Avatar of ${authedUser}`} />
                                    </button>
                                    {this.state.showLogout && 
                                        <ul className='logout' ref={ node => this.node = node }>
                                            <a role='menuitem' onClick={(e) => this.handleDropdownClick(e)}>Log Out</a>
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

function mapStateToProps ({ authedUser, users, dispatch }) {
  
    return {
        authedUser,
        user: users[authedUser],
        dispatch,
    }
}

function mapDispatchToProps (dispatch) {

    return {
        resetAuthedUser: () => {
            dispatch(resetAuthedUser())
          }
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)