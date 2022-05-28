import * as LoaderStore from '../Stores/Loader-store.js';
const Axios = require('axios').default;

class ApiHelper {
    async get(url, config) {
      //  LoaderStore.toggleLoader()
        var resp= await Axios.get(url,config )
       // LoaderStore.toggleLoader()
        return resp;
    }
    async post(url,data, config) {
//LoaderStore.toggleLoader()
        var resp= await  Axios.post(url,data,  config)
//LoaderStore.toggleLoader()
        return resp;
    }

}
export default ApiHelper