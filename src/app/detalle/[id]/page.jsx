// src/app/detalle/[id]/page.jsx
"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/api/queja';
import notificador from '@/api/notificador';
import Layout from '@/components/Layout';

export default function DetallePage() {
    const router = useRouter();
    const { id } = useParams();
    console.log("mi id es: "+id)
    const [queja, setQueja] = useState(null);

    useEffect(() => {
        if (id) {
            const fetchQueja = async () => {
                try {
                    const response = await api.findOne(id);
                    setQueja(response.data);
                } catch (error) {
                    console.error('Error al obtener la queja:', error);
                }
            };

            fetchQueja();
        }
    }, [id]);

    if (!queja) {
        return (
            <Layout>
                <p>Cargando...</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="border-b border-gray-300 flex">
                    <p className="pb-2">Detalle de la Queja</p>
                    <div className="text-center">
                        <button type="button" onClick={() => router.back()} className="bg-inLima_beige hover:bg-inLima_red hover:text-white border rounded-full text-inLima_red py-2 px-4 text-sm">Volver a resultados</button>
                    </div>
            </div>
            <div class="flex flex-col w-[1088px] h-[410px] flex-shrink-0 bg-inLima_lightred ">
                <p>Asunto: {queja.asunto}</p>
                <p>Descripción: {queja.descripcion}</p>
                <p>Ubicación: {queja.ubicacion_descripcion}</p>
                <p>Latitud: {queja.latitud}</p>
                <p>Longitud: {queja.longitud}</p>
                {queja.foto && <img src={queja.foto} alt="Foto de la queja" />}
            </div>
        </Layout>
    );
}

