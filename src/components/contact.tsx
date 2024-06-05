"use client";

import React, { useState, useRef, useTransition } from 'react';
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import process from 'process';
import { Button } from './ui/button';
import Map, { Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

const hoveredCursor =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIyNi41IiBmaWxsPSJibGFjayIgc3Ryb2tlPSJibGFjayIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzIgMzJMMzIgNDVIMzNMMzMgMzJINDVWMzFIMzNWMTlIMzJWMzFIMTlWMzJIMzJaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0xLjk2MjMxIDEuOTYyMzFMMTMuNzAzMyA1LjEwODI5TDUuMTA4MjkgMTMuNzAzM0wxLjk2MjMxIDEuOTYyMzFaIiBmaWxsPSJibGFjayIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAwIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IndoaXRlIi8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+'
const defaultCursor =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIyNi41IiBzdHJva2U9ImJsYWNrIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMiAzMkw0MS4xOTI0IDQxLjE5MjRMNDEuODk5NSA0MC40ODUzTDMyLjcwNzEgMzEuMjkyOUw0MS4xOTI0IDIyLjgwNzZMNDAuNDg1MyAyMi4xMDA1TDMyIDMwLjU4NThMMjMuNTE0NyAyMi4xMDA1TDIyLjgwNzYgMjIuODA3NkwzMS4yOTI5IDMxLjI5MjlMMjIuMTAwNSA0MC40ODUzTDIyLjgwNzYgNDEuMTkyNEwzMiAzMloiIGZpbGw9ImJsYWNrIi8+PHBhdGggZD0iTTUuMzY3MTEgMTIuNzM3M0wyLjY2OTQyIDIuNjY5NDJMMTIuNzM3MyA1LjM2NzExTDUuMzY3MTEgMTIuNzM3M1oiIHN0cm9rZT0iYmxhY2siLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJjbGlwMCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ3aGl0ZSIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg=='

export default function Contact() {
    const formRef = useRef<HTMLFormElement>(null);
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        phone: "",
        msg: "",
    });
    const [lng, setLng] = useState<number>(15.5764);
    const [lat, setLat] = useState<number>(49.6071);
    const [zoom, setZoom] = useState<number>(14.5);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    };

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_TEMPLATE_ID!,
            {
                from_name: form.fullname,
                to_name: "Dva Životy",
                from_email: form.email,
                to_email: "arena@arenaapartmentshb.cz",
                message: form.phone + "\n" + form.msg
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        ).then(() => {
            setIsLoading(false);
            setForm({
                fullname: "",
                email: "",
                phone: "",
                msg: "",
            });
        }).catch((error) => {
            setIsLoading(false);
            console.log(error);
        });
    };

    return (

        <motion.div className="p-5 bg-black w-full h-full " id="contact"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
        >
            <div className="w-full h-full" >
                <div className=" max-w-fit mx-5 my-8 2xl:mx-8 ">
                    <ul className="list-disc">
                        <li className="text-white underline underline-offset-4 text-2xl 2xl:text-4xl">Kontakt</li>
                    </ul>
                </div>
                <div className="w-full max-h-fit lg:flex">
                    <div className=" w-full my-3  p-5 border rounded-[25px] bg-white lg:w-1/2 lg:p-10 lg:ml-3  ">
                        <form className="2xl:m-5" onSubmit={handleSubmit} ref={formRef}>
                            <div className="text-2xl my-5">
                                <label htmlFor="fullname">Celé jméno</label>
                            </div>
                            <div className="mb-5 border-b-2 border-solid border-black">
                                <input className=" w-full p-2" type="text" name='fullname' id='fullname' value={form.fullname} onChange={handleChange} required />
                            </div>
                            <div className="text-2xl my-5">
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="mb-5 border-b-2 border-solid border-black">
                                <input className="w-full p-2" type="email" name="email" id='email' value={form.email} onChange={handleChange} required />
                            </div>
                            <div className="text-2xl my-5">
                                <label htmlFor="phone">Telefonní číslo</label>
                            </div>
                            <div className="mb-5 border-b-2 border-solid border-black">
                                <input className=" w-full p-2" type="text" name='phone' id='phone' value={form.phone} onChange={handleChange} required />
                            </div>
                            <div className="text-2xl my-5">
                                <label htmlFor="msg">Zpráva</label>
                            </div>
                            <div className="mb-5 border-b-2 border-solid border-black">
                                <textarea className=" w-full p-2" name='msg' id='msg' value={form.msg} onChange={handleChange} required></textarea>
                            </div>
                            <div className="text-xl font-semibold ">
                                <Button className="border px-5 py-3 rounded-[10px]" type="submit" disabled={isLoading}>{isLoading ? "Odesílám..." : "Odeslat"}</Button>
                            </div>
                        </form>
                    </div>

                    <div className="my-3 p-5 flex flex-col w-full rounded-[25px] bg-white lg:w-1/2 lg:p-10 lg:ml-3 ">
                        <div className=" text-2xl w-full h-fit  text-right ">

                            <div className="flex flex-row justify-end lg:text-2xl">
                                <div className="pr-5">
                                    <span className="underline underline-offset-4">Adresa:</span>
                                </div>
                                <div>
                                    <span>Beckovského 2045, Havlíčkův Brod, 580 01</span>
                                </div>
                            </div>

                            <div className="flex flex-row my-3 justify-end">
                                <div className="pr-5">
                                    <span className="underline underline-offset-4">Telefonní číslo:</span>
                                </div>
                                <div>
                                    <span>+420 606 838 786</span>
                                </div>
                            </div>

                            <div className="flex flex-row flex-wrap justify-end">
                                <div className="pr-5">
                                    <span className="underline underline-offset-4">E-mail:</span>
                                </div>
                                <div>
                                    <span >dvazivoty@dvazivoty.cz</span>
                                </div>
                            </div>
                        </div>
                        {/*Mapa*/}
                        <div className="py-4 h-96">
                            <Map
                                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN!}
                                initialViewState={{
                                    longitude: lng,
                                    latitude: lat,
                                    zoom: zoom,
                                }}
                                mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                            >
                                <Marker longitude={lng} latitude={lat} anchor='bottom' color="red" />
                            </Map>
                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </motion.div>
    );
};