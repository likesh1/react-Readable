import {
    GET_POST, LIST_UPDATE, CHANGE_ORDER, VOTE_INCREAMENT_DECREMENT, DELETE_LIST_ITEM,
    EDIT_LIST_ITEM, PUT_EDIT_POST
} from '../actions/postAction'
import _ from 'lodash'

export default function (state = [], action) {
    switch (action.type) {
        case GET_POST:
            return [_.sortByOrder(action.payload.data, ['voteScore'], ['desc']), ...state];
        case VOTE_INCREAMENT_DECREMENT:
            if (state.length !== 1) {
            return [_.sortByOrder(state[0].map((data) => {
                if (action.payload.data.id === data.id) {
                    return action.payload.data
                } else {
                    return data
                }
            }), ['voteScore'], ['desc'])];}else{
                return [action.payload.data]
            }
        case CHANGE_ORDER:
            return [_.sortByOrder(state[0], [`${action.payload}`], ['desc'])];
        case LIST_UPDATE:
            return [action.payload.data];
        case DELETE_LIST_ITEM:
            console.log(state[0].length)
            if (state.length !== 1) {
                const x = state[0].filter(
                    function (value) {
                        if (!(value.id === action.payload.data.id)) {
                            return value;
                        }
                    }
                );
                console.log(x);
                return [x];
            } else {
                return [state]
            }


        case EDIT_LIST_ITEM:
            console.log(action.payload.data)
            return [action.payload.data]
        case PUT_EDIT_POST:
            console.log(state)
            console.log(action)
            console.log(action.payload)
            console.log(action.y)
            const y = state.filter(
                function (value) {
                    if (!(value.id === action.payload.data)) {
                        return value;
                    }
                }
            );
            console.log(y);
            return [y];
    }
    return state;
}