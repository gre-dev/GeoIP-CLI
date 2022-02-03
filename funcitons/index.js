import axios from 'axios';
export const baseURL = 'https://gregeoip.com/';

export function serialize(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }

export function sendRequestToGRE(endpoint, options) {
    return axios.get(baseURL+endpoint+'?'+options);
}