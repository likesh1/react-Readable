import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {getPosts} from '../actions/postAction'
import {votesIncreaseDecrease} from '../actions/postAction'
import {getCategoryList} from '../actions/categoryAction'
import {listByName} from '../actions/postAction'
import {changeOrder} from '../actions/postAction'
import {connect} from 'react-redux'
import {timestampToDate} from '../utils/dateChanger'
import TiThumbsDown from 'react-icons/lib/ti/thumbs-down'
import TiThumbsUp from 'react-icons/lib/ti/thumbs-up'
import _ from 'lodash'

class PostsList extends Component {
    componentWillMount() {
        this.props.getPosts();
        this.props.getCategoryList();
    }

    renderCategoryList(listCategory) {
        console.log(listCategory[0])

        const x = listCategory[0].categories.map((data) =>
            <li onClick={event => this.props.listByName(data.name)} key={data.name}>
                {data.name.toUpperCase()}
            </li>)
        return x
    }

    render() {

        if (_.isEmpty(this.props.posts[0])) {
            return <div className="card">NO cards to show</div>
        } else {
            return (

                <div className='body-styling'>
                    <div className='side-content'>
                        <div>
                            <ul className="w3-ul w3-card w3-hoverable">
                                <li onClick={event => this.props.getPosts()} value='0'>All</li>
                                {this.renderCategoryList(this.props.category)}
                            </ul>
                        </div>
                    </div>
                    <div className='main-content'>
                        <div>
                            Sort By: <select onChange={event => {
                            this.props.changeOrder(event.target.value)
                        }}>
                            <option value='voteScore'>Vote</option>
                            <option value='timestamp'>Dates</option>
                        </select>
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
                                            <button className="btn btn-danger button-styling">Delete Post</button>
                                            <button className="btn btn-success button-styling">Edit Post</button>
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
        getCategoryList: getCategoryList
    }, dipatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);