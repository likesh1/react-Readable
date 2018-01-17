import React, {Component} from 'react';
import {Link} from 'react-router-dom'

class NotFound extends Component {
    render() {
        return (<div>
                <div className="header">
                    <div className="logo">
                        <h1><Link to="/">Ohh</Link></h1>
                    </div>
                </div>

                <div className="content">
                    <img src="../images/error-img.png" title="error"/>
                    <p><span><label>O</label>hh.....</span>You Requested the page that is no longer There.</p>
                    <Link to="/">Back To Home</Link>
                </div>

            </div>
        )
    }
}

export default NotFound;