
import Link from "next/link"
import Navbar from "@/components/Navbar"
import HeaderInLima from "@/components/HeaderInLima"
export default function Layout({ children }) {
    return (
        <>
        <HeaderInLima/>
        <div className="flex h-screen">
            <Navbar/>
            <div className="flex-grow p-6">
                {children}
            </div>
        </div>
        </>
    )
}