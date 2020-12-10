
export default class Interceptor {
    static token = null;

    static headers = {
        'Accept': '*/*',
        'Content-Type': 'application/json'
    }

    static getHeaders() {
        temp = this.headers;
        temp["Accept"] = "*/*"
        temp['Content-Type'] = "application/json"
        temp['Authorization'] = 'Bearer ' + this.token

        return temp;
    }

    static getHeadersMultiPart() {
        temp = this.headers;
        temp["Accept"] = "application/json"
        temp['Content-Type'] = "multipart/form-data"
        temp['Authorization'] = 'Bearer ' + this.token
        return temp
    }

    static setToken(token) {
        console.log('-------------token is-------------', token)
        this.token = token;
    }
    static getToken() {
        return this.token;
    }
}