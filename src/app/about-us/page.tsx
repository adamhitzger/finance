import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import Contact from '@/components/contact'

type PositionType = "left" | "right";

interface MemberProps {
    name: string;
    image: string;
    description: string[];
    position: string;
    email: string;
    phone: string;
    imagePosition: PositionType;
}

function Articles({ name, position, email, phone, image, description, imagePosition }: MemberProps) {
    return (
        <>
            <article className={`flex ${imagePosition === "right" ? "flex-row" : "flex-row-reverse"} w-full`}>
                <div className={`w-full lg:w-1/2 p-5 lg:my-20 ${imagePosition === "right" ? "text-left" : "text-right"}`}>
                    <h3 className='text-3xl border-b-2 border-b-brown shadow-lg shadow-brown-500/50'>{name}</h3>
                    <span className='text-md text-brown'>{position}</span>
                    <p className='text-lg my-5'>{description}</p>
                    <h4 className='border-b-2 border-b-brown shadow-lg shadow-brown-500/50'>Kontakt:</h4>
                    <span className='text-md text-brown'>Email: {email}</span><br />
                    <span className='text-md text-brown'>Telefonní číslo: {phone}</span>
                </div>
                <div className={`flex ${imagePosition === "right" ? "justify-end" : "justify-start"} w-full lg:w-1/2 p-5 rounded-xl`}>
                    <div className='relative w-full '>
                        <Image src={image} alt={name + "\n" + description} fill={true} sizes='(max-width: 768px) 200vw, (max-width: 1200px) 50vw, 33vw' className='object-contain overflow-hidden' />
                    </div>

                </div>
            </article>
            <hr className=' border-b-brown shadow-lg shadow-brown-500/50' />
        </>
    )
}

export default function AboutUs() {
    const members = [
        {
            id: 1,
            name: "Tomáš Dibelka",
            image: "/img/dibelka.jpg",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, optio voluptatum ducimus ratione eos natus minima doloremque porro nemo beatae quam quibusdam praesentium accusantium consequatur repudiandae animi incidunt vel eum.",
            position: "Finanční poradce",
            imagePosition: "right",
            phone: "808 808 808",
            email: "example@dvazivoty.cz"
        },
        {
            id: 2,
            name: "Tomáš Dibelka",
            image: "/img/dibelka.jpg",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, optio voluptatum ducimus ratione eos natus minima doloremque porro nemo beatae quam quibusdam praesentium accusantium consequatur repudiandae animi incidunt vel eum.",
            position: "Finanční poradce",
            imagePosition: "left",
            phone: "808 808 808",
            email: "example@dvazivoty.cz"
        }
    ]
    return (
        <main className="min-h-screen">
            <section className="flex p-10 items-center w-full min-h-screen bg-[url('/img/money.png')] bg-repeat bg- bg-center">
                <div className="flex flex-col justify-start w-full text-justify">

                    <div className="w-full md:w-1/2 flex flex-col gap-y-4 my-28 lg:my-0">
                        <h1 className='text-7xl'>Dva životy.</h1>
                        <p className="text-xl leading-relaxed lg:text-2xl ">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga sit id esse labore repudiandae perspiciatis, deserunt accusamus dolor magnam ipsum debitis minus at asperiores amet eveniet suscipit et dignissimos molestiae.</p>
                        <Button variant="destructive" size="lg" className="w-1/2 px-4 py-2 backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200" asChild>
                            <Link href="/#contact" className="text-xl">Kontaktujte nás</Link>
                        </Button>

                    </div>
                </div>
            </section>
            <section className="flex flex-col p-5">
                <div className='mx-auto my-5 text-center'>
                    <h2 className='text-5xl'>Náš tým</h2>
                    <p className='text-xl leading-relaxed lg:text-2xl '>Seznamte se s naším týmem, ...</p>
                </div>
                <div className='grid grid-cols-1 gap-y-4'>
                    {members.map((member: any) => (
                        <Articles key={member.id} name={member.name} image={member.image} phone={member.phone} email={member.email} description={member.description} position={member.position} imagePosition={member.imagePosition} />
                    ))}
                </div>
            </section>
            <section className='my-10 mx-5'>
                <h1 className="text-center text-5xl pb-5">První krok.
                    K prvnímu kroku.</h1>
                <h2 className="text-center text-2xl">Rádi se vám ozveme a domluvíme si s Vámi schůzku.</h2>
                <Contact />
            </section>
        </main>
    )
}

