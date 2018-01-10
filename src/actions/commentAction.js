import axios from 'axios'

export const GET_COMMENT = "GET_COMMENT";
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