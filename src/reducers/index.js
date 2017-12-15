import {combineReducers} from 'redux';
import PostReducer from './post'
import CategoryReducer from './category'

const rootReducer = combineReducers({
    posts: PostReducer,
    category: CategoryReducer
});

export default rootReducer;
