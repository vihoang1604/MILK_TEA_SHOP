import axios from 'axios';
import * as Config from './../Config/config';

export default function callApi(endpoint, method = 'POST', body) {
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body
    })
};

export function callApiDotNet(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `${Config.API_URL_DOTNET}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    });
};

export function callApiOrder(endpoint, method = 'POST', body) {
    return axios({
        method: method,
        url: `${Config.API_URL_DOTNET}/${endpoint}`,
        data: body
    }).catch(err => {
        console.log(err);
    })
}
