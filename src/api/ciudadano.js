import base from './base.js'

const endpoint = '/ciudadano';

const findAll = async () => await base.get(endpoint);

const create = async (payload) => await base.post('/ciudadano/signin', payload);

const createGoogle = async (payload) => await base.post('/ciudadano/signinGoogle', payload);

const calcularReputacion = async(payload) => await base.post('/ciudadano/calcularReputacion',payload);

const encontrarCiudadano = async(payload) => await base.post('/ciudadano/encontrarCiudadano',payload)

const api = { findAll, create, createGoogle,calcularReputacion,encontrarCiudadano }

export default api;