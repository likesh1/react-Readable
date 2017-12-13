import {GET_POST, VOTE_INCREAMENT_DECREMENT} from '../actions/postAction'

export default function (state = [], action) {
    switch (action.type) {
        case GET_POST:
            console.log(action.payload.data);
            return [action.payload.data, ...state];
        case VOTE_INCREAMENT_DECREMENT:
            return [state[0].map((data) => {
                if (action.payload.data.id === data.id) {
                    return action.payload.data
                } else {
                    return data
                }
            })]


    }
    return state;
}