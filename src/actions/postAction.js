import axios from 'axios'
import {guid} from '../utils/guid'

export const GET_POST = "GET_POST";
export const CREATE_POST = "CREATE_POST";
export const VOTE_INCREAMENT_DECREMENT = "VOTE_INCREAMENT_DECREMENT";
export const CHANGE_ORDER = 'CHANGE_ORDER'
export const DELETE_LIST_ITEM = 'DELETE_LIST_ITEM'
export const EDIT_LIST_ITEM = 'EDIT_LIST_ITEM'
export const LIST_UPDATE = 'LIST_UPDATE'
export const AUTH_HEADERS = {'Authorization': 'whatever-you-want', 'Accept': 'application/json',};
export const ROOT_URL = "http://localhost:3001";
axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

export function getPosts() {
    const url = `${ROOT_URL}/posts`;
    const request = axios.get(url);
    return {
        type: GET_POST,
        payload: request
    }

}


export function votesIncreaseDecrease(id, voteType) {
    const url = `${ROOT_URL}/posts/${id}`
    const request = axios.post(url, {option: voteType})
    return {
        type: VOTE_INCREAMENT_DECREMENT,
        payload: request
    }
}

export function changeOrder(postList) {
    return {
        type: CHANGE_ORDER,
        payload: postList
    }
}

export function listByName(name) {
    const url = `${ROOT_URL}/${name}/posts`;
    const request = axios.get(url);
    return {
        type: LIST_UPDATE,
        payload: request
    }
}

export function deletePost(id) {
    const url = `${ROOT_URL}/posts/${id}`
    const request = axios.delete(url);
    return {
        type: DELETE_LIST_ITEM,
        payload: request
    }
}

export function editPost(id) {
    console.log(id)
    const url = `${ROOT_URL}/posts/${id}`
    const request = axios.get(url)
    console.log(request)
    return {
        type: EDIT_LIST_ITEM,
        payload: request
    }
}

export function createPost(values, callback) {
    console.log(values)
    const {title, content, author, category} = values;

    const data = {
        id: guid(),
        timestamp: Date.now(),
        title,
        content,
        author,
        category
    }
    const url = `${ROOT_URL}/posts`
    const request = axios.post(url, data)
        .then(() => callback());
    return {
        type: CREATE_POST,
        payload: request
    }
}
