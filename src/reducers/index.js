import {combineReducers} from 'redux'
import PostReducer from './post'
import CategoryReducer from './category'
import {reducer as formReducer} from 'redux-form'

const rootReducer = combineReducers({
    posts: PostReducer,
    category: CategoryReducer,
    form: formReducer
});

export default rootReducer;
