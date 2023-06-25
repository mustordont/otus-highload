import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { sleep, check } from 'k6';
// const URL = 'http://host.docker.internal:8000';
const baseUrl = 'http://127.0.0.1:8000';

export default function () {
    let res = http.post(baseUrl + '/login', { id: 4, password: 'test' });
    console.log(res);
    const token = JSON.parse(res.body).token;
    // Verify response
    check(res, {
        'status is 201': r => r.status === 201,
        'is authenticated': () => !!token,
    });
    const url = new URL(baseUrl + '/user/search');
    url.searchParams.append('first_name', 'А');
    url.searchParams.append('second_name', 'Б');
    res = http.get(url.toString(), {
        headers: {
            authorization: token,
        },
    });
    console.log(res);
    sleep(1);
}
