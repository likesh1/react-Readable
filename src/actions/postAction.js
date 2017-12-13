import axios from 'axios'

export const GET_POST = "GET_POST";
export const VOTE_INCREAMENT_DECREMENT = "VOTE_INCREAMENT_DECREMENT";
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