import Link from "next/link"
export default function Navbar() {
    return (
        <nav className="bg-inLima_beige px-8 py-9">
            <ul className="flex flex-col gap-y-5 text-inLima_red font-semibold pr-8 pl-2">
                <li><Link href="/home">Quejas</Link></li>
                <li><Link href="/estado">Estado</Link></li>
                <li><Link href="/perfil">Perfil</Link></li>
            </ul>
        </nav>
    )
}