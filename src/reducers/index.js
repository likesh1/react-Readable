import {combineReducers} from 'redux';
import PostReducer from './post'

const rootReducer = combineReducers({
    posts: PostReducer
});

export default rootReducer;
