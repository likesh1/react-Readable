import React, {Component} from 'react';
import PostsList from "../container/postsList";


export default class App extends Component {


    render() {
        return (

            <div >
                <PostsList/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
            </div>
        );
    }
}

