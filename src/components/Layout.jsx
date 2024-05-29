'use client'
import Navbar from "@/components/Navbar"
import HeaderInLima from "@/components/HeaderInLima"
import { useState } from "react"
export default function Layout({ children}) {
    const [Nav, setNav] = useState(true);
    const toggleNav = () => {
        setNav(!Nav);
    }
    return (
        <>
        <HeaderInLima toggleNav = {toggleNav} Nav = {Nav}/>
        <div className="flex flex-row min-h-screen max-w-full">
            {Nav && <Navbar/>}
            <div className="flex-grow p-6 max-w-full">
                {children}
            </div>
        </div>
        </>
    )
}