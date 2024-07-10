import base from './base.js'

const endpoint = '/token';

const sendToken = async (payload) => await base.post(`${endpoint}/sendtoken`, payload);

const sendTokenRs = async (payload) => await base.post(`${endpoint}/sendtokenreset`, payload);

const verifyToken = async (payload) => await base.post(`${endpoint}/verifytoken`, payload);

const api = { sendToken, sendTokenRs, verifyToken }

export default api;