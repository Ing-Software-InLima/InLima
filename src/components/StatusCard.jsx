"use client";
import Image from "next/image"
import StatusColor from "./StatusColor"
import PrioridadColor from "./PrioridadColor";
import { useRouter } from 'next/navigation';

export default function StatusCard({ asunto, id, dni, estado, fecha= null, prioridad }) {

    const router = useRouter();

    const handleViewDetail = () => {
        router.push(`/detalle/${id}`);
    };

    const formatFecha = (fecha) =>{
        const fechaNew = new Date(fecha)
        return fechaNew.toLocaleString()
    }

    return (
        <div className="border border-gray-300 rounded-xl p-5 mt-8 w-96">
            <div className="flex gap-3 items-center mb-6 justify-between">
                <div className="flex items-center flex-auto">
                    <div className="min-w-12 w-12 mr-3">
                        <Image alt="Img" src={"/inlima.png"} width={300} height={300} ></Image>
                    </div>
                    <p className="font-semibold">{asunto}</p>
                </div>
                <div className="flex-col min-w-fit">
                    <PrioridadColor estado={prioridad}></PrioridadColor>
                    <p className="font-mono">ID: {id}</p>
                </div>
                
            </div>

            <p className="mb-3">DNI de ciudadano: {dni}</p>
            <p className="mb-3">Fecha: {formatFecha(fecha)}</p>
            <div className="flex gap-3 mb-7 items-center">
                <p className="font-semibold">Estado de la queja</p>
                <StatusColor estado={estado}></StatusColor>
            </div>
            <div className="flex justify-center">
                <button onClick={handleViewDetail} className="rounded-full text-white bg-inLima_red p-4 pl-8 pr-8 hover:bg-inLima_darkRed transition-colors duration-300">
                    Ver detalle
                </button>
            </div>
        </div>
    )
}