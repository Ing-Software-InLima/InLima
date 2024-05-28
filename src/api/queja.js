import base from './base.js'

const endpoint = '/queja';

const agregarQueja = async(payload) => {
    console.log("agregar queja post")
    await base.post('/queja/create',payload);
}
const quejasUsuario = async() => await base.get('/queja/quejasUsuario')

const findAll = async () => await base.get(endpoint);

const create = async (payload) => await base.post(endpoint, payload);

const obtenerQuejasFiltradas = async(payload) => {
    return await base.post('/queja/search',payload);
}


const findOne = async (id) => await base.get(`/queja/id/${id}`);

const updateEstado = async (id, payload) => await base.post(`${endpoint}/updateEstado/${id}`, payload);


//const verQueja = async()

const api = { agregarQueja, findAll, create, quejasUsuario , obtenerQuejasFiltradas , findOne, updateEstado}

export default api;