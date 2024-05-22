'use client'
import api_usuario from "@/api/usuario"
import { useRouter } from "next/navigation"

export default function HeaderInLima({ toggleNav, Nav }) {
    const router = useRouter()
    return (
        <div className="bg-inLima_red py-5 text-center text-white font-bold text-xl flex justify-between">
            <button onClick={toggleNav} className={`ml-5 ${Nav ? 'rotate-0' : 'rotate-90'} hover:text-gray-200`}>
                |||
            </button>
            <div className="">
                Sistema de quejas de Lima
            </div>
            <div className="mr-5">
                <button onClick={() => {
                    api_usuario.cerrarSesion()
                    router.push('/login')
                }}>Exit</button>
            </div>
        </div>
    )
}