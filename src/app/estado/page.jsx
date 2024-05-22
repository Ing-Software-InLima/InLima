'use client'
import Layout from "@/components/Layout"
import StatusCard from "@/components/StatusCard"
import { useEffect } from "react"
import api_queja from '@/api/queja.js'

export default function Estado() {
    const obtenerQuejas = async () => {
        try {
            const response = await api_queja.quejasUsuario();
            console.log("quejas",response)
        } catch (error) {
            alert("Error al conectar")
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
                <StatusCard asunto="Semaforo malogrado" id="00000001" dni="8745612" estado="En proceso"></StatusCard>
                <StatusCard asunto="Rompemuelle sin pintar" id="00000002" dni="8745612" estado="Solucionado"></StatusCard>
                <StatusCard asunto="Rompemuelle sin pintar" id="00000002" dni="8745612" estado="Archivada"></StatusCard>
                <StatusCard asunto="Rompemuelle sin pintar" id="00000002" dni="8745612" estado="Solucionado"></StatusCard>
                <StatusCard asunto="Rompemuelle sin pintar" id="00000002" dni="8745612" estado="Solucionado"></StatusCard>
                <StatusCard asunto="Rompemuelle sin pintar" id="00000002" dni="8745612" estado="Solucionado"></StatusCard>
                <StatusCard asunto="Rompemuelle sin pintar" id="00000002" dni="8745612" estado="Solucionado"></StatusCard>
            </div>
        </Layout>
    )
}