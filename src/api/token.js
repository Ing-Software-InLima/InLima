import base from './base.js'

const endpoint = '/token';

const sendToken = async (payload) => await base.post(`${endpoint}/sendtoken`, payload);

const verifyToken = async (payload) => await base.post(`${endpoint}/verifytoken`, payload);

const api = { sendToken, verifyToken }

export default api;