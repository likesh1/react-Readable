import axios from 'axios'
import {guid} from '../utils/guid'

export const GET_POST = "GET_POST";
export const CREATE_POST = "CREATE_POST";
export const VOTE_INCREAMENT_DECREMENT = "VOTE_INCREAMENT_DECREMENT";
export const VOTE_INCREAMENT_DECREMENT_ONE_POST = "VOTE_INCREAMENT_DECREMENT_ONE_POST";
export const CHANGE_ORDER = 'CHANGE_ORDER'
export const DELETE_LIST_ITEM = 'DELETE_LIST_ITEM'
export const EDIT_LIST_ITEM = 'EDIT_LIST_ITEM'
export const LIST_UPDATE = 'LIST_UPDATE'
export const PUT_EDIT_POST = 'PUT_EDIT_POST'
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

export function votesIncreaseDecreaseOnePost(id, voteType) {
    const url = `${ROOT_URL}/posts/${id}`
    const request = axios.post(url, {option: voteType})
    return {
        type: VOTE_INCREAMENT_DECREMENT_ONE_POST,
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

export function deletePostCallback(id, callback) {
    const url = `${ROOT_URL}/posts/${id}`
    const request = axios.delete(url).then(() => callback)
    console.log(request)
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

export function putEditPost(id, params, callback) {
    console.log(id);
    console.log(params);
    const {title, body} = params;
    const data = {
        title,
        body
    }
    const url = `${ROOT_URL}/posts/${id}`
    const request = axios.put(url, data)
        .then(() => callback());
    console.log(request);
    // return{
    //     type:PUT_EDIT_POST,
    //     payload:request
    // }
}

export function createPost(values, callback) {
    console.log(values)
    const {title, body, author, category} = values;

    const data = {
        id: guid(),
        timestamp: Date.now(),
        title,
        body,
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
