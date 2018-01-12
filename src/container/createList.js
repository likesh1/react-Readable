import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form'
import {createPost} from '../actions/postAction'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Redirect} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router-dom'


class CreateList extends Component {
    componentWillMount() {
        console.log(this.props)
    }

    state = {
        redirectToNewPage: false
    }

    renderField(field) {
        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
        const className1 = 'red'
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className='form-control'
                    type='text'
                    {...field.input}
                />
                <div className={className1}>
                    {field.meta.touched ? field.meta.error : ''}
                </div>

            </div>
        )
    }

    renderTagField(field) {
        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
        const className1 = 'red'
        return (
            <div>
                <label>{field.label}</label>
                <div className={className}>
                    <select {...field.input} className='form-control'>
                        <option value=''>Select Category</option>
                        <option value='react'>React</option>
                        <option value='redux'>Redux</option>
                        <option value='udacity'>Udacity</option>
                    </select>
                </div>
                <div className={className1}>
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        console.log(values);
        this.props.createPost(values, () => {
            this.props.history.push('/')
        });
    }


    colors = ['react', 'redux', 'udacity'];

    render() {

        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label='Title'
                    name='title'
                    component={this.renderField}
                />
                <Field
                    label='Content'
                    name='body'
                    component={this.renderField}
                />
                <Field
                    label='Author'
                    name='author'
                    component={this.renderField}
                />
                <Field
                    name="category"
                    label='Category'
                    component={this.renderTagField}/>
                <button type='sumbit' className='btn btn-success'>Submit</button>
            </form>
        )
    }
}

function validate(values) {
    const error = {}
    if (!values.title) {
        error.title = 'Enter the title';
    }
    if (!values.body) {
        error.body = 'Enter the body';
    }
    if (!values.author) {
        error.author = 'Enter the author';
    }
    if (!values.category) {
        error.category = 'Enter the category';
    }
    return error;

}

function mapDispatchToProps(dipatch) {
    return bindActionCreators({
        createPost: createPost
    }, dipatch);
}

export default withRouter(reduxForm({
        validate: validate,
        form: 'PostsNewForm'
    })(
    connect(null, mapDispatchToProps)(CreateList)
    )
)
