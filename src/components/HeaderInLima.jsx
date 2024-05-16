'use client'
import Image from "next/image"
import { useState } from "react"
export default function HeaderInLima({ toggleNav, Nav }) {
    return (
        <div className="bg-inLima_red py-5 text-center text-white font-bold text-xl flex justify-between">
            <button onClick={toggleNav} className={`ml-5 ${Nav? 'rotate-0':'rotate-90'} hover:text-gray-200`}>
                |||
            </button>
            <div className="">
                Sistema de quejas de Lima
            </div>
            <div className="mr-5">Exit</div>
        </div>
    )
}