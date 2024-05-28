// src/app/detalle/[id]/page.jsx
"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/api/queja';
import notificador from '@/api/notificador';
import regHistorial from '@/api/historial';
import Layout from '@/components/Layout';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import apirol from '@/api/usuario';
import apiestado from '@/api/estado';


export default function DetallePage() {
    const router = useRouter();
    const { id } = useParams();
    const [queja, setQueja] = useState(null);
    const [estados, setEstados] = useState([]);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);
    const [role, setRole] = useState(null);
    const [ciudadano, setCiudadano] = useState(null);

    useEffect(() => {
        const fetchQueja = async () => {
            try {
                const response = await api.findOne(id);
                setQueja(response.data);
                setEstadoSeleccionado(response.data.estado); // Asume que el estado de la queja está en `response.data.estado`
            } catch (error) {
                console.error('Error al obtener la queja:', error);
            }
        };

        const fetchEstados = async () => {
            try {
                const response = await apiestado.findAll();
                setEstados(response.data);
            } catch (error) {
                console.error('Error al obtener los estados:', error);
            }
        };

        const fetchUserRole = async () => {
            try {
                const response = await apirol.obtenerRol();
                setRole(response.data.rol);
            } catch (error) {
                console.error('Error obteniendo el rol del usuario:', error);
            }
        };
        
        if (id) {
            fetchQueja();
            fetchEstados();
            fetchUserRole();
        }
    }, [id]);

    useEffect(()=>{
        const ciudadanoQueja = async () => {
            try {
                const ciudadanoid = {
                    id_ciudadano: queja.ciudadano_id
                }
                const response = await apirol.encontrarUsuario(ciudadanoid);
                setCiudadano(response.data.usuarioEncontrado)

            } catch (error) {
                console.error('Error obteniendo al ciudadano de la queja:', error);
            }
        };
        if(queja){
            ciudadanoQueja();
        }
        
    },[queja]);

    const handleChangeEstado = (event) => {
        const selectedEstado = estados.find(estado => estado.id === event.target.value);
        setEstadoSeleccionado(selectedEstado);
    };

    const handleGuardar = async () => {
        try {
            await api.updateEstado(id, { estado_id: estadoSeleccionado.id });
            alert('Estado actualizado con éxito');

            const response = await api.findOne(id); // Obtener los datos más recientes de la queja
            setQueja(response.data);
            const payload = {
                queja_id: queja.id,
                estado_id: estadoSeleccionado.id
            };
            await regHistorial.registrarCambio(payload);
            
            const payload2 = {
                email: ciudadano.email,
                estado: estadoSeleccionado.nombre
            }
            await notificador.notificacion(payload2)
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
        }
    };

    if (!queja) {
        return (
            <Layout>
                <p>Cargando...</p>
            </Layout>
        );
    }

    // Obtener el nombre del estado actual de la queja
    const estadoActual = estados.find(estado => estado.id === queja.estado_id);

    return (
        <Layout>
            <div className="border-b border-gray-300 flex justify-between items-center" id="titulo">
                <p className="pb-2">Detalle de queja</p>
                <div className="text-center">
                    <button type="button" onClick={() => router.back()} className="bg-inLima_beige hover:bg-inLima_red hover:text-white border rounded-full text-inLima_red py-2 px-4 text-sm">Volver a buscar</button>
                </div>
            </div>
            <div className="flex flex-col w-[1088px] h-[510px] flex-shrink-0 bg-inLima_lightred px-5 py-5">
                <div className="flex flex-row">
                    <div className="flex-1 pr-5">
                        <p className='pb-2'>Asunto: {queja.asunto}</p>
                        <p className='pb-2'>Descripción: {queja.descripcion}</p>
                        <p className='pb-2'>Ubicación: {queja.ubicacion_descripcion}</p>
                        <p className='pb-2'>Latitud: {queja.latitud}</p>
                        <p className='pb-2'>Longitud: {queja.longitud}</p>
                        {queja.foto &&
                            <div className="flex-shrink-0">
                                <img src={queja.foto} alt="Foto de la queja" className="w-88 h-56 object-cover" />
                            </div>
                        }
                    </div>
                    <div className="flex-1 pr-5">
                        {role === 1 ? (
                            <>
                                <p className='pb-5'>Estado: {estadoActual ? estadoActual.nombre : 'Cargando...'}</p>
                            </>
                        ) : role === 2 ? (
                            <>
                                <p className='pb-5'>Estado: {estadoActual ? estadoActual.nombre : 'Cargando...'}</p>
                                <FormControl fullWidth variant="outlined" className="mb-4">
                                    <InputLabel id="estado-select-label">Estado</InputLabel>
                                    <Select
                                        labelId="estado-select-label"
                                        value={estadoSeleccionado ? estadoSeleccionado.id : ''}
                                        onChange={handleChangeEstado}
                                        label="Estado"
                                        >
                                        {estados.map((estado) => (
                                            <MenuItem key={estado.id} value={estado.id}>
                                                {estado.nombre}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <div className="text-left space-x-2 pt-5">
                                    <button type="button" onClick={handleGuardar} className="bg-inLima_red px-4 py-2 hover:bg-white hover:text-inLima_red border rounded-full text-white">Guardar</button>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
