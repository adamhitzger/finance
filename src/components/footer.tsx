import { navLinks } from "@/constants";
import Link from "next/link";

export default function Footer() {
    const currentYear: number = new Date().getFullYear();

    return (
        <>
            <div className="p-8 bg-lightbrown text-white w-full h-full ">
                <div className="w-full h-full flex flex-col ">
                    <div className="grid grid-cols-2 w-full h-fit text-xl border-b-2 border-b-white  2xl:text-3xl  ">

                        <div className="p-3  h-fit">
                            <h2>Financial Gurus &copy; {currentYear}. All Rights Reserved.</h2>
                        </div>

                        <div className="text-right grid grid-cols-1 justify-end lg:grid-cols-5 font-light">
                            {navLinks.map((nav, index) => (
                                <div key={index} className="p-3">

                                    <Link href={nav.route}
                                    >
                                        {nav.label}
                                    </Link>

                                </div>
                            ))}

                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};