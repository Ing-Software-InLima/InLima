'use client'
import Navbar from "@/components/Navbar"
import HeaderInLima from "@/components/HeaderInLima"
import { useEffect, useState } from 'react';
import apirol from '@/api/usuario';
import apiAdmin from '@/api/administrador'

export default function Layout({ children }) {
    const [Nav, setNav] = useState(true);
    const toggleNav = () => {
        setNav(!Nav);
    }

    const [role, setRole] = useState(null);
    const [mun, setMun] = useState(null);
    useEffect(() => {
        // Llama a obtenerRol para obtener el rol del usuario cuando el componente se monta
        const fetchUserRole = async () => {
            try {
                const response = await apirol.obtenerRol();
                setRole(response.data.rol);
                const responseMun = await apiAdmin.findMun();
                setMun(responseMun.data.mun)
            } catch (error) {
                console.error('Error obteniendo el rol del usuario:', error);
            }
        };
        fetchUserRole();
    }, []);


    return (
        <>
            <HeaderInLima toggleNav={toggleNav} Nav={Nav} role={role} mun={mun} />
            <div className="flex flex-row min-h-screen max-w-full">
                {Nav && <Navbar role={role} />}
                <div className="flex-grow p-6 max-w-full">
                    {children}
                </div>
            </div>
        </>
    )
}