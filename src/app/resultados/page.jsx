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

    useEffect(() => {
        const fetchQuejas = async () => {
            const params = new URLSearchParams(searchParams.toString());
            const asuntos = params.get('asuntos') ? params.get('asuntos').split(',') : [];
            const payload = {
                asuntos: asuntos
            }
            try {
                const response = await api.obtenerQuejasFiltradas(payload);
                setResultados(response.data);
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

    return (
        <Layout>
            <div className="border-b border-gray-300 flex justify-between items-center " id="titulo">
                <p className="py-2 text-xl font-normal">Resultados</p>
                <button type="button" onClick={handleVolverBuscar} className="bg-inLima_beige hover:bg-inLima_red hover:text-white border rounded-full text-inLima_red py-2 px-4 text-sm">Volver a buscar</button>
            </div>
            <div className="flex flex-wrap gap-8 w-auto">
                {resultados && resultados.length === 0 ? (
                loading? (<p className="flex justify-center items-center text-xl p-5">Cargando ...</p>) : (<p>No se encontraron quejas realizadas</p>)
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
        </Layout>
    );
}
