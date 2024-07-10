import base from './base.js';

const endpoint = '/administrador';

const findMun = async (payload) => await base.post('/administrador/findMun', payload);

const api = { findMun };

export default api;