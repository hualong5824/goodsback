import axios from 'axios'
const myPlugIn = {}

myPlugIn.install = function(Vue) {
	axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/';
	Vue.prototype.axios = axios
}

export default myPlugIn
