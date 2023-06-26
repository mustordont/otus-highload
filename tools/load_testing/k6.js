import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

import { sleep, check } from 'k6';
const baseUrl = 'http://host.docker.internal:8000';
// const baseUrl = 'http://127.0.0.1:8000';
const CHARS = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.split('');

export function setup() {
    let res = http.post(baseUrl + '/login', { id: 4, password: 'test' });
    console.log(res);
    const token = JSON.parse(res.body).token;
    // Verify response
    check(res, {
        'status is 201': r => r.status === 201,
        'is authenticated': () => !!token,
    });
    return { token };
}

export const options = {
    stages: [
        { duration: '30s', target: 1 },
        { duration: '30s', target: 10 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 1000 },
    ],
};

export default function ({ token }) {
    const url = new URL(baseUrl + '/user/search');
    url.searchParams.append('first_name', randomItem(CHARS));
    url.searchParams.append('second_name', randomItem(CHARS));
    const res = http.get(url.toString(), {
        headers: {
            authorization: token,
        },
    });
    // Verify response
    check(res, {
        'status is 200': r => r.status === 200,
    });
    sleep(1);
}
