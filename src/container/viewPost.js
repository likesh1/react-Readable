import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {getComments} from '../actions/commentAction'
import {deleteComment} from '../actions/commentAction'
import {votesIncreaseDecreaseComment} from '../actions/commentAction'
import {postEdit} from '../actions/commentAction'
import {editPost} from '../actions/postAction'
import {votesIncreaseDecreaseOnePost} from '../actions/postAction'
import {deletePost} from '../actions/postAction'
import {connect} from 'react-redux'
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down'
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up'
import _ from 'lodash'
import serializeForm from 'form-serialize'
import {timestampToDate} from '../utils/dateChanger'
import {Link} from 'react-router-dom'
import {getPosts} from '../actions/postAction'
import NotFound from "../components/NotFound";

class ViewPost extends Component {
    state = {
        errorAuthor: '',
        errorContent: '',
    }

    navig() {
        this.props.getPosts()
            .then(() => {
                this.props.history.push('/')
            })

    }

    componentWillMount() {
        console.log(this.props);
        const {match: {params}} = this.props;
        this.props.editPost(params.id)
        this.props.getComments(params.id)
    }


    handleSubmit = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, {hash: true});
        console.log(values)
        if (!values.comment) {
            this.setState({errorContent: 'Enter the comment'})
        } else {
            this.setState({errorContent: ''})
        }
        if (!values.author) {
            this.setState({errorAuthor: 'Enter the author'})
        } else {
            this.setState({errorAuthor: ''})
        }
        if (values.comment && values.author) {
            console.log('itishere')
            const {match: {params}} = this.props;
            this.props.postEdit(params.id, values.comment, values.author)
        }
    }

    deleteComment(id) {
        this.props.deleteComment(id);
    }

    editComment(id) {
        this.props.history.push(`/editComment/${id}`)
    }
    editPost(id) {
        this.props.history.push(`/editPost/${id}`)
    }

    deletePost(id) {
        console.log(id)
        this.props.deletePost(id).then(() => {
            this.props.getPosts()
                .then(() => {
                    this.props.history.push('/')
                })
        })
    }

    render() {
        console.log(this.props.posts.length)
        console.log(this.props.posts)
        console.log(_.isEmpty(this.props.posts[0]))
        if (_.isEmpty(this.props.posts[0])) {
            return (
                <NotFound/>
            )
        }
        if (!_.isEmpty(this.props.posts) && !_.isEmpty(this.props.comment)) {
            console.log(this.props.comment)
            console.log(this.props.comment[0])
            return (
                <div>
                    <div className="navbar">
                        <div
                            onClick={() => {
                                this.navig()
                            }}
                        >Home
                        </div>
                    </div>
                    <div className='card-body'>
                        <div className='card-content-comments'>
                            <h1>
                                {this.props.posts[0].title}
                            </h1>
                            <label>Posted by: {this.props.posts[0].author}</label>
                            <p>On: {timestampToDate(this.props.posts[0].timestamp)}</p>
                            <h4>Category: {this.props.posts[0].category}</h4>
                            <p>Content : {this.props.posts[0].body}</p>
                        </div>
                        <div className='card-button'>
                            <button className="btn btn-danger button-styling"
                                    onClick={() => this.deletePost(this.props.posts[0].id)}>
                                Delete Post
                            </button>
                            <button className="btn btn-success button-styling"
                                    onClick={() => this.editPost(this.props.posts[0].id)}>
                                EditPost
                            </button>
                            <div className='buttons-position'>
                                <TiThumbsUp
                                    className='icon-size'
                                    onClick={() => {
                                        this.props.votesIncreaseDecreaseOnePost(this.props.posts[0].id, 'upVote')
                                    }}
                                />
                                <TiThumbsDown
                                    className='icon-size'
                                    onClick={() => {
                                        this.props.votesIncreaseDecreaseOnePost(this.props.posts[0].id, 'downVote')
                                    }}
                                />
                            </div>
                            <div className='votes'>{this.props.posts[0].voteScore}</div>
                        </div>
                    </div>
                    <div className='card-up'>
                        {this.props.comment[0].map((data) => (
                            <div className="card" key={data.id}>
                                <div className="card-body">
                                    <div className='card-content-comments'>
                                        <section className='body-style-comments'>
                                            {data.body}
                                            <div>{timestampToDate(data.timestamp)}</div>
                                            <div>{data.category}</div>
                                        </section>
                                    </div>
                                    <div className='card-button'>
                                        <button className="btn btn-danger button-styling"
                                                onClick={() => this.deleteComment(data.id)}>
                                            Delete Post
                                        </button>
                                        <button className="btn btn-success button-styling"
                                                onClick={() => this.editComment(data.id)}>
                                            EditPost
                                        </button>
                                        <div className='buttons-position'>
                                            <TiThumbsUp
                                                className='icon-size'
                                                onClick={() => {
                                                    this.props.votesIncreaseDecreaseComment(data.id, 'upVote')
                                                }}
                                            />
                                            <TiThumbsDown
                                                className='icon-size'
                                                onClick={() => {
                                                    this.props.votesIncreaseDecreaseComment(data.id, 'downVote')
                                                }}
                                            />
                                        </div>
                                        <div className='votes'>{data.voteScore}</div>
                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>
                    <div id="comment_form">
                        <form onSubmit={this.handleSubmit}>
                            <div>
                                <textarea rows="10" name="comment" id="comment" placeholder="Comment"></textarea>
                                <div className="red">
                                    {this.state.errorContent}
                                </div>
                                <textarea rows="10" name="author" id="author" placeholder="Author"></textarea>
                                <div className="red">
                                    {this.state.errorAuthor}
                                </div>

                            </div>
                            <div>
                                <input type="submit" name="submit" value="Add Comment"></input>
                            </div>
                        </form>
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
        getPosts: getPosts,
        getComments: getComments,
        editPost: editPost,
        deleteComment: deleteComment,
        deletePost: deletePost,
        votesIncreaseDecreaseComment: votesIncreaseDecreaseComment,
        votesIncreaseDecreaseOnePost:votesIncreaseDecreaseOnePost,
        postEdit: postEdit
    }, dipatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(ViewPost));
