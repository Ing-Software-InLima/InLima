import base from './base.js'

const endpoint = '/queja';

const agregarQueja = async(payload) => await base.post('/queja/create',payload);

const quejasUsuario = async() => await base.get('/queja/quejasUsuario')

const obtenerQuejasFiltradas = async(payload) => await base.post('/queja/search',payload);

const findOne = async (id) => await base.get(`/queja/id/${id}`);

const updateEstado = async (id, payload) => await base.post(`${endpoint}/updateEstado/${id}`, payload);

const updateCalificacion = async(id,payload) => await base.post(`${endpoint}/puntuacionQueja/${id}`,payload);

const updatePrioridad = async(id,payload) => await base.post(`${endpoint}/prioridadQueja/${id}`,payload);

const api = { agregarQueja, quejasUsuario , obtenerQuejasFiltradas , findOne, updateEstado,updateCalificacion, updatePrioridad}

export default api;