import base from './base.js';

const endpoint = '/historial';

const registrarCambio = async (payload) => await base.post('/historial/register',payload);

const api = { registrarCambio };

export default api;