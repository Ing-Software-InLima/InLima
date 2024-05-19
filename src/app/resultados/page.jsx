"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import StatusCard from "@/components/StatusCard";
import Layout from '@/components/Layout';

export default function ResultadosPage() {
    // Ejemplo de quejas
    const quejas = [
        {
            id: 1,
            asunto: "Veredas rotas",
            dni: "12345678",
            estado: "Enviado",
            municipalidad: "Ate"
        },
        {
            id: 2,
            asunto: "Calles contaminadas",
            dni: "87654321",
            estado: "En proceso",
            municipalidad: "San Isidro"
        },
    ];

    const router = useRouter();
    const searchParams = useSearchParams(); // Uso de useSearchParams correctamente
    const [resultados, setResultados] = useState([]);

    useEffect(() => {
        if (!router.isReady) return;
        const params = new URLSearchParams(searchParams.toString()); // Convertir a URLSearchParams
        const asuntos = params.get('asuntos') ? params.get('asuntos').split(',') : [];
        const municipalidad = params.get('municipalidad') || '';
        
        console.log("Asuntos recibidos:", asuntos); // Impresión de consola para verificar asuntos
        console.log("Municipalidad recibida:", municipalidad); // Impresión de consola para verificar municipalidad
        
        realizarBusqueda(asuntos, municipalidad);
    }, [router.isReady, searchParams]);

    const realizarBusqueda = (asuntosSeleccionados, municipalidad) => {
        console.log("Realizando búsqueda con:", {asuntosSeleccionados, municipalidad}); // Impresión de consola antes de la búsqueda
        const resultadosFiltrados = quejas.filter(
            (queja) =>
                (asuntosSeleccionados.length === 0 ||
                    asuntosSeleccionados.some(asunto => 
                        asunto.toLowerCase() === queja.asunto.toLowerCase())) &&
                (!municipalidad || queja.municipalidad.toLowerCase() === municipalidad.toLowerCase())
        );
        setResultados(resultadosFiltrados);
        console.log("Resultados filtrados:", resultadosFiltrados); // Impresión de consola para verificar los resultados filtrados
    };

    return (
        <Layout>
            <div>
                <div className="border-b border-gray-300" id="titulo">
                    <p className="pb-2">Resultados</p>
                </div>
                {resultados.length === 0 ? (
                    <p>No se encontraron resultados para esta búsqueda</p>
                ) : (
                    resultados.map((queja) => (
                        <StatusCard
                            key={queja.id}
                            asunto={queja.asunto}
                            id={queja.id}
                            dni={queja.dni}
                            estado={queja.estado}
                        />
                    ))
                )}
            </div>
        </Layout>
    );
}
