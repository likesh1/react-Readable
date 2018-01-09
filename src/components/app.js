import React, {Component} from 'react';
import PostsList from "../container/postsList";
import {Switch, Route} from 'react-router-dom'
import CreateList from "../container/createList";
import EditList from "../container/editPost";

export default class App extends Component {
    render() {
        return (

            <div>
                <Switch>
                    <Route
                        exact
                        path='/'
                        render={({history}) => (
                            <PostsList
                                history={history}
                            />
                        )}
                    />
                    <Route
                        path='/create'
                        render={({history}) =>
                            <CreateList
                                history={history}
                            />
                        }
                    />
                    <Route
                        path='/editPost/:id'
                        render={(props) =>
                            <EditList
                                {...props}
                                // history={history}
                            />
                        }
                    />
                </Switch>
                <link rel="stylesheet"
                      href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
            </div>
        );
    }
}

