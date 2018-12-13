import http from 'root/http';
import DateTime from 'root/utils/datetime';

const baseUrl = '/game';

export async function saveGame(model) {
    await http.post(baseUrl + '/saveGame', model)
}

export async function getUserGameList(page, userId) {
    const response = await http.get(baseUrl + '/GetUserGameList', {
        params: {
            page,
            userId
        }
    });
    response.data.items.forEach(x => x.dateTime = DateTime.fromUtcString(x.dateTime).formatDateTime)
    return response.data;
}

export async function getScoreInfo() {
    const response = await http.post(baseUrl + '/getScoreInfo');
    return response.data;
}