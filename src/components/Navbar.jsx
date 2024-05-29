import Link from "next/link"
import { useEffect, useState } from 'react';
import apirol from '@/api/usuario';

export default function Navbar() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        // Llama a obtenerRol para obtener el rol del usuario cuando el componente se monta
        const fetchUserRole = async () => {
          try {
            const response = await apirol.obtenerRol();
            setRole(response.data.rol);
          } catch (error) {
            console.error('Error obteniendo el rol del usuario:', error);
          }
        };
    
        fetchUserRole();
      }, []);

    return (
        <nav className="bg-inLima_beige px-8 py-9">
            <ul className="flex flex-col gap-y-5 text-inLima_red font-semibold pr-8 pl-2">
                {role === 1 ? (
                    <>
                        <li><Link href="/home">Quejas</Link></li>
                        <li><Link href="/estado">Estado</Link></li>
                        <li><Link href="/perfil">Perfil</Link></li>
                    </>
                ) : role === 2 ? (
                    <>
                        <li><Link href="/gestion">Gestión</Link></li>
                        <li><Link href="/perfil">Perfil</Link></li>
                    </>
                ) : null}
            </ul>
        </nav>
    )
}