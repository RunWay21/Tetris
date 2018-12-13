import http from 'root/http';

const baseUrl = '/user';

export async function getList() {
    const response = await http.get(baseUrl + '/getList');
    return response.data;
}