import base from './base.js'

const endpoint = '/queja';

const quejasUsuario = async() => await base.get('/queja/misquejas')

const findAll = async () => await base.get(endpoint);

const create = async (payload) => await base.post(endpoint, payload);

//const verQueja = async()

const api = { findAll, create, quejasUsuario }

export default api;