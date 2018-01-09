import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {bindActionCreators} from 'redux';
import {editPost} from '../actions/postAction'
import {putEditPost} from '../actions/postAction'
import serializeForm from 'form-serialize'
import {Redirect} from 'react-router-dom'

class EditList extends Component {

    state = {
        title: '',
        content: '',
        author: '',
        errortitle: '',
        errorContent: '',
        redirectToNewPage: false
    }

    componentWillMount() {
        console.log(this.props);
        const {match: {params}} = this.props;
        this.props.editPost(params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.posts[0] !== nextProps.posts) {
            this.setState({title: nextProps.posts[0].title})
            this.setState({content: nextProps.posts[0].body})
            this.setState({author: nextProps.posts[0].author})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const values = serializeForm(e.target, {hash: true});
        if (!values.title) {
            this.setState({
                errortitle: 'Enter the title'
            })
        } else {
            this.setState({
                errortitle: ''
            })
        }
        if (!values.body) {
            this.setState({
                errorContent: 'Enter the content'
            })
        } else {
            this.setState({
                errorContent: ''
            })
        }
        if (values.title && values.body) {
            const {match: {params}} = this.props;
            console.log('valid')
            const id = params.id
            this.props.putEditPost(id, values, () => {
                // this.props.router.push('/');
                this.props.history.replace('/');
                //   this.setState({redirectToNewPage: true})
            });
        }
    }

    settingValuesTitle(event) {
        this.setState({title: event})
    }

    settingValuesContent(event) {
        this.setState({content: event})
    }


    render() {
        if (this.state.redirectToNewPage) {
            return (
                <Redirect to="/"/>
            )
        }
        if (this.props.posts[0]) {

            // console.log(this.props.posts[0])
            // console.log(this.props.posts[0].title)

            return (

                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Title</label>
                        <div>
                            <input
                                name='title'
                                className='form-control'
                                // required={}
                                value={this.state.title}
                                onChange={event => {
                                    this.settingValuesTitle(event.target.value, event.target.name)
                                }}
                            />
                            <div className="red">
                                {this.state.errortitle}
                            </div>
                        </div>

                    </div>
                    <div>
                        <label>Content</label>
                        <div>
                            <input
                                name='body'
                                className='form-control'
                                value={this.state.content}
                                onChange={event => {
                                    this.settingValuesContent(event.target.value, event.target.name)
                                }}
                            />
                        </div>
                        <div className="red">
                            {this.state.errorContent}
                        </div>
                    </div>
                    <div>
                        <label>Author</label>
                        <div>
                            <p>{this.state.author}</p>
                        </div>
                        <button>Submit</button>
                    </div>

                </form>

            )
        } else {

            return (
                <div> loading</div>
            )
        }
    }

}


function mapStateToProps(state) {
    return {
        posts: state.posts,
    }
}

function mapDispatchToProps(dipatch) {
    return bindActionCreators({
        editPost: editPost,
        putEditPost: putEditPost
    }, dipatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(EditList));