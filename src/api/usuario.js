import base from './base.js'

const endpoint = '/usuario';
const loginEndPoint = '/usuario/login'

const findAll = async () => await base.get(endpoint);

const create = async (payload) => await base.post(endpoint, payload)

const iniciarSesion = async (payload) => await base.post(loginEndPoint, payload)

const cerrarSesion = async () => await base.get('/usuario/logout')

const api = { findAll, create, iniciarSesion, cerrarSesion }

export default api;