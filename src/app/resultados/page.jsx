"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import StatusCard from "@/components/StatusCard";
import Layout from '@/components/Layout';
import api from '@/api/queja'

export default function ResultadosPage() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [resultados, setResultados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [orderButton, setOrderButton] = useState(false);
    useEffect(() => {
        const fetchQuejas = async () => {
            const params = new URLSearchParams(searchParams.toString());
            const asuntos = params.get('asuntos') ? params.get('asuntos').split(',') : [];
            const payload = {
                asuntos: asuntos
            }
            try {
                const response = await api.obtenerQuejasFiltradas(payload);
                const resultados = response.data.sort((a, b) => {
                    return b.id - a.id
                });
                setResultados(resultados);
            } catch (error) {
                console.error('Error al obtener las quejas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuejas();
    }, [searchParams]);

    const handleVolverBuscar = () => {
        router.push('/gestion');
    };

    const toggleSort = () => {
        setOrderButton(!orderButton)
    }

    const orderByPrioridad = () => {
        const resultadosOrd = [...resultados].sort((a, b) => {
            const prioridadA = a.prioridad !== null ? a.prioridad : 0;
            const prioridadB = b.prioridad !== null ? b.prioridad : 0;

            // Ordenar por prioridad primero
            if (prioridadB !== prioridadA) {
                return prioridadB - prioridadA; // Ordenar de mayor a menor
            }

            // Si las prioridades son iguales, ordenar por fecha de creación (más reciente primero)
            return b.id - a.id;
        });
        setResultados(resultadosOrd);
    };

    const orderByFecha = () => {
        const resultadosOrd = [...resultados].sort((a, b) => {
            return b.id - a.id; // Más reciente primero
        });
        setResultados(resultadosOrd);
    }


    return (
        <Layout>
            <div className="border-b border-gray-300 flex justify-between items-center " id="titulo">
                <p className="py-2 text-xl font-normal">Resultados</p>
                <button type="button" onClick={handleVolverBuscar} className="bg-inLima_beige hover:bg-inLima_red hover:text-white border rounded-full text-inLima_red py-2 px-4 text-sm">Volver a buscar</button>
            </div>
            <div className="flex flex-wrap gap-8 w-auto">
                {resultados && resultados.length === 0 ? (
                    loading ? (<p className="flex justify-center items-center text-xl p-5">Cargando ...</p>) : (<p>No se encontraron quejas realizadas</p>)
                ) : (
                    resultados && resultados.map((queja) => (
                        <StatusCard
                            key={queja.id}
                            asunto={queja.asunto}
                            id={queja.id}
                            dni={queja.ciudadano.dni}
                            estado={queja.estado}
                            fecha={queja.fecha}
                            prioridad={queja.prioridad}
                        />
                    ))
                )}
            </div>

            <div className="fixed bottom-4 right-4 flex flex-col items-end space-y-5">
                <div className={`${!orderButton && 'hidden'} flex-col items-end space-y-4`}>
                    <button className="bg-neutral-400 text-white rounded py-1 px-2 flex items-center justify-center shadow-md hover:bg-neutral-500 transition"
                        onClick={orderByPrioridad}>Prioridad</button>
                    <button className="bg-neutral-400 text-white rounded py-1 px-2 flex items-center justify-center shadow-md hover:bg-neutral-500 transition"
                            onClick={orderByFecha}>Fecha</button>
                </div>
                <button className="bg-inLima_red text-white text-3xl rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-red-700 transition"
                    onClick={toggleSort}>
                    +
                </button>
            </div>



        </Layout >
    );
}
