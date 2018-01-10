import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {getComments} from '../actions/commentAction'
import {editPost} from '../actions/postAction'
import {connect} from 'react-redux'
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down'
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up'
import _ from 'lodash'
import {timestampToDate} from '../utils/dateChanger'

class ViewPost extends Component {
    componentWillMount() {
        console.log(this.props);
        const {match: {params}} = this.props;
        this.props.editPost(params.id)
        this.props.getComments(params.id)
    }

    render() {

        if (!_.isEmpty(this.props.posts) && !_.isEmpty(this.props.comment)) {
            console.log(this.props.comment)
            return (
                <div>
                    <div>
                        <h1>
                            {this.props.posts[0].title}
                        </h1>
                        <label>Posted by: {this.props.posts[0].author}</label>
                        <p>On: {timestampToDate(this.props.posts[0].timestamp)}</p>
                        <h4>Category: {this.props.posts[0].category.toLocaleUpperCase()}</h4>
                        <p>Content : {this.props.posts[0].body}</p>
                    </div>
                    <div className='card-up'>
                        {this.props.comment[0].map((data) => (
                            <div className="card" key={data.id}>
                                <div className="card-body">

                                    <div className='card-content'>
                                        <section className='body-style'>
                                            {data.body}
                                            <div>{timestampToDate(data.timestamp)}</div>
                                            <div>{data.category}</div>
                                        </section>
                                        <div className='card-button'>
                                            <button className="btn btn-danger button-styling">
                                                Delete Post
                                            </button>
                                            <button className="btn btn-success button-styling">
                                                EditPost
                                            </button>
                                            <div className='buttons-position'>
                                                <TiThumbsUp
                                                    className='icon-size'
                                                />
                                                <TiThumbsDown
                                                    className='icon-size'
                                                />
                                            </div>
                                            <div className='votes'>{data.voteScore}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            )
        } else {
            return (<div> Loading... </div>)
        }
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        comment: state.comment
    }
}

function mapDispatchToProps(dipatch) {
    return bindActionCreators({
        getComments: getComments,
        editPost: editPost
    }, dipatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(ViewPost));
