'use client'
import Navbar from "@/components/Navbar"
import HeaderInLima from "@/components/HeaderInLima"
import { useState } from "react"
export default function Layout({ children }) {
    const [Nav, setNav] = useState(true);
    const toggleNav = () => {
        setNav(!Nav);
        console.log("nav changed")
    }
    return (
        <>
        <HeaderInLima toggleNav = {toggleNav} Nav = {Nav}/>
        <div className="flex h-fit">
            {Nav && <Navbar/>}
            <div className="flex-grow p-6">
                {children}
            </div>
        </div>
        </>
    )
}