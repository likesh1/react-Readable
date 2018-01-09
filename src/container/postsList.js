import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {getPosts} from '../actions/postAction'
import {editPost} from '../actions/postAction'
import {deletePost} from '../actions/postAction'
import {votesIncreaseDecrease} from '../actions/postAction'
import {getCategoryList} from '../actions/categoryAction'
import {listByName} from '../actions/postAction'
import {changeOrder} from '../actions/postAction'
import {connect} from 'react-redux'
import CategoryList from './categoryList'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import {timestampToDate} from '../utils/dateChanger'
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down'
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up'
import _ from 'lodash'

class PostsList extends Component {
    componentWillMount() {
        this.props.getPosts();
        this.props.getCategoryList();
    }

    deletePost(id) {
        this.props.deletePost(id);
        // this.props.history.push('/');
    }

    toEditPost(id) {
        this.props.history.push('/editPost/' + id)

    }


    render() {
        console.log(this.props.posts[0]);
        if (_.isEmpty(this.props.posts[0])) {
            return (<div className='body-styling'>
                <div className='side-content'>
                    <div>
                        <ul className="w3-ul w3-card w3-hoverable">
                            <CategoryList
                                category={this.props.category}/>
                        </ul>
                    </div>
                </div>
                <div className='main-content'>
                    <div className='sort-dropdown'>
                        <div className='dropdown-sortlist'>Sort By: <select onChange={event => {
                            this.props.changeOrder(event.target.value)
                        }}>
                            <option value='voteScore'>Vote</option>
                            <option value='timestamp'>Dates</option>
                        </select>
                        </div>
                        <div className='create-button'>
                            <Link className='btn btn-success'
                                  to='create'>Create Post</Link>
                        </div>
                    </div>
                    <div className='card-up'>
                        <div className="card">NO cards to show</div>
                    </div>
                </div>
            </div>)
        } else {
            return (
                <div className='body-styling'>
                    <div className='side-content'>
                        <div>
                            <ul className="w3-ul w3-card w3-hoverable">
                                <CategoryList
                                    category={this.props.category}/>
                            </ul>
                        </div>
                    </div>
                    <div className='main-content'>
                        <div className='sort-dropdown'>
                            <div className='dropdown-sortlist'>Sort By: <select onChange={event => {
                                this.props.changeOrder(event.target.value)
                            }}>
                                <option value='voteScore'>Vote</option>
                                <option value='timestamp'>Dates</option>
                            </select>
                            </div>
                            <div className='create-button'>
                                <Link className='btn btn-success'
                                      to='create'>Create Post</Link>
                            </div>
                        </div>
                        <div className='card-up'>
                            {this.props.posts[0].map((data) => (

                                <div className="card" key={data.id}>
                                    <div className="card-body">

                                        <div className='card-content'>
                                            <h3>{data.title}</h3>
                                            <h7 className='author-style'>Author: {data.author}</h7>
                                            <section className='body-style'>
                                                {data.body}
                                                <div>{timestampToDate(data.timestamp)}</div>
                                                <div>{data.category}</div>
                                                <div>Comments: {data.commentCount}</div>
                                            </section>
                                        </div>
                                        <div className='card-button'>
                                            <button className="btn btn-danger button-styling"
                                                    onClick={() => this.deletePost(data.id)}
                                            >Delete Post
                                            </button>
                                            <button className="btn btn-success button-styling"
                                                    onClick={() => this.toEditPost(data.id)}>Edit
                                                Post
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
                                                    }}/>
                                            </div>
                                            <div className='votes'>{data.voteScore}</div>
                                        </div>

                                    </div>
                                </div>))}
                        </div>
                    </div>
                </div>

            );
        }
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        category: state.category
    }
}

function mapDispatchToProps(dipatch) {
    return bindActionCreators({
        getPosts: getPosts,
        votesIncreaseDecrease: votesIncreaseDecrease,
        changeOrder: changeOrder,
        listByName: listByName,
        deletePost: deletePost,
        editPost: editPost,
        getCategoryList: getCategoryList
    }, dipatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);