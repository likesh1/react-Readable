import {GET_POST, CHANGE_ORDER, VOTE_INCREAMENT_DECREMENT} from '../actions/postAction'
import _ from 'lodash'

export default function (state = [], action) {
    switch (action.type) {
        case GET_POST:
            return [action.payload.data, ...state];
        case VOTE_INCREAMENT_DECREMENT:
            return [state[0].map((data) => {
                if (action.payload.data.id === data.id) {
                    return action.payload.data
                } else {
                    return data
                }
            })];
        case CHANGE_ORDER:
            console.log([_.sortBy(state[0].reverse(), `${action.payload}`)])
            return [_.sortBy(state[0], [`${action.payload}`])]


    }
    return state;
}