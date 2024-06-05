"use client";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useRef } from "react";
function Slide({ image, text }: { image: string, text: string; }) {
    return (
        <div className="relative flex h-96">
            <Image src={image} alt={text} fill={true} />
            <div className="w-4/5 lg:w-3/4 absolute bottom-10 right-5 m-5 p-2 text-right border-2 border-brown rounded-lg  backdrop-blur-sm bg-skin/[0.4]">
                <p className="text-black text-md">{text}</p>
            </div>
        </div>
    );
}


export default function ImageSlider() {
    const slides = [
        {
            image: "/img/dibelka.jpg",
            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti perspiciatis libero vero voluptas voluptate perferendis necessitatibus dolorum id. Beatae officia, voluptates quas voluptatem voluptatibus aut explicabo impedit recusandae nostrum laudantium.",
        },
        {
            image: "/img/dibelka.jpg",
            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti perspiciatis libero vero voluptas voluptate perferendis necessitatibus dolorum id. Beatae officia, voluptates quas voluptatem voluptatibus aut explicabo impedit recusandae nostrum laudantium.",
        },
        {
            image: "/img/dibelka.jpg",
            text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti perspiciatis libero vero voluptas voluptate perferendis necessitatibus dolorum id. Beatae officia, voluptates quas voluptatem voluptatibus aut explicabo impedit recusandae nostrum laudantium.",
        }
    ];
    const plugin = useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );
    return (

        <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.play}
        >
            <CarouselContent>
                {slides.map((slide, key) => (
                    <CarouselItem className="lg:basis-1/2" key={key}>
                        <Slide image={slide.image} text={slide.text} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}

