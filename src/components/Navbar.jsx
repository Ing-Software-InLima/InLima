import Link from "next/link"
import { useEffect, useState } from 'react';
import { getUserRole } from '../utils/auth';

export default function Navbar() {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const role = getUserRole();
        setRole(role);
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