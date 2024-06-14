import base from './base.js'

const endpoint = '/usuario';

const iniciarSesion = async (payload) => await base.post('/usuario/login', payload)

const iniciarSesionGoogle = async (payload) => await base.post('/usuario/loginGoogle', payload)

const cerrarSesion = async () => await base.get('/usuario/logout')

const obtenerRol = async () => await base.get('/usuario/getrol')

const encontrarUsuario = async (payload) => await base.post('/usuario/encontrarCiudadano',payload)

const findUserToken = async () => await base.get('/usuario/findUserToken')

const actualizarCuenta = async (payload) => await base.post('/usuario/actualizarCuenta', payload)

const findUserbyEmail = async (payload) => await base.post('/usuario/findUserbyEmail', payload)

const resetps = async (payload) => await base.post('/usuario/resetps', payload)

const api = { iniciarSesion, iniciarSesionGoogle, cerrarSesion , obtenerRol, encontrarUsuario, actualizarCuenta,findUserToken,findUserbyEmail, resetps}

export default api;