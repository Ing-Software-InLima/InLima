"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import StatusCard from "@/components/StatusCard";

const ResultadosPage = () => {
    // quejas ejemplo
    const quejas = [
        {
            id: 1,
            asunto: 'Veredas rotas',
            dni: '12345678',
            estado: 'Enviado',
            municipalidad: 'Ate'
        },
        {
            id: 2,
            asunto: 'Calles contaminadas',
            dni: '87654321',
            estado: 'En proceso',
            municipalidad: 'San Isidro'
        },
    ];

    const router = useRouter();
    const [resultados, setResultados] = useState([]);

    useEffect(() => {
        if (!router.isReady) return; // Verifica si el enrutador está listo
        const { asuntos, ubicacion } = router.query;
        realizarBusqueda(asuntos ? asuntos.split(',') : [], ubicacion);
    }, [router.isReady, router.query]);

    const realizarBusqueda = (asuntosSeleccionados, ubicacion) => {
        const resultadosFiltrados = quejas.filter(
            (queja) =>
                (asuntosSeleccionados.length === 0 ||
                    asuntosSeleccionados.includes(queja.asunto)) &&
                (ubicacion === '' || queja.municipalidad.toLowerCase() === ubicacion.toLowerCase())
        );
        setResultados(resultadosFiltrados);
    };

    return (
        <div className="p-6">
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
    );
};

export default ResultadosPage;
