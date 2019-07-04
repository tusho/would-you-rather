import React, {Component} from 'react'

class NavBar extends Component {

    render() {
        
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
                    <li className="nav-item">
                        <a className="nav-link" href="#">Log Out</a>
                    </li>
                </ul>
            </div>
        )
    }

}

export default NavBar