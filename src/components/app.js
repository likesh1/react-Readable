import React, {Component} from 'react';
import PostsList from "../container/postsList";


export default class App extends Component {


    render() {
        return (

            <div >
                <PostsList/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
            </div>
        );
    }
}

