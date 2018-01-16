import {
    GET_COMMENT,
    DELETE_COMMENT,
    VOTE_INCREAMENT_DECREMEN_COMMENT,
    ADD_COMMENT,
    GET_COMMENT_BY_ID
} from "../actions/commentAction";

export default function (state = [], action) {
    let x;
    switch (action.type) {
        case GET_COMMENT:
            return [action.payload.data]
        case DELETE_COMMENT:
            x= state[0].filter(
                function (value) {
                    if (!(value.id === action.payload.data.id)) {
                        return value;
                    }
                }
            );
            return [x];
        case VOTE_INCREAMENT_DECREMEN_COMMENT:
            return [state[0].map((data) => {
                if (action.payload.data.id === data.id) {
                    return action.payload.data
                } else {
                    return data
                }
            })];
        case ADD_COMMENT:
            return [[...state[0], action.payload.data]]
        case GET_COMMENT_BY_ID:
            console.log(action.payload)
            return [action.payload.data]
    }
    return state;
}