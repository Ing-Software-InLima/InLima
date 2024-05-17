'use client'
import Layout from "@/components/Layout"
import StatusCard from "@/components/StatusCard"
export default function Estado(){
    return (
        <Layout>
        <div className="border-b border-gray-300">
            <p className="py-2 text-xl font-medium">Estado de tus quejas</p>
        </div>
        <div className="flex flex-wrap gap-8 w-auto">
            <StatusCard asunto= "Semaforo malogrado" id = "00000001" dni="8745612" estado="En proceso"></StatusCard>
            <StatusCard asunto= "Rompemuelle sin pintar" id = "00000002" dni="8745612" estado="Solucionado"></StatusCard>
            <StatusCard asunto= "Rompemuelle sin pintar" id = "00000002" dni="8745612" estado="Archivada"></StatusCard>
            <StatusCard asunto= "Rompemuelle sin pintar" id = "00000002" dni="8745612" estado="Solucionado"></StatusCard>
            <StatusCard asunto= "Rompemuelle sin pintar" id = "00000002" dni="8745612" estado="Solucionado"></StatusCard>
            <StatusCard asunto= "Rompemuelle sin pintar" id = "00000002" dni="8745612" estado="Solucionado"></StatusCard>
            <StatusCard asunto= "Rompemuelle sin pintar" id = "00000002" dni="8745612" estado="Solucionado"></StatusCard>
        </div>
        </Layout>
    )
}