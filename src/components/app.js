import React, {Component} from 'react';
import PostsList from "../container/postsList";
import {Switch, Route} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import CreateList from "../container/createList";
import CategoryByNameList from "../container/categoryByNameList";
import EditList from "../container/editPost";
import EditComment from "../container/editComment"
import ViewPost from '../container/viewPost';
import {ConnectedRouter} from 'react-router-redux'
import NotFound from "./NotFound";

export default class App extends Component {
    render() {

        return (

            <div>

                <Switch>

                    <Route
                        exact
                        path='/'
                        render={() => (
                            <PostsList
                            />
                        )}
                    />
                    <Route
                        path='/posts/new/create'
                        strict
                        exact
                        render={() =>
                            <CreateList
                            />
                        }
                    />
                    <Route
                        path='/editComment/:id'
                        render={(props) =>
                            <EditComment
                                {...props}
                            />
                        }
                    />
                    <Route
                        path='/editPost/:id'
                        render={(props) =>
                            <EditList
                                {...props}
                            />
                        }
                    />
                    <Route
                        path='/:category/:id'
                        render={(props) =>
                            <ViewPost
                                {...props}

                            />
                        }
                    />
                    <Route
                        path='/:category'
                        render={(props) =>
                            <CategoryByNameList
                                {...props}
                            />
                        }
                    />


                    <Route path="*" component={NotFound}/>
                </Switch>
                <link rel="stylesheet"
                      href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
            </div>
        );
    }
}

