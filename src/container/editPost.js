import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {bindActionCreators} from 'redux';


class EditList extends Component {
    onSubmit(values) {
        console.log(values);
        // this.props.history.push(`/`);
        // this.props.createPost(values, () => {
        //     // this.props.router.push('/');
        //     this.setState({ redirectToNewPage: true })
        // });

    }


    renderField(field) {
        console.log(field)
        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
        const className1 = 'red'
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className='form-control'
                    type='text'
                    {...field.input}
                    value={field.name}
                />
                <div className={className1}>
                    {field.meta.touched ? field.meta.error : ''}
                </div>

            </div>
        )
    }


    render() {
        console.log(this.props.posts)

        const {handleSubmit} = this.props;
        if (this.props.posts.length !== 0) {
            const {title, content, author} = this.props.posts[0]

            return (

                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    <Field
                        label='Title'
                        name={title}
                        component={this.renderField}
                    />
                    <Field
                        label='Content'
                        name={content}
                        component={this.renderField}
                    />
                    <Field
                        label='Author'
                        name={author}
                        component={this.renderField}
                    />
                    <button type='sumbit' className='btn btn-success'>Submit</button>
                </form>
            )
        } else {
            return (
                <div> loading</div>
            )
        }
    }

}

function validate(values) {
    const error = {}
    if (!values.title) {
        error.title = 'Enter the title';
    }
    if (!values.content) {
        error.content = 'Enter the content';
    }
    if (!values.author) {
        error.author = 'Enter the author';
    }
    return error;

}

function mapStateToProps(state) {
    return {
        title: state.posts,
    }
}

export default reduxForm({
    validate: validate,
    form: 'PostsEditForm',
    // initialValues: {
    //     title: title,
    //     content: this.content,
    //     author: this.author
    // }
})(connect(mapStateToProps)(EditList));