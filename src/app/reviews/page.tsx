import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function Reviews() {
    return (
        <main className="min-h-screen">
            <section className="flex p-10 items-center w-full min-h-screen bg-[url('/img/money.png')] bg-repeat bg- bg-center">
                <div className="flex flex-col justify-start w-full text-justify">

                    <div className="w-full md:w-1/2 flex flex-col gap-y-4">
                        <h1 className='text-7xl'>Co o nás píšou klienti.</h1>
                        <p className="text-xl leading-relaxed lg:text-2xl ">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga sit id esse labore repudiandae perspiciatis, deserunt accusamus dolor magnam ipsum debitis minus at asperiores amet eveniet suscipit et dignissimos molestiae.</p>
                        <Button variant="destructive" size="lg" className="w-1/2 px-4 py-2 backdrop-blur-sm border border-black rounded-md hover:shadow-[0px_0px_4px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200" asChild>
                            <Link href="/#contact" className="text-xl">Kontaktujte nás</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}

