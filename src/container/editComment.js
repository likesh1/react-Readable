import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {getCommentById} from '../actions/commentAction'
import {getComments} from '../actions/commentAction'
import {updateComment} from '../actions/commentAction'
import {editPost} from '../actions/postAction'
import {connect} from 'react-redux'
import serializeForm from 'form-serialize'
import {timestampToDate} from '../utils/dateChanger'

class EditComment extends Component {
    componentWillMount() {
        console.log(this.props);
        const {match: {params}} = this.props;
        this.props.getCommentById(params.id)
        // this.props.editPost(params.id)
        //   this.props.getComments(params.id)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.comment[0] !== nextProps.comment) {
            this.setState({content: nextProps.comment[0].body})
        }
    }

    state = {
        content: '',
        errorContent: '',
        redirectToNewPage: false
    }


    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.props.comment[0].parentId)
        const parentId = this.props.comment[0].parentId
        const values = serializeForm(e.target, {hash: true});
        if (!values.body) {
            this.setState({
                errorContent: 'Enter the content'
            })
        } else {
            this.setState({
                errorContent: ''
            })
        }
        if (values.body) {
            const {match: {params}} = this.props;

            console.log('valid')
            const id = params.id
            this.props.updateComment(id, values.body, () => {
                console.log('it is here')
                this.props.editPost(parentId)
                this.props.getComments(parentId)
                    .then(() => {
                        this.props.history.push('/viewPost/' + parentId)
                    })

            })
        }
    }

    settingValuesContent(event) {
        this.setState({content: event})
    }

    render() {
        if (this.state.redirectToNewPage) {
            <Redirect to='/'/>
        }
        if (this.props.comment[0]) {
            return (

                <form onSubmit={this.handleSubmit}>
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
                            <p>{this.props.comment[0].author}</p>
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
        comment: state.comment
    }
}

function mapDispatchToProps(dipatch) {
    return bindActionCreators({
        getCommentById: getCommentById,
        updateComment: updateComment,
        editPost: editPost,
        getComments: getComments
    }, dipatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(EditComment));