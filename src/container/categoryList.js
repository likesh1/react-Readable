import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {listByName} from '../actions/postAction'
import {connect} from 'react-redux'
import {getPosts} from '../actions/postAction'

class CategoryList extends Component {
    render() {
        console.log(this.props.category[0])
        if (this.props.category.length === 0) {
            return <div>Loading</div>
        } else {
            return (
                <div className='category-list'>
                    <li onClick={event => this.props.getPosts()} value='0'>All</li>
                    {this.props.category[0].categories.map((data) =>
                        <li onClick={event => this.props.listByName(data.name)} key={data.name}>
                            {data.name.toUpperCase()}
                        </li>)
                    }
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    }
}

function mapDispatchToProps(dipatch) {
    return bindActionCreators({
        getPosts: getPosts,
        listByName: listByName
    }, dipatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);