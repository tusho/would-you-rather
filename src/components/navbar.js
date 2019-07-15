import React, {Component} from 'react'
import { connect } from 'react-redux'

class Navbar extends Component {

    render() {

        const { authedUser } = this.props
        
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
                    {authedUser !== null && 
                        <li className="nav-item">
                            <a className="nav-link" href="#">Log Out</a>
                        </li>
                    }
                </ul>
            </div>
        )
    }

}

function mapStateToProps ({ authedUser }) {
  
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(Navbar)