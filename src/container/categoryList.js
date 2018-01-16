import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {listByName} from '../actions/postAction'
import {connect} from 'react-redux'
import {getPosts} from '../actions/postAction'
import {withRouter} from 'react-router-dom'

class CategoryList extends Component {


    categoryRoute(categoryName) {
        this.props.listByName(categoryName)
            .then(() => {
                this.props.history.push(`/${categoryName}`)
            })
    }

    categoryAll() {
        this.props.getPosts()
            .then(() => {
                this.props.history.push(`/`)
            })
    }


    render() {
        const {category, getPosts, listByName} = this.props;
        console.log(this.props.category[0])
        if (category.length === 0) {
            return <div>Loading</div>
        } else {
            return (
                <div className='category-list'>
                    <li onClick={() => {
                        this.categoryAll()
                    }} value='0'>All
                    </li>
                    {category[0].categories.map((data) =>
                        <li onClick={() => this.categoryRoute(data.name)} key={data.name}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryList));