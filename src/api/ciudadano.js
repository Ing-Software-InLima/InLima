import base from './base.js'

const endpoint = '/ciudadano';

const findAll = async () => await base.get(endpoint);

const create = async (payload) => await base.post('/ciudadano/signin', payload);

const api = { findAll, create }

export default api;