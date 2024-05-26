import Image from "next/image"
import StatusColor from "./StatusColor"
export default function StatusCard({asunto, id, dni, estado}) {

    const handleViewDetail = () => {
        router.push(`/detalle/${id}`);
    };

    return (
        <div className="border border-gray-300 rounded-xl p-5 mt-8 w-96">
            <div className="flex gap-3 items-center mb-6">
                <div className="w-12">
                    <Image alt="Img" src={"/inlima.png"} width={300} height={300} layout="responsive"></Image>
                </div>
                <p className="font-semibold">{asunto}</p>
            </div>
            <p className="font-semibold mb-3">ID: {id}</p>
            <p className="mb-3">DNI de ciudadano: {dni}</p>
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