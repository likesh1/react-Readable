import React, {Component} from 'react';
import PostsList from "../container/postsList";
import {Route} from 'react-router-dom'
import CreateList from "../container/createList";
import EditList from "../container/editPost";

export default class App extends Component {
    render() {
        return (

            <div>
                <Route
                    exact
                    path='/'
                    render={() => (
                        <PostsList/>
                    )}
                />
                <Route
                    path='/create'
                    render={() =>
                        <CreateList/>
                    }
                />
                <Route
                    path='/editPost'
                    render={() =>
                        <EditList/>
                    }
                />
                <link rel="stylesheet"
                      href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
            </div>
        );
    }
}

