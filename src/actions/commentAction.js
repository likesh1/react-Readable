import axios from 'axios'
import {guid} from '../utils/guid'

export const GET_COMMENT = "GET_COMMENT";
export const VOTE_INCREAMENT_DECREMEN_COMMENT = "VOTE_INCREAMENT_DECREMEN_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const ADD_COMMENT = "ADD_COMMENT";
export const AUTH_HEADERS = {'Authorization': 'whatever-you-want', 'Accept': 'application/json',};
export const ROOT_URL = "http://localhost:3001";
axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

export function getComments(id) {
    console.log(id);
    const url = `${ROOT_URL}/posts/${id}/comments`;
    const request = axios.get(url)
    console.log(request)
    return {
        type: GET_COMMENT,
        payload: request
    }
}

export function deletePost(id) {
    console.log(id);
    const url = `${ROOT_URL}/comments/${id}`;
    const request = axios.delete(url);
    return {
        type: DELETE_COMMENT,
        payload: request
    }
}

export function votesIncreaseDecrease(id, voteType) {
    console.log(id)
    console.log(voteType)
    const url = `${ROOT_URL}/comments/${id}`
    const request = axios.post(url, {option: voteType})
    return {
        type: VOTE_INCREAMENT_DECREMEN_COMMENT,
        payload: request
    }
}

export function postEdit(parentId, body, author) {
    const data = {
        id: guid(),
        timestamp: Date.now(),
        body,
        author,
        parentId
    }
    const url = `${ROOT_URL}/comments`
    const request = axios.post(url, data)
    console.log(request)
    return {
        type: ADD_COMMENT,
        payload: request
    }
}