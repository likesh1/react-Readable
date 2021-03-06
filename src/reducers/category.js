import _ from 'lodash';
import {GET_CATEGORY} from '../actions/categoryAction'

export default function (state = [], action) {
    switch (action.type) {
        case GET_CATEGORY:
            return [action.payload.data]
    }
    return state;
}