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

    useEffect(() => {
        const fetchQuejas = async () => {
            const params = new URLSearchParams(searchParams.toString());
            console.log("Params", params)
            const asuntos = params.get('asuntos') ? params.get('asuntos').split(',') : [];
            const municipalidad = params.get('municipalidad') || '';
            console.log("Asunto: ", asuntos)
            console.log("distrito: ", municipalidad)
            const payload = {
                asuntos: asuntos,
                municipalidad: municipalidad
            }
            try {
                console.log("Iniciando api.obtenerQuejasFiltradas")
                const response = await api.obtenerQuejasFiltradas(payload);
                console.log("Quejas recibidas:", response.data); // Impresión de consola para verificar los datos
                setResultados(response.data);
            } catch (error) {
                console.error('Error al obtener las quejas:', error);
            }
        };

        fetchQuejas();
    }, [searchParams]);

    const handleVolverBuscar = () => {
        router.push('/gestion');
    };


    return (
        <Layout>
            <div>
                <div className="border-b border-gray-300 flex justify-between items-center" id="titulo">
                    <p className="pb-2">Resultados</p>
                    <div className="text-center">
                        <button type="button" onClick={handleVolverBuscar} className="bg-inLima_beige hover:bg-inLima_red hover:text-white border rounded-full text-inLima_red py-2 px-4 text-sm">Volver a buscar</button>
                    </div>
                </div>
                {resultados && resultados.length === 0 ? (
                    <p>No se encontraron resultados para esta búsqueda</p>
                ) : (
                    resultados && resultados.map((queja) => (
                        <StatusCard
                            key={queja.id}
                            asunto={queja.asunto}
                            id={queja.id}
                            dni={queja.ciudadano.dni}
                            estado={queja.estado}
                        />
                    ))
                )}

            </div>
        </Layout>
    );
}
