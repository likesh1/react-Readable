import {combineReducers} from 'redux'
import PostReducer from './post'
import CommentReducer from './comment'
import CategoryReducer from './category'
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
    posts: PostReducer,
    category: CategoryReducer,
    comment: CommentReducer,
    form: formReducer
});

export default rootReducer;
