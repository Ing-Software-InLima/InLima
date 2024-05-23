import base from './base.js'

const endpoint = '/queja';

const quejasUsuario = async() => await base.get('/queja/misquejas')

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

//const verQueja = async()

const api = { findAll, create, quejasUsuario , obtenerQuejasFiltradas }

export default api;