"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/constants";
import { X, Menu } from 'lucide-react';

function Navbar() {
    const [active, setActive] = useState("Domů");
    const [toggle, setToggle] = useState(false);

    return (
        <>
            <nav className="w-full flex py-6 justify-between items-center navbar">
                <Link href={"/"}>
                    <Image
                        width={256}
                        height={128}
                        src="/img/logo.png"
                        alt="Logo"
                    />
                </Link>
                <ul className="list-none sm:flex hidden justify-end items-center flex-1">
                    {navLinks.map((nav, index) => (
                        <li
                            key={index}
                            className={`font-poppins cursor-pointer text-2xl font-normal ${active === nav.label ? "text-brown" : "text-black"
                                } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
                            onClick={() => setActive(nav.label)}
                        >
                            <a href={`${nav.route}`}>{nav.label}</a>
                        </li>
                    ))}
                </ul>
                <div className="md:hidden flex flex-1 justify-end items-center">
                    <div className="sm:hidden flex flex-1 justify-end items-center">

                        {toggle ? <X width={32} height={32} onClick={() => setToggle(!toggle)} /> : <Menu width={32} height={32} onClick={() => setToggle(!toggle)} />}
                        <div
                            className={`${!toggle ? "hidden" : "flex"
                                } p-6 bg-white absolute top-2 right-10 mx-4 my-2 min-w-[120px] rounded-xl sidebar`}
                        >
                            <ul className="list-none flex justify-end items-start flex-1 flex-col">
                                {navLinks.map((nav, index) => (
                                    <li
                                        key={index}
                                        className={`font-poppins font-medium cursor-pointer text-[16px] ${active === nav.label ? "text-brown" : "text-black"
                                            } ${index === navLinks.length - 1 ? "mb-0" : "mb-2"}`}
                                        onClick={() => setActive(nav.label)}
                                    >
                                        <a href={`${nav.route}`} >{nav.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </div>

            </nav>
        </>
    );
};

export default function ResponziveBar() {
    return (
        <div className="fixed top-0 z-20 bg-transparent  w-full overflow-hidden backdrop-blur-sm">
            <div className={`sm:px-16 px-6 flex justify-center items-center`}>
                <div className={`xl:max-w-[1280px] w-full`}>
                    <Navbar />
                </div>
            </div>
        </div>
    )
}