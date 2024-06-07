import base from './base.js'

const endpoint = '/usuario';

const iniciarSesion = async (payload) => await base.post('/usuario/login', payload)

const iniciarSesionGoogle = async (payload) => await base.post('/usuario/loginGoogle', payload)

const cerrarSesion = async () => await base.get('/usuario/logout')

const obtenerRol = async () => await base.get('/usuario/getrol')

const encontrarUsuario = async (payload) => await base.post('/usuario/encontrarCiudadano',payload)

const api = { iniciarSesion, iniciarSesionGoogle, cerrarSesion , obtenerRol, encontrarUsuario}

export default api;