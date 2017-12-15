import axios from 'axios'

export const AUTH_HEADERS = {'Authorization': 'whatever-you-want', 'Accept': 'application/json',};
export const ROOT_URL = "http://localhost:3001";
export const GET_CATEGORY = "GET_CATEGORY";
axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

export function getCategoryList() {
    const url = `${ROOT_URL}/categories`;
    const request = axios.get(url);
    console.log(request);
    return {
        type: GET_CATEGORY,
        payload: request
    }

}