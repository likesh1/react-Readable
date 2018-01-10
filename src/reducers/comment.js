import {GET_COMMENT} from "../actions/commentAction";

export default function (state = [], action) {
    switch (action.type) {
        case GET_COMMENT:
            console.log(action.payload)
            return [action.payload.data]
    }
    return state;
}