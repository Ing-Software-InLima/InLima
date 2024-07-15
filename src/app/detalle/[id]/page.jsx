// src/app/detalle/[id]/page.jsx
"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/api/queja';
import apiciudadano from '@/api/ciudadano'
import notificador from '@/api/notificador';
import regHistorial from '@/api/historial';
import Layout from '@/components/Layout';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import apirol from '@/api/usuario';
import apiestado from '@/api/estado';
import Advise from '@/components/Advise';
import StatusColor from '@/components/StatusColor';
import Calification from '@/components/Calification';
import Reputacion from '@/components/Reputacion';

export default function DetallePage() {
    const router = useRouter();
    const { id } = useParams();
    const [queja, setQueja] = useState(null);
    const [estados, setEstados] = useState([]);
    const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);
    const [prioridad, setPrioridad] = useState(null);
    const [role, setRole] = useState(null);
    const [ciudadano, setCiudadano] = useState(null);
    const [showAdvise, setShowAdvise] = useState(false);
    const [calificacion, setCalificacion] = useState(false);
    const [reputacion, setReputacion] = useState(0);
    const [nombre, setNombre] = useState(null);

    useEffect(() => {
        const fetchQueja = async () => {
            try {
                const response = await api.findOne(id);
                setQueja(response.data);
                setEstadoSeleccionado(response.data.estado);
                setPrioridad(response.data.prioridad); // Asume que el estado de la queja está en `response.data.estado`
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

    useEffect(() => {
        const fetchReputation = async () => {
            try {
                const response = await apiciudadano.calcularReputacion({ id_ciudadano: queja.ciudadano_id });
                console.log('Reputation response:', response.data);
                setReputacion(response.data.ciudadano.reputacion);
                console.log(response.data.ciudadano.reputacion);
                console.log('la reputacion es: ', reputacion);
            } catch (error) {
                console.error('Error fetching reputation:', error);
            }
        };
        if (queja) {
            fetchReputation();
        }
    }, [queja]);

    useEffect(() => {
        const ciudadanoQueja = async () => {
            try {
                const ciudadanoid = {
                    id_ciudadano: queja.ciudadano_id
                }
                const response = await apirol.encontrarUsuario(ciudadanoid);
                setCiudadano(response.data.usuarioEncontrado);
                setNombre(response.data.usuarioEncontrado.nombre);

            } catch (error) {
                console.error('Error obteniendo al ciudadano de la queja:', error);
            }
        };
        if (queja) {
            ciudadanoQueja();
            ((queja.calificacion == null && queja.estado_id == 4) || (queja.calificacion == null && queja.estado_id == 5)) ? setCalificacion(true) : null;
        }

    }, [queja]);

    const handleChangeEstado = (event) => {
        const selectedEstado = estados.find(estado => estado.id === event.target.value);
        setEstadoSeleccionado(selectedEstado);
    };

    const handleGuardar = async () => {
        try {
            await api.updateEstado(id, { estado_id: estadoSeleccionado.id });
            setShowAdvise(true)
            const response = await api.findOne(id); // Obtener los datos más recientes de la queja
            setQueja(response.data);
            const payload = {
                queja_id: queja.id,
                estado_id: estadoSeleccionado.id
            };
            await regHistorial.registrarCambio(payload);
            const payload2 = {
                email: ciudadano.email,
                estado: estadoSeleccionado.nombre,
                ticket: queja.id,
                nombre: ciudadano.nombre,
                asunto: queja.asunto,
                fecha: queja.fecha
            }
            await notificador.notificacion(payload2)

        } catch (error) {
            console.error('Error al actualizar el estado:', error);
        }
    };

    const handleCalificar = async (valor) => {

        try {
            const payload = {
                calificacion: valor
            }
            await api.updateCalificacion(id, payload)
            const response = await apiciudadano.calcularReputacion({ id_ciudadano: queja.ciudadano_id });
            console.log('Reputation response:', response.data);
            setReputacion(response.data.ciudadano.reputacion);
            console.log("Enviando calificacion a la queja")

        } catch (error) {
            console.error('Error al actualizar la calificación', error)

        }

    }

    const handlePrioridad = async () => {
        try {
            const payload = {
                prioridad: prioridad
            }
            await api.updatePrioridad(id, payload)
            alert("Prioridad asignada correctamente")
        } catch (error) {
            console.error("Error al modificar la prioridad", error)
        }
    }

    if (!queja) {
        return (
            <Layout>
                <p>Cargando...</p>
            </Layout>
        );
    }

    // Obtener el nombre del estado actual de la queja
    const estadoActual = estados.find(estado => estado.id === queja.estado_id);

    // Para saber el ID del ciudadano
    // ciudadano.id


    return (
        <Layout>
            <div className="border-b mb-2 border-gray-300 flex justify-between items-center " id="titulo">
                <p className="py-2 text-xl font-normal">Detalle de queja</p>
                <button type="button" onClick={() => router.back()} className="bg-inLima_beige hover:bg-inLima_red hover:text-white border rounded-full text-inLima_red py-2 px-4 text-sm">Volver a buscar</button>
            </div>
            <div className="flex flex-col max-w-7xl flex-shrink-0 bg-inLima_lightred p-10 rounded-2xl">
                {/* Primera Fila */}
                <div className="flex flex-row mb-10">
                    {/* Primera Columna */}
                    <div className="flex-1 pr-5">
                        <p className='mb-5 font-bold'>Asunto: {queja.asunto}</p>
                        <div className="bg-white rounded-lg p-3">
                            <p className='my-2'>{queja.descripcion}</p>
                        </div>
                    </div>
                    {/* Segunda Columna */}
                    <div className="flex-1 pl-5 pr-5">
                        <div className="flex items-center mb-5">
                            <img src="/ubi.png" alt="Ubicación" className="w-6 h-8 mr-2" />
                            <p>{queja.ubicacion_descripcion}</p>
                        </div>
                        <p className='mt-3 mb-2 font-bold'>Latitud:</p>
                        <div className="bg-white rounded-lg p-2">
                            <p>{queja.latitud}</p>
                        </div>
                        <p className='mt-3 mb-2 font-bold'>Longitud:</p>
                        <div className="bg-white rounded-lg p-2">
                            <p>{queja.longitud}</p>
                        </div>
                    </div>
                    {/* Tercera Columna */}
                    <div className="flex-1 pl-5">
                        {role === 1 ? (
                            <div className='pb-5 max-w-fit'>Estado: {estadoActual ? (<StatusColor estado={estadoActual} />) : 'Cargando...'}</div>
                        ) : role === 2 ? (
                            <>
                                <div className='pb-5'>Estado: {estadoActual ? (<StatusColor estado={estadoActual} />) : 'Cargando...'}</div>
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
                                    <button type="button" onClick={handleGuardar} className="bg-inLima_red px-4 py-2 hover:bg-red-800 border rounded-full text-white">Guardar</button>
                                </div>
                            </>
                        ) : null}
                    </div>
                </div>

                {/* Segunda Fila */}
                <div className="flex flex-row">
                    {/* Imagen de la queja (2/3 de la fila) */}
                    <div className="flex-2 pr-5">
                        {queja.foto &&
                            <div className="flex-shrink-0">
                                <img src={queja.foto} alt="Foto de la queja" className="w-full h-56 object-cover rounded-lg" />
                            </div>
                        }
                    </div>
                    {/* Reputación del ciudadano (1/3 de la fila) */}
                    {role === 2 && (
                        <div className="flex-col pl-5">

                            <p className="text-left font-bold mb-2 pt-10"> Asigna una prioridad</p>
                            <FormControl fullWidth variant="outlined" className="mb-4">
                                <InputLabel id="prioridad-select-label">Prioridad</InputLabel>
                                <Select
                                    labelId="prioridad-select-label"
                                    value={prioridad ? prioridad : ''}
                                    onChange={(event) => setPrioridad(event.target.value)}
                                    label="Prioridad"
                                >
                                    <MenuItem key={1} value={1}>
                                        {"Baja"}
                                    </MenuItem>
                                    <MenuItem key={2} value={2}>
                                        {"Media"}
                                    </MenuItem>
                                    <MenuItem key={3} value={3}>
                                        {"Alta"}
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <div className="text-left space-x-2 pt-5">
                                <button type="button" onClick={handlePrioridad} className="bg-inLima_red text-white px-4 py-2 hover:bg-red-800 border rounded-full ">Guardar</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showAdvise && (
                <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                    <Advise Mensaje="Se envió un correo confirmando cambio de estado" onClose={() => setShowAdvise(false)} />
                </div>
            )}
            {calificacion && (
                <div className='fixed inset-0 flex justify-center items-center bg-black bg-opacity-50'>
                    <Calification onClose={(valor) => {
                        console.log("++++++++++++++++++++++++++++++++++++++++++++++", valor)
                        handleCalificar(valor)
                        setCalificacion(false)

                    }} />
                </div>
            )

            }
        </Layout>
    );
}
