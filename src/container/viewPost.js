import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {getComments} from '../actions/commentAction'
import {deletePost} from '../actions/commentAction'
import {votesIncreaseDecrease} from '../actions/commentAction'
import {postEdit} from '../actions/commentAction'
import {editPost} from '../actions/postAction'
import {connect} from 'react-redux'
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down'
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up'
import _ from 'lodash'
import serializeForm from 'form-serialize'
import {timestampToDate} from '../utils/dateChanger'
import {withRouter} from 'react-router-dom'

class ViewPost extends Component {
    state = {
        errorAuthor: '',
        errorContent: '',
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

    deletePost(id) {
        this.props.deletePost(id);
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
                                    <div className='card-content-comments'>
                                        <section className='body-style-comments'>
                                            {data.body}
                                            <div>{timestampToDate(data.timestamp)}</div>
                                            <div>{data.category}</div>
                                        </section>
                                    </div>
                                    <div className='card-button'>
                                        <button className="btn btn-danger button-styling"
                                                onClick={() => this.deletePost(data.id)}>
                                            Delete Post
                                        </button>
                                        <button className="btn btn-success button-styling">
                                            EditPost
                                        </button>
                                        <div className='buttons-position'>
                                            <TiThumbsUp
                                                className='icon-size'
                                                onClick={() => {
                                                    this.props.votesIncreaseDecrease(data.id, 'upVote')
                                                }}
                                            />
                                            <TiThumbsDown
                                                className='icon-size'
                                                onClick={() => {
                                                    this.props.votesIncreaseDecrease(data.id, 'downVote')
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
        getComments: getComments,
        editPost: editPost,
        deletePost: deletePost,
        votesIncreaseDecrease: votesIncreaseDecrease,
        postEdit: postEdit
    }, dipatch);
}

export default withRouter((connect(mapStateToProps, mapDispatchToProps)(ViewPost)));
