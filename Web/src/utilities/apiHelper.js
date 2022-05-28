import { toHaveStyle } from '@testing-library/jest-dom';


const axios = require('axios').default;

export default new class HelperApi {


    baseUrL = "http://localhost:3100/";
    async getApi(url, token, params) {
        
        var queryParams = ""
        if (params) {
            Object.keys(params).forEach((val) => {
                queryParams += val + "=" + params[val] + '&';
            });
        }
        var fullUrl = this.baseUrL + url + "?" + queryParams;
        var resp = await axios.get(fullUrl, {
            headers: {
                'Authorization': "Bearer " + token
            },
        })

        return resp;
    }

    async postApi(url, token, body) {

        var fullUrl = this.baseUrL + url;
        var resp = await axios.post(fullUrl, body, {
            headers: {
                'Authorization': "Bearer " + token
            },
        })

        return resp;
    }

}

