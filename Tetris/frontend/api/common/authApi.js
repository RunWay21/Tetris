import http from 'root/http';

const baseUrl = 'common/auth/';

export async function login(model) {
    await http.post(baseUrl + 'login', model);
}

export async function logout() {
    await http.get(baseUrl + 'logout');
}

export async function getAuthInfo() {
    const response = await http.get(baseUrl + 'getAuthInfo');
    return response.data;
}