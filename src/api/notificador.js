// src/api/notificador.js
import base from './base.js';

const endpoint = '/notificador';

const notificacion = async (payload) => await base.post(`${endpoint}/send`, payload);

const api = { notificacion };

export default api;