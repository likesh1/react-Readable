import {GET_POST, LIST_UPDATE, CHANGE_ORDER, VOTE_INCREAMENT_DECREMENT} from '../actions/postAction'
import _ from 'lodash'

export default function (state = [], action) {
    switch (action.type) {
        case GET_POST:
            return [_.sortByOrder(action.payload.data, ['voteScore'], ['desc']), ...state];
        case VOTE_INCREAMENT_DECREMENT:
            console.log([_.sortByOrder(state[0].map((data) => {
                if (action.payload.data.id === data.id) {
                    return action.payload.data
                } else {
                    return data
                }
            }), ['voteScore'], ['desc'])])
            return [_.sortByOrder(state[0].map((data) => {
                if (action.payload.data.id === data.id) {
                    return action.payload.data
                } else {
                    return data
                }
            }), ['voteScore'], ['desc'])];
        case CHANGE_ORDER:
            return [_.sortByOrder(state[0], [`${action.payload}`], ['desc'])];
        case LIST_UPDATE:
            return [action.payload.data];
    }
    return state;
}