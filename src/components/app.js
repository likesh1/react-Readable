import React, {Component} from 'react';
import PostsList from "../container/postsList";
import {Switch, Route} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import CreateList from "../container/createList";
import EditList from "../container/editPost";
import ViewPost from '../container/viewPost';
import {ConnectedRouter} from 'react-router-redux'

export default class App extends Component {
    render() {

        return (

            <div>
                {/*<ConnectedRouter history={history}>*/}
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
                            path='/viewPost/:id'
                            render={(props,history) =>
                                <ViewPost
                                    {...props}
                                    history={history}
                                />
                            }
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
                            render={(props,history) =>
                                <EditList
                                    {...props}
                                    history={history}
                                />
                            }
                        />
                    </Switch>
                {/*</ConnectedRouter>*/}
                <link rel="stylesheet"
                      href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
            </div>
        );
    }
}

