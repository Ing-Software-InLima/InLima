import base from './base.js'

const endpoint = '/queja';

const agregarQueja = async(payload) => await base.post(endpoint + '/create', payload);

const quejasUsuario = async() => await base.get(endpoint + '/getall')

const findAll = async () => await base.get(endpoint);

const create = async (payload) => await base.post(endpoint, payload);

const obtenerQuejasFiltradas = async (asuntos, municipalidad) => {
    return await base.get('/queja/search', {
        params: {
            asuntos: asuntos.join(','),
            municipalidad,
        },
    });
};


const findOne = async (id) => await base.get(`${endpoint}/${id}`);

//const verQueja = async()

const api = { agregarQueja, findAll, create, quejasUsuario , obtenerQuejasFiltradas , findOne}

export default api;