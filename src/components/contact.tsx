"use client";
import * as THREE from 'three';
import React, { useEffect, useState, Suspense, useRef, useLayoutEffect, useMemo, MouseEvent } from 'react';
import { motion } from "framer-motion";
import { Canvas, ThreeEvent, useLoader } from '@react-three/fiber';
import { SVGLoader } from 'three-stdlib';
import { MapControls, OrbitControls, Shape, Sphere } from '@react-three/drei';
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import process from 'process';

const hoveredCursor =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIyNi41IiBmaWxsPSJibGFjayIgc3Ryb2tlPSJibGFjayIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMzIgMzJMMzIgNDVIMzNMMzMgMzJINDVWMzFIMzNWMTlIMzJWMzFIMTlWMzJIMzJaIiBmaWxsPSJ3aGl0ZSIvPjxwYXRoIGQ9Ik0xLjk2MjMxIDEuOTYyMzFMMTMuNzAzMyA1LjEwODI5TDUuMTA4MjkgMTMuNzAzM0wxLjk2MjMxIDEuOTYyMzFaIiBmaWxsPSJibGFjayIvPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAwIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIGZpbGw9IndoaXRlIi8+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+'
const defaultCursor =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcDApIj48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIyNi41IiBzdHJva2U9ImJsYWNrIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zMiAzMkw0MS4xOTI0IDQxLjE5MjRMNDEuODk5NSA0MC40ODUzTDMyLjcwNzEgMzEuMjkyOUw0MS4xOTI0IDIyLjgwNzZMNDAuNDg1MyAyMi4xMDA1TDMyIDMwLjU4NThMMjMuNTE0NyAyMi4xMDA1TDIyLjgwNzYgMjIuODA3NkwzMS4yOTI5IDMxLjI5MjlMMjIuMTAwNSA0MC40ODUzTDIyLjgwNzYgNDEuMTkyNEwzMiAzMloiIGZpbGw9ImJsYWNrIi8+PHBhdGggZD0iTTUuMzY3MTEgMTIuNzM3M0wyLjY2OTQyIDIuNjY5NDJMMTIuNzM3MyA1LjM2NzExTDUuMzY3MTEgMTIuNzM3M1oiIHN0cm9rZT0iYmxhY2siLz48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJjbGlwMCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSJ3aGl0ZSIvPjwvY2xpcFBhdGg+PC9kZWZzPjwvc3ZnPg=='

function Cell({ color, shape, fillOpacity }: { color: THREE.Color, shape: THREE.Shape, fillOpacity: any }) {
    const [hovered, hover] = useState(false)
    useEffect(() => void (document.body.style.cursor = hovered ? `url('${hoveredCursor}'), pointer` : `url('${defaultCursor}'), auto`), [
        hovered
    ])
    return (
        <mesh onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
            <meshBasicMaterial color={hovered ? 'hotpink' : color} opacity={fillOpacity} depthWrite={false} transparent />
            <Shape args={[shape]} />
        </mesh>
    )
}

function Svg({ url }: { url: string }) {
    const { paths } = useLoader(SVGLoader, url)
    const shapes = useMemo(
        () => paths.flatMap((p) => p.toShapes(true).map((shape) => ({
            shape,
            color: p.color,
            fillOpacity: p?.userData?.style?.fillOpacity
        }))),
        [paths]
    )

    const ref = useRef<THREE.Group>(null!);
    useLayoutEffect(() => {
        const sphere = new THREE.Box3().setFromObject(ref.current).getBoundingSphere(new THREE.Sphere())
        ref.current.position.set(-sphere.center.x, -sphere.center.y, 0)
    }, [])

    return (
        <group ref={ref}>
            {shapes.map((props) => (
                <Cell key={props.shape.uuid} {...props} />
            ))}
        </group>
    )
}

export default function Contact() {
    const formRef = useRef(null);

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        phone: "",
        msg: ""
    })

    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    };

    const showToast = (
        company: string, adress: string, phone: string
    ) => {
        toast.info(`Název: ${company},\n Adresa: ${adress},\n Telefon: ${phone}.`, {
            position: "top-center",
        });
    };

    const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_TEMPLATE_ID!,
            {
                from_name: form.fullname,
                to_name: "Jiří",
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
                                <button className="border-2 px-5 py-3 rounded-[20px] bg-green-500" type="submit" disabled={isLoading}>{isLoading ? "Odesílám..." : "Odeslat"}</button>
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
                                    <span>Jihlavská 895, Havlíčkův Brod, 580 01</span>
                                </div>
                            </div>

                            <div className="flex flex-row my-3 justify-end">
                                <div className="pr-5">
                                    <span className="underline underline-offset-4">Recepce:</span>
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
                                    <span >arena<br />@arenaapartmentshb.cz</span>
                                </div>
                            </div>
                        </div>
                        {/*Mapa*/}
                        <div className="py-4 h-96">
                            <Canvas frameloop="demand" orthographic camera={{ position: [0, 0, 50], zoom: 2, up: [0, 0, 2], far: 1000 }} className='rounded-[20px]'>
                                <Suspense fallback={null}>
                                    <Sphere args={[8]} material-color="brown" position={[-82, -320, 1]} onClick={(event) =>
                                        showToast("Well Managed Finance", "Beckovského", "606 838 786")} />

                                    <Svg url="/img/map.svg" />
                                </Suspense>
                                <MapControls enableRotate={false} />
                            </Canvas>
                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer />
        </motion.div>
    );
};