'use client'
import Layout from "@/components/Layout"
import StatusCard from "@/components/StatusCard"
import { useEffect, useState } from "react"
import queja from '@/api/queja.js'

export default function Estado() {
    const [quejas, setQuejas] = useState([]);
    const [loading, setLoading] = useState(true);

    const obtenerQuejas = async () => {
        try {
            const response = await queja.quejasUsuario();
            if(response.status == 200) {
                setQuejas(response?.data);
            }
        } catch (error) {
            alert("Error al conectar")
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        obtenerQuejas();
    }, [])

    return (
        <Layout>
            <div className="border-b border-gray-300">
                <p className="py-2 text-xl font-medium">Estado de tus quejas</p>
            </div>
            <div className="flex flex-wrap gap-8 w-auto">
            {quejas.length === 0 ? (
                loading? (<p className="flex justify-center items-center text-xl p-5">Cargando ...</p>) : (<p>No se encontraron quejas realizadas</p>)
                ) : (
                    quejas.map((queja) => (
                        <StatusCard
                            key={queja.id}
                            asunto={queja.asunto}
                            id={queja.id}   
                            dni={queja.ciudadano.dni}   
                            estado={queja.estado}
                            fecha={queja.fecha}
                        />
                    ))
                )}
            </div>
        </Layout>
    )
}