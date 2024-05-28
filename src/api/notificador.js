// src/api/notificador.js
import base from './base.js';

const endpoint = '/notificador';

const notificacion = async (email, estado) => await base.post(`${endpoint}/send`, { email, estado });

const api = { notificacion };

export default api;